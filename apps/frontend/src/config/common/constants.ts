import type {
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
} from '@/domain/types';

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
  exists: 'exists',
  is: 'is',
  isNot: 'isNot',
} as const satisfies Record<TypeStringComparator, string>;

const requirementTypes = {
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
  exactly: 'exactly',
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

const campaignStatus = [status.inactive, status.active] as const satisfies TypeStatus[];
const campaignOrderDirection = [orderDirections.asc, orderDirections.desc] as const satisfies TypeDirection[];

const triggers = [triggerTypes.clickOnElement, triggerTypes.custom, triggerTypes.pageLoad, triggerTypes.timeOnPage];
const campaignRequirements = [
  requirementTypes.cookie,
  requirementTypes.custom,
  requirementTypes.device,
  requirementTypes.localStorage,
  requirementTypes.queryParam,
  requirementTypes.sessionStorage,
  requirementTypes.url,
] satisfies Exclude<TypeRequirementType, 'node'>[];

const windowKey = 'ba_tester';

const constants = {
  booleanOperators,
  campaignRequirements,
  campaignStatus,
  campaignOrderDirection,
  comparisons,
  devices,
  limitTypes,
  nodeTypes,
  requirementTypes,
  status,
  triggerTypes,
  triggers,
  typeRepetitions,
  windowKey,
} as const;

export default constants;
