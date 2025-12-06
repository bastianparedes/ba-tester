import type commonConstants from '../config/common/constants';

type TypeTriggerData = {
  readonly id: number;
} & (
  | {
      type: 'clickOnElement';
      data: {
        selector: string;
      };
    }
  | {
      type: 'custom';
      data: {
        name: string;
        javascript: string;
      };
    }
  | {
      type: 'pageLoad';
      data: Record<string, never>;
    }
  | {
      type: 'timeOnPage';
      data: {
        seconds: number;
      };
    }
);

type TypeRequirementData =
  | {
      type: 'node';
      data: {
        children: TypeRequirementData[];
        operator: 'and' | 'or';
      };
    }
  | {
      type: 'cookie' | 'localStorage' | 'sessionStorage' | 'queryParam';
      data:
        | {
            name: string;
            comparator: 'is' | 'isNot' | 'contains' | 'doesNotContain';
            value: string;
          }
        | {
            name: string;
            comparator: 'exists' | 'doesNotExist';
            value?: undefined;
          };
    }
  | {
      type: 'custom';
      data: {
        name: string;
        javascript: string;
      };
    }
  | {
      type: 'device';
      data: {
        comparator: 'is' | 'isNot';
        device: 'desktop' | 'mobile';
      };
    }
  | {
      type: 'url';
      data: {
        comparator: 'is' | 'isNot' | 'contains' | 'doesNotContain';
        value: string;
      };
    };

interface TypeVariationData {
  css: string;
  html: string;
  readonly id: number;
  javascript: string;
  name: string;
  traffic: number;
}

interface TypeCampaign {
  readonly id: number | undefined;
  name: string;
  status: (typeof commonConstants.campaignStatus)[number];
}

type TypeCampaignExtended = TypeCampaign & {
  triggers: TypeTriggerData[];
  requirements: TypeRequirementData & {
    type: 'node';
  };
  variations: TypeVariationData[];
};

export type { TypeTriggerData, TypeRequirementData, TypeVariationData, TypeCampaign, TypeCampaignExtended };
