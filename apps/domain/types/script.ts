export type TypeNodeRequirement = {
  type: 'node';
  data: {
    children: TypeRequirementData[];
    operator: 'and' | 'or';
  };
};

type TypeStorageComparisonData =
  | {
      name: string;
      comparator: 'is' | 'isNot' | 'contains' | 'doesNotContain';
      value: string;
    }
  | {
      name: string;
      comparator: 'exists' | 'doesNotExist';
      value?: never;
    };

export type TypeCookieRequirement = {
  type: 'cookie';
  data: TypeStorageComparisonData;
};

export type TypeLocalStorageRequirement = {
  type: 'localStorage';
  data: TypeStorageComparisonData;
};

export type TypeSessionStorageRequirement = {
  type: 'sessionStorage';
  data: TypeStorageComparisonData;
};

export type TypeQueryParamRequirement = {
  type: 'queryParam';
  data: TypeStorageComparisonData;
};

export type TypeCustomRequirement = {
  type: 'custom';
  data: {
    name: string;
    javascript: (resolve: (boolean: boolean) => void) => void;
  };
};

export type TypeDeviceRequirement = {
  type: 'device';
  data: {
    comparator: 'is' | 'isNot';
    device: 'desktop' | 'mobile';
  };
};

export type TypeUrlRequirement = {
  type: 'url';
  data: {
    comparator: 'is' | 'isNot' | 'contains' | 'doesNotContain';
    value: string;
  };
};

type TypeRequirementData =
  | TypeNodeRequirement
  | TypeCookieRequirement
  | TypeLocalStorageRequirement
  | TypeSessionStorageRequirement
  | TypeQueryParamRequirement
  | TypeCustomRequirement
  | TypeDeviceRequirement
  | TypeUrlRequirement;

type TypeClickOnElementTrigger = {
  readonly id: number;
  type: 'clickOnElement';
  data: {
    selector: string;
  };
};

type TypeCustomTrigger = {
  readonly id: number;
  type: 'custom';
  data: {
    name: string;
    javascript: (fire: () => void) => void;
  };
};

type TypePageLoadTrigger = {
  readonly id: number;
  type: 'pageLoad';
  data: Record<string, never>;
};

type TypeTimeOnPageTrigger = {
  readonly id: number;
  type: 'timeOnPage';
  data: {
    milliseconds: number;
  };
};

type TypeTriggerData = TypeClickOnElementTrigger | TypeCustomTrigger | TypePageLoadTrigger | TypeTimeOnPageTrigger;

type TypeVariationData = {
  css: string;
  html: string;
  id: number;
  javascript: () => void;
  name: string;
  traffic: number;
};

export type TypeCampaignScript = {
  id: number;
  name: string;
  triggers: TypeTriggerData[];
  requirements: TypeRequirementData & {
    type: 'node';
  };
  variations: TypeVariationData[];
};
