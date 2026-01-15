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
    javascript: string;
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

export type TypeRequirementData =
  | TypeNodeRequirement
  | TypeCookieRequirement
  | TypeLocalStorageRequirement
  | TypeSessionStorageRequirement
  | TypeQueryParamRequirement
  | TypeCustomRequirement
  | TypeDeviceRequirement
  | TypeUrlRequirement;
