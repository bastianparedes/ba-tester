import fs from 'node:fs';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { minify } from 'terser';
import commonConstants from '../../../domain/constants';
import type { TypeNodeRequirement } from '../../../domain/types/requirement';
import type { TypeCampaignScript } from '../../../domain/types/script';
import { getScriptLocation } from '../libs/script';
import { CampaignRepository } from '../repositories/campaign.repository';
import { CacheService } from './cache.service';

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

@Injectable()
export class ScriptService {
  constructor(
    private readonly campaignRepository: CampaignRepository,
    private readonly cacheService: CacheService,
  ) {}

  private async generateScript({ tenantId }: { tenantId: number }): Promise<string> {
    const scriptLocation = getScriptLocation();
    const fileExists = fs.existsSync(scriptLocation);
    if (!fileExists) throw new InternalServerErrorException();

    const campaigns = await this.campaignRepository.getAllForScript({ tenantId });
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
    const script = fs.readFileSync(scriptLocation, 'utf-8');
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

    return minifiedJs;
  }

  async populateScript({ tenantId }: { tenantId: number }): Promise<string> {
    const script = await this.generateScript({ tenantId });
    await this.cacheService.scripts.save({ tenantId, code: script });
    return script;
  }

  async getScript({ tenantId }: { tenantId: number }): Promise<string> {
    const cachedScript = await this.cacheService.scripts.get({ tenantId });
    if (cachedScript) return cachedScript;

    const script = await this.generateScript({ tenantId });
    await this.cacheService.scripts.save({ tenantId, code: script });
    return script;
  }
}
