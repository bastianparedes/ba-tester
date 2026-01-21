import fs from 'node:fs';
import path from 'node:path';
import { Controller, Get, Header, InternalServerErrorException, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { minify } from 'terser';
import commonConstants from '../../../domain/constants';
import type { TypeNodeRequirement } from '../../../domain/types/requirement';
import type { TypeCampaignScript } from '../../../domain/types/script';
import { env } from '../libs/env';
import { DbService } from '../services/db.service';

const stringifyWithFunctions = (obj: unknown, indent = 2): string => {
  if (typeof obj === 'function') {
    return obj.toString();
  }

  if (typeof obj !== 'object' || obj === null) {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    const items = obj.map((item) => stringifyWithFunctions(item, indent));
    return `[${items.join(', ')}]`;
  }

  const entries = Object.entries(obj).map(([key, value]) => {
    return `${key}: ${stringifyWithFunctions(value, indent)}`;
  });

  return `{\n${' '.repeat(indent)}${entries.join(`,\n${' '.repeat(indent)}`)}\n}`;
};

const getFunctionFromBody = ({ params, body }: { params: string[]; body: string }) => {
  const fn = new Function(...params, body);
  fn.toString = () => `function(${params.join(',')}){${body}}`;
  return fn as () => void;
};

const migrateRequirementsFromStringToFunction = (requirement: TypeNodeRequirement): TypeCampaignScript['requirements'] => {
  return {
    ...requirement,
    data: {
      ...requirement.data,
      children: requirement.data.children.map((childRequirement) => {
        if (childRequirement.type === 'node') return migrateRequirementsFromStringToFunction(childRequirement);
        if (childRequirement.type === 'custom')
          return {
            ...childRequirement,
            data: {
              ...childRequirement.data,
              javascript: getFunctionFromBody({ params: ['resolve'], body: childRequirement.data.javascript }),
            },
          };
        return childRequirement;
      }),
    },
  };
};

@Controller('public/script/tenants')
export class ScriptController {
  constructor(private readonly dbService: DbService) {}

  @Get(':tenantId')
  @Header('Content-Type', 'text/javascript; charset=utf-8')
  @Header('Access-Control-Allow-Origin', '*')
  async get(@Param('tenantId', ParseIntPipe) tenantId: number): Promise<string> {
    const cacheKey = `tenant_${tenantId}_public_script`;
    const cachedScript = await this.dbService.cache.get(cacheKey);
    if (cachedScript && env.NODE_ENV === 'development') return cachedScript;

    const fileExists = fs.existsSync(path.join(process.cwd(), 'build', 'script.js'));
    if (!fileExists) throw new InternalServerErrorException();

    const campaigns = await this.dbService.campaigns.getAllForScript({ tenantId });
    if (campaigns.length === 0) throw new NotFoundException();

    const campaignsWithFunctions: TypeCampaignScript[] = campaigns.map((campaign) => {
      const newRequirements = migrateRequirementsFromStringToFunction(campaign.requirements);
      const newTriggers = campaign.triggers.map((trigger) => {
        if (trigger.type === 'custom') {
          return {
            ...trigger,
            data: {
              ...trigger.data,
              javascript: getFunctionFromBody({ params: ['fire'], body: trigger.data.javascript }),
            },
          };
        }
        return trigger;
      });
      const newVariations = campaign.variations.map((variation) => {
        return {
          ...variation,
          javascript: getFunctionFromBody({ params: [], body: variation.javascript }),
        };
      });

      return {
        ...campaign,
        requirements: newRequirements,
        triggers: newTriggers,
        variations: newVariations,
      };
    });

    const stringWindow = `window.${commonConstants.windowKey} = window.${commonConstants.windowKey} || {}\n;window.${commonConstants.windowKey}.campaignsData = ${stringifyWithFunctions(campaignsWithFunctions)};`;
    const script = fs.readFileSync(path.join(process.cwd(), 'build', 'script.js'), 'utf-8');
    const fullScript = stringWindow + script;
    const result = await minify(fullScript, {
      compress: true,
      mangle: true,
      format: {
        comments: false,
      },
    });
    if (!result.code) throw new InternalServerErrorException();
    const minifiedJs = result.code;

    await this.dbService.cache.save({ key: cacheKey, value: minifiedJs, ttlMinutes: 1 });
    return minifiedJs;
  }
}
