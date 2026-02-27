import type { TypeCampaign, TypeExecutionGroup, TypeVariationData } from '.';
import type { TypeCustomRequirement, TypeNodeRequirement, TypeRequirement } from './requirement';
import type { TypeTriggerData } from './trigger';

type TypeCustomRequirementScript = Omit<TypeCustomRequirement, 'data'> & {
  data: {
    name: string;
    javascript: (resolve: (boolean: boolean) => void) => void;
  };
};
type TypeRequirementWithoutNode = Exclude<Exclude<TypeRequirement, { type: 'custom' }>, { type: 'node' }> | TypeCustomRequirementScript;
type TypeNodeRequirementScript = Omit<TypeNodeRequirement, 'data'> & {
  data: Omit<TypeNodeRequirement['data'], 'children'> & {
    children: (TypeRequirementWithoutNode | TypeNodeRequirementScript)[];
  };
};
export type TypeRequirementScript = TypeNodeRequirementScript['data']['children'][number];

type TypeTriggerDataScript =
  | Exclude<TypeTriggerData, { type: 'custom' }>
  | (Omit<Extract<TypeTriggerData, { type: 'custom' }>, 'data'> & {
      data: Omit<Extract<TypeTriggerData, { type: 'custom' }>['data'], 'javascript'> & {
        javascript: (fire: () => void) => void;
      };
    });

type TypeVariationDataScript = Omit<TypeVariationData, 'javascript'> & {
  javascript: () => void;
};

export type TypeCampaignScript = {
  id: TypeCampaign['id'];
  name: TypeCampaign['name'];
  triggers: TypeTriggerDataScript[];
  requirements: Extract<TypeRequirementScript, { type: 'node' }>;
  variations: TypeVariationDataScript[];
};

export type TypeExecutionGroupScript = {
  id: TypeExecutionGroup['id'];
  name: TypeExecutionGroup['name'];
  waitForEveryCampaignToBeEvaluated: TypeExecutionGroup['waitForEveryCampaignToBeEvaluated'];
  onlyOneCampaignPerPageLoad: TypeExecutionGroup['onlyOneCampaignPerPageLoad'];
  onlyCampaignsPreviouslyExecuted: TypeExecutionGroup['onlyCampaignsPreviouslyExecuted'];
  campaigns: TypeCampaignScript[];
};
