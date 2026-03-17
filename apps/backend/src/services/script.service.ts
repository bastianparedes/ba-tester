import fs from 'node:fs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier-terser';
import { minify as minifyJs } from 'terser';
import commonConstants from '../../../domain/constants';
import type { TypeNodeRequirement } from '../../../domain/types/campaign';
import { TypeCampaign } from '../../../domain/types/campaign';
import type { TypeCampaignScript, TypeExecutionGroupScript } from '../../../domain/types/script';
import { getScriptLocation } from '../libs/script';
import { AudienceRepository } from '../repositories/audience.repository';
import { ExecutionGroupRepository } from '../repositories/executionGroup.repository';
import { TrackEventRepository } from '../repositories/trackEvent.repository';
import { TypeBaTester } from '../script/types';
import { CacheService } from './cache.service';

const getMinifiedHtml = async (html: string): Promise<string> => {
  try {
    const minifiedHtml = await minifyHtml(html, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeAttributeQuotes: false,
      removeComments: true,
    });
    return minifiedHtml;
  } catch (err) {
    console.error('Error al minificar HTML:', err);
    return '';
  }
};
const getMinifiedCss = (css: string): string => {
  const output = new CleanCSS({
    level: 2,
  }).minify(css);

  if (output.errors.length) return '';
  return output.styles;
};
const getMinifiedJs = async (js: string) => {
  const result = await minifyJs(js, {
    compress: {
      drop_console: false,
      drop_debugger: true,
      passes: 2,
      pure_funcs: ['alert'],
    },
    format: {
      comments: false,
    },
    mangle: true,
  });

  return result.code ?? '';
};
const stringifyWithFunctions = (obj: unknown): string => {
  if (typeof obj === 'function') {
    return obj.toString();
  }

  if (typeof obj !== 'object' || obj === null) {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    const items = obj.map((item) => stringifyWithFunctions(item));
    return `[${items.join(', ')}]`;
  }

  const entries = Object.entries(obj).map(([key, value]) => {
    return `${key}: ${stringifyWithFunctions(value)}`;
  });

  return `{${' '.repeat(2)}${entries.join(`, ${' '.repeat(2)}`)}}`;
};
const getFunctionFromBody = ({ params = [], body }: { params?: string[]; body: string }): (() => Promise<void>) => {
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
  const fn = new AsyncFunction(...params, body);

  fn.toString = () => `async function(${params.join(',')}) {${body}}`;
  return fn;
};

@Injectable()
export class ScriptService {
  constructor(
    private readonly executionGroupRepository: ExecutionGroupRepository,
    private readonly trackEventRepository: TrackEventRepository,
    private readonly audienceRepository: AudienceRepository,
    private readonly cacheService: CacheService,
  ) {}

  private async getCampaignWithFunctions(campaign: {
    id: TypeCampaign['id'];
    name: TypeCampaign['name'];
    triggers: TypeCampaign['triggers'];
    requirements: TypeCampaign['requirements'];
    variations: TypeCampaign['variations'];
  }): Promise<TypeCampaignScript> {
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
                  javascript: getFunctionFromBody({ body: childRequirement.data.javascript }),
                },
              };
            return childRequirement;
          }),
        },
      };
    };

    const newRequirements = migrateRequirementsFromStringToFunction(campaign.requirements);
    const newTriggers = campaign.triggers.map((trigger) => {
      if (trigger.type === 'custom') {
        return {
          ...trigger,
          data: {
            ...trigger.data,
            javascript: getFunctionFromBody({ body: trigger.data.javascript }),
          },
        };
      }
      return trigger;
    });
    const newVariations = await Promise.all(
      campaign.variations.map(async (variation) => {
        return {
          ...variation,
          css: getMinifiedCss(variation.css),
          html: await getMinifiedHtml(variation.html),
          javascript: getFunctionFromBody({ body: variation.javascript }),
        };
      }),
    );

    return {
      ...campaign,
      requirements: newRequirements,
      triggers: newTriggers,
      variations: newVariations,
    };
  }

  private async getExecutionGroups({ tenantId }: { tenantId: number }) {
    const executionGroups = await this.executionGroupRepository.getAllExecutionGroupsForScript({ tenantId });
    const executionGroupsScript: TypeExecutionGroupScript[] = await Promise.all(
      executionGroups.map(async (executionGroup) => {
        const campaigns = await Promise.all(executionGroup.campaigns.map((campaign) => this.getCampaignWithFunctions(campaign)));
        return { ...executionGroup, campaigns };
      }),
    );
    return executionGroupsScript;
  }

  private async getTrackEvents({ tenantId }: { tenantId: number }) {
    const trackEvents = await this.trackEventRepository.getAllTrackEventsForScript({ tenantId });
    const trackEventsWithFunctions = trackEvents.map((trackEvent) => ({ ...trackEvent, getData: getFunctionFromBody({ body: trackEvent.getData }) }));
    return trackEventsWithFunctions;
  }

  private async getAudiences({ tenantId }: { tenantId: number }) {
    const audiences = await this.audienceRepository.getAllAudiencesForScript({ tenantId });
    return audiences;
  }

  private async generateScript({ tenantId }: { tenantId: number }): Promise<string> {
    const scriptLocation = getScriptLocation();
    const fileExists = fs.existsSync(scriptLocation);
    if (!fileExists) throw new InternalServerErrorException();

    const [executionGroupsData, trackEventsData, audiencesData] = await Promise.all([
      this.getExecutionGroups({ tenantId }),
      this.getTrackEvents({ tenantId }),
      this.getAudiences({ tenantId }),
    ]);

    const windowObject: TypeBaTester = { audiencesData, executionGroupsData, trackEventsData };
    const stringWindow = `window.${commonConstants.windowKey} = window.${commonConstants.windowKey} || {};window.${commonConstants.windowKey} = ${stringifyWithFunctions(windowObject)};`;
    const script = fs.readFileSync(scriptLocation, 'utf-8');
    const fullScript = stringWindow + script;
    const minifiedJs = await getMinifiedJs(fullScript);
    return minifiedJs;
  }

  async populateScript({ tenantId }: { tenantId: number }): Promise<string> {
    const script = await this.generateScript({ tenantId });
    await this.cacheService.scripts.save({ code: script, tenantId });
    return script;
  }

  async clear({ tenantId }: { tenantId: number }): Promise<void> {
    await this.cacheService.scripts.del({ tenantId });
  }

  async getScript({ tenantId }: { tenantId: number }): Promise<string> {
    const cachedScript = await this.cacheService.scripts.get({ tenantId });
    if (cachedScript) return cachedScript;

    const script = await this.generateScript({ tenantId });
    await this.cacheService.scripts.save({ code: script, tenantId });
    return script;
  }
}
