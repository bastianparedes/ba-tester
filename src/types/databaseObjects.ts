import type commonConstants from '../config/common/constants';

type TriggerData = {
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

type RequirementDataCampaign =
  | {
      type: 'node';
      data: {
        children: RequirementDataCampaign[];
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

type RequirementData = RequirementDataCampaign;

interface VariationData {
  css: string;
  html: string;
  readonly id: number;
  javascript: string;
  name: string;
  traffic: number;
}

interface CampaignWithoutDate {
  readonly id: number | undefined;
  name: string;
  status: (typeof commonConstants.campaignStatus)[number];
}

type CampaignWithDate = CampaignWithoutDate & {
  readonly lastModifiedDate: string;
};

type CampaignExtendedWithoutDate = CampaignWithoutDate & {
  triggers: TriggerData[];
  requirements: RequirementDataCampaign & {
    type: 'node';
  };
  variations: VariationData[];
};

export type {
  TriggerData,
  RequirementData,
  VariationData,
  CampaignWithoutDate,
  CampaignWithDate,
  CampaignExtendedWithoutDate,
  RequirementDataCampaign,
};
