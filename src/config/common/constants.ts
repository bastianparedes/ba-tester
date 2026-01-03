import { TypeStatus, TypeOrderDirection } from '@/types/db';
import {
  TypeDirection,
  TypeBooleanOperator,
  TypeStringComparator,
  TypeRequirementType,
  TypeNumericComparator,
  TypeLimitType,
  TypeNodeType,
  TypeTriggerType,
  TypeDeviceType,
} from '@/types/constants';

const status = Object.freeze({
  active: 'active',
  deleted: 'deleted',
  inactive: 'inactive',
}) satisfies Record<TypeStatus, string>;

const orderDirections = Object.freeze({
  asc: 'asc',
  desc: 'desc',
}) satisfies Record<TypeDirection, string>;

const booleanOperators = Object.freeze({
  and: 'and',
  or: 'or',
}) satisfies Record<TypeBooleanOperator, string>;

const comparisons = Object.freeze({
  contains: 'contains',
  doesNotContain: 'doesNotContain',
  doesNotExist: 'doesNotExist',
  exists: 'exists',
  is: 'is',
  isNot: 'isNot',
}) satisfies Record<TypeStringComparator, string>;

const requirementTypes = Object.freeze({
  cookie: 'cookie',
  custom: 'custom',
  device: 'device',
  localStorage: 'localStorage',
  node: 'node',
  queryParam: 'queryParam',
  sessionStorage: 'sessionStorage',
  url: 'url',
}) satisfies Record<TypeRequirementType, string>;

const typeRepetitions = Object.freeze({
  atLeast: 'atLeast',
  atMost: 'atMost',
  exactly: 'exactly',
  lessThan: 'lessThan',
  moreThan: 'moreThan',
}) satisfies Record<TypeNumericComparator, string>;

const limitTypes = Object.freeze({
  oneDay: 'oneDay',
  oneMonth: 'oneMonth',
  oneWeek: 'oneWeek',
  session: 'session',
  threeMonths: 'threeMonths',
}) satisfies Record<TypeLimitType, string>;

const nodeTypes = Object.freeze({
  internal: 'internal',
  root: 'root',
}) satisfies Record<TypeNodeType, string>;

const triggerTypes = Object.freeze({
  clickOnElement: 'clickOnElement',
  custom: 'custom',
  pageLoad: 'pageLoad',
  timeOnPage: 'timeOnPage',
}) satisfies Record<TypeTriggerType, string>;

const devices = Object.freeze({
  desktop: 'desktop',
  mobile: 'mobile',
}) satisfies Record<TypeDeviceType, string>;

const campaignStatus = [status.inactive, status.active, status.deleted] as const satisfies TypeStatus[];
const campaignOrderDirection = [orderDirections.asc, orderDirections.desc] as const satisfies TypeOrderDirection[];

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

const constants = Object.freeze({
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
});

export default constants;
