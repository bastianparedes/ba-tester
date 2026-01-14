export type TypeStatus = 'active' | 'deleted' | 'inactive';
export type TypeDirection = 'asc' | 'desc';
export type TypeBooleanOperator = 'and' | 'or';
export type TypeStringComparator =
  | 'contains'
  | 'doesNotContain'
  | 'doesNotExist'
  | 'exists'
  | 'is'
  | 'isNot';
export type TypeRequirementType =
  | 'cookie'
  | 'custom'
  | 'device'
  | 'localStorage'
  | 'node'
  | 'queryParam'
  | 'sessionStorage'
  | 'url';
export type TypeNumericComparator =
  | 'atLeast'
  | 'atMost'
  | 'exactly'
  | 'lessThan'
  | 'moreThan';
export type TypeRepetition =
  | 'atLeast'
  | 'atMost'
  | 'exactly'
  | 'lessThan'
  | 'moreThan';
export type TypeLimitType =
  | 'oneDay'
  | 'oneMonth'
  | 'oneWeek'
  | 'session'
  | 'threeMonths';
export type TypeNodeType = 'internal' | 'root';
export type TypeTriggerType =
  | 'clickOnElement'
  | 'custom'
  | 'pageLoad'
  | 'timeOnPage';
export type TypeDeviceType = 'desktop' | 'mobile';
