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

type TypeRequirementDataCampaign =
  | {
      type: 'node';
      data: {
        children: TypeRequirementDataCampaign[];
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

type TypeRequirementData = TypeRequirementDataCampaign;

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

type TypeCampaignExtendedWithoutDate = TypeCampaign & {
  triggers: TypeTriggerData[];
  requirements: TypeRequirementDataCampaign & {
    type: 'node';
  };
  variations: TypeVariationData[];
};

export type {
  TypeTriggerData,
  TypeRequirementData,
  TypeVariationData,
  TypeCampaign,
  TypeCampaignExtendedWithoutDate,
  TypeRequirementDataCampaign,
};
