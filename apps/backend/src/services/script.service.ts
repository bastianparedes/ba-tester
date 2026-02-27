import fs from 'node:fs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ExecutionGroupRepository } from 'src/repositories/executionGroup.repository';
import { minify } from 'terser';
import commonConstants from '../../../domain/constants';
import { TypeCampaign } from '../../../domain/types';
import type { TypeNodeRequirement } from '../../../domain/types/requirement';
import type { TypeCampaignScript, TypeExecutionGroupScript } from '../../../domain/types/script';
import { getScriptLocation } from '../libs/script';
import { CampaignRepository } from '../repositories/campaign.repository';
import { CacheService } from './cache.service';

@Injectable()
export class ScriptService {
  constructor(
    private readonly campaignRepository: CampaignRepository,
    private readonly executionGroupRepository: ExecutionGroupRepository,
    private readonly cacheService: CacheService,
  ) {}

  private stringifyWithFunctions(obj: unknown): string {
    if (typeof obj === 'function') {
      return obj.toString();
    }

    if (typeof obj !== 'object' || obj === null) {
      return JSON.stringify(obj);
    }

    if (Array.isArray(obj)) {
      const items = obj.map((item) => this.stringifyWithFunctions(item));
      return `[${items.join(', ')}]`;
    }

    const entries = Object.entries(obj).map(([key, value]) => {
      return `${key}: ${this.stringifyWithFunctions(value)}`;
    });

    return `{\n${' '.repeat(2)}${entries.join(`,\n${' '.repeat(2)}`)}\n}`;
  }

  private getFunctionFromBody({ params, body }: { params: string[]; body: string }) {
    const fn = new Function(...params, body);
    fn.toString = () => `function(${params.join(',')}){${body}}`;
    return fn as () => void;
  }

  private migrateRequirementsFromStringToFunction(requirement: TypeNodeRequirement): TypeCampaignScript['requirements'] {
    return {
      ...requirement,
      data: {
        ...requirement.data,
        children: requirement.data.children.map((childRequirement) => {
          if (childRequirement.type === 'node') return this.migrateRequirementsFromStringToFunction(childRequirement);
          if (childRequirement.type === 'custom')
            return {
              ...childRequirement,
              data: {
                ...childRequirement.data,
                javascript: this.getFunctionFromBody({ params: ['resolve'], body: childRequirement.data.javascript }),
              },
            };
          return childRequirement;
        }),
      },
    };
  }

  private getCampaignWithFunctions(campaign: {
    id: TypeCampaign['id'];
    name: TypeCampaign['name'];
    triggers: TypeCampaign['triggers'];
    requirements: TypeCampaign['requirements'];
    variations: TypeCampaign['variations'];
  }): TypeCampaignScript {
    const newRequirements = this.migrateRequirementsFromStringToFunction(campaign.requirements);
    const newTriggers = campaign.triggers.map((trigger) => {
      if (trigger.type === 'custom') {
        return {
          ...trigger,
          data: {
            ...trigger.data,
            javascript: this.getFunctionFromBody({ params: ['fire'], body: trigger.data.javascript }),
          },
        };
      }
      return trigger;
    });
    const newVariations = campaign.variations.map((variation) => {
      return {
        ...variation,
        javascript: this.getFunctionFromBody({ params: [], body: variation.javascript }),
      };
    });

    return {
      ...campaign,
      requirements: newRequirements,
      triggers: newTriggers,
      variations: newVariations,
    };
  }

  private async generateScript({ tenantId }: { tenantId: number }): Promise<string> {
    const scriptLocation = getScriptLocation();
    const fileExists = fs.existsSync(scriptLocation);
    if (!fileExists) throw new InternalServerErrorException();

    const campaigns = await this.campaignRepository.getAllCampaignsForScript({ tenantId });
    const campaignsScript: TypeCampaignScript[] = campaigns.map((campaign) => this.getCampaignWithFunctions(campaign));

    const executionGroups = await this.executionGroupRepository.getAllExecutionGroupsForScript({ tenantId });
    const executionGroupsScript: TypeExecutionGroupScript[] = executionGroups.map((executionGroup) => {
      const campaigns = executionGroup.campaigns.map((campaign) => this.getCampaignWithFunctions(campaign));
      return { ...executionGroup, campaigns };
    });

    const stringWindow = `window.${commonConstants.windowKey} = window.${commonConstants.windowKey} || {};window.${commonConstants.windowKey}.campaignsData = ${this.stringifyWithFunctions(campaignsScript)};window.${commonConstants.windowKey}.executionGroupsData = ${this.stringifyWithFunctions(executionGroupsScript)};`;
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

  async clear({ tenantId }: { tenantId: number }): Promise<void> {
    await this.cacheService.scripts.del({ tenantId });
  }

  async getScript({ tenantId }: { tenantId: number }): Promise<string> {
    const cachedScript = await this.cacheService.scripts.get({ tenantId });
    if (cachedScript) return cachedScript;

    const script = await this.generateScript({ tenantId });
    await this.cacheService.scripts.save({ tenantId, code: script });
    return script;
  }
}
