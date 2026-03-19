import type {
  TypeAudienceBooleanComparator,
  TypeAudienceNumberComparator,
  TypeAudienceRestrictionType,
  TypeAudienceStringComparator,
  TypeAudienceTimeUnit,
  TypeBooleanOperator,
  TypeDeviceType,
  TypeDirection,
  TypeLimitType,
  TypeNodeType,
  TypeNumericComparator,
  TypeRequirementType,
  TypeStatus,
  TypeStringComparator,
  TypeTriggerType,
} from './types/constants';

const status = {
  active: 'active',
  inactive: 'inactive',
} as const satisfies Record<TypeStatus, string>;

const orderDirections = {
  asc: 'asc',
  desc: 'desc',
} as const satisfies Record<TypeDirection, string>;

const booleanOperators = {
  and: 'and',
  or: 'or',
} as const satisfies Record<TypeBooleanOperator, string>;

const comparisons = {
  contains: 'contains',
  doesNotContain: 'doesNotContain',
  doesNotExist: 'doesNotExist',
  equal: 'equal',
  exists: 'exists',
  isNot: 'isNot',
} as const satisfies Record<TypeStringComparator, string>;

const requirementTypes = {
  audience: 'audience',
  cookie: 'cookie',
  custom: 'custom',
  device: 'device',
  localStorage: 'localStorage',
  node: 'node',
  queryParam: 'queryParam',
  sessionStorage: 'sessionStorage',
  url: 'url',
} as const satisfies Record<TypeRequirementType, string>;

const typeRepetitions = {
  atLeast: 'atLeast',
  atMost: 'atMost',
  equal: 'equal',
  lessThan: 'lessThan',
  moreThan: 'moreThan',
} as const satisfies Record<TypeNumericComparator, string>;

const limitTypes = {
  oneDay: 'oneDay',
  oneMonth: 'oneMonth',
  oneWeek: 'oneWeek',
  session: 'session',
  threeMonths: 'threeMonths',
} as const satisfies Record<TypeLimitType, string>;

const nodeTypes = {
  internal: 'internal',
  root: 'root',
} as const satisfies Record<TypeNodeType, string>;

const triggerTypes = {
  clickOnElement: 'clickOnElement',
  custom: 'custom',
  pageLoad: 'pageLoad',
  timeOnPage: 'timeOnPage',
} as const satisfies Record<TypeTriggerType, string>;

const devices = {
  desktop: 'desktop',
  mobile: 'mobile',
} as const satisfies Record<TypeDeviceType, string>;

const orderDirectionArray = [orderDirections.asc, orderDirections.desc] as const satisfies TypeDirection[];
const arrayStatusArray = [status.inactive, status.active] as const satisfies TypeStatus[];

const triggerTypesArray = [triggerTypes.clickOnElement, triggerTypes.custom, triggerTypes.pageLoad, triggerTypes.timeOnPage];
const campaignRequirementsArray = [
  requirementTypes.audience,
  requirementTypes.cookie,
  requirementTypes.custom,
  requirementTypes.device,
  requirementTypes.localStorage,
  requirementTypes.queryParam,
  requirementTypes.sessionStorage,
  requirementTypes.url,
] satisfies Exclude<TypeRequirementType, 'node'>[];

const windowKey = 'ba_tester';

const audienceRestrictionTypes = {
  any: 'any',
  boolean: 'boolean',
  node: 'node',
  number: 'number',
  string: 'string',
} as const satisfies Record<TypeAudienceRestrictionType, string>;
const audienceRequirementsArray = [
  audienceRestrictionTypes.boolean,
  audienceRestrictionTypes.number,
  audienceRestrictionTypes.string,
  audienceRestrictionTypes.any,
] satisfies Exclude<TypeAudienceRestrictionType, 'node'>[];

const audienceQuantityOperator = {
  atLeast: 'atLeast',
  atMost: 'atMost',
  equal: 'equal',
  lessThan: 'lessThan',
  moreThan: 'moreThan',
} as const satisfies Record<TypeAudienceNumberComparator, string>;

const audienceStringComparators = {
  contains: 'contains',
  doesNotContain: 'doesNotContain',
  equal: 'equal',
  isNot: 'isNot',
} as const satisfies Record<TypeAudienceStringComparator, string>;

const audienceNumberComparators = {
  atLeast: 'atLeast',
  atMost: 'atMost',
  equal: 'equal',
  lessThan: 'lessThan',
  moreThan: 'moreThan',
} as const satisfies Record<TypeAudienceNumberComparator, string>;

const audienceBooleanComparators = {
  equal: 'equal',
} as const satisfies Record<TypeAudienceBooleanComparator, string>;

const audienceTimeUnits = {
  days: 'days',
  hours: 'hours',
  minutes: 'minutes',
} as const satisfies Record<TypeAudienceTimeUnit, string>;

const constants = {
  arrayStatusArray,
  audienceBooleanComparators,
  audienceNumberComparators,
  audienceQuantityOperator,
  audienceRequirementsArray,
  audienceRestrictionTypes,
  audienceStringComparators,
  audienceTimeUnits,
  booleanOperators,
  campaignRequirementsArray,
  comparisons,
  devices,
  limitTypes,
  nodeTypes,
  orderDirectionArray,
  requirementTypes,
  status,
  triggerTypes,
  triggerTypesArray,
  typeRepetitions,
  windowKey,
} as const;

export default constants;
