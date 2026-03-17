export type TypeDirection = 'asc' | 'desc';
export type TypeBooleanOperator = 'and' | 'or';
export type TypeStringComparator = 'contains' | 'doesNotContain' | 'doesNotExist' | 'exists' | 'is' | 'isNot';
export type TypeRequirementType = 'audience' | 'cookie' | 'custom' | 'device' | 'localStorage' | 'node' | 'queryParam' | 'sessionStorage' | 'url';
export type TypeNumericComparator = 'atLeast' | 'atMost' | 'is' | 'lessThan' | 'moreThan';
export type TypeRepetition = 'atLeast' | 'atMost' | 'is' | 'lessThan' | 'moreThan';
export type TypeLimitType = 'oneDay' | 'oneMonth' | 'oneWeek' | 'session' | 'threeMonths';
export type TypeNodeType = 'internal' | 'root';
export type TypeTriggerType = 'clickOnElement' | 'custom' | 'pageLoad' | 'timeOnPage';
export type TypeDeviceType = 'desktop' | 'mobile';
export type TypeStatus = 'inactive' | 'active';

export type TypeAudienceRestrictionType = 'string' | 'number' | 'boolean' | 'any' | 'node';
export type TypeAudienceStringComparator = 'is' | 'isNot' | 'contains' | 'doesNotContain';
export type TypeAudienceNumberComparator = 'is' | 'moreThan' | 'lessThan' | 'atLeast' | 'atMost';
export type TypeAudienceQuantityOperator = 'is' | 'moreThan' | 'lessThan' | 'atLeast' | 'atMost';
export type TypeAudienceBooleanComparator = 'is';
export type TypeAudienceTimeUnit = 'days' | 'hours' | 'minutes';
