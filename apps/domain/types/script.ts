import type { TypeVariationData as TypeOriginalVariationData } from '.';
import {
  TypeCustomRequirement as TypeOriginalCustomRequirement,
  TypeNodeRequirement as TypeOriginalNodeRequirement,
  TypeRequirement as TypeOriginalRequirement,
} from './requirement';
import { type TypeTriggerData as TypeOriginalTriggerData } from './trigger';

type TypeCustomRequirement = Omit<TypeOriginalCustomRequirement, 'data'> & {
  data: {
    name: string;
    javascript: (resolve: (boolean: boolean) => void) => void;
  };
};
type TypeRequirementWithoutNode = Exclude<Exclude<TypeOriginalRequirement, { type: 'custom' }>, { type: 'node' }> | TypeCustomRequirement;
export type TypeNodeRequirement = Omit<TypeOriginalNodeRequirement, 'data'> & {
  data: Omit<TypeOriginalNodeRequirement['data'], 'children'> & {
    children: (TypeRequirementWithoutNode | TypeNodeRequirement)[];
  };
};
export type TypeRequirement = TypeNodeRequirement['data']['children'][number];

type TypeTriggerData =
  | Exclude<TypeOriginalTriggerData, { type: 'custom' }>
  | (Omit<Extract<TypeOriginalTriggerData, { type: 'custom' }>, 'data'> & {
      data: Omit<Extract<TypeOriginalTriggerData, { type: 'custom' }>['data'], 'javascript'> & {
        javascript: (fire: () => void) => void;
      };
    });

type TypeVariationData = Omit<TypeOriginalVariationData, 'javascript'> & {
  javascript: () => void;
};

export type TypeCampaignScript = {
  id: number;
  name: string;
  triggers: TypeTriggerData[];
  requirements: Extract<TypeRequirement, { type: 'node' }>;
  variations: TypeVariationData[];
};
