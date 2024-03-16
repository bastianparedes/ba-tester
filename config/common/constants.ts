const status = Object.freeze({
  active: 'active',
  deleted: 'deleted',
  inactive: 'inactive'
});

const booleanOperators = Object.freeze({
  and: 'and',
  or: 'or'
});

const comparisons = Object.freeze({
  contains: 'contains',
  doesNotContain: 'doesNotContain',
  doesNotExist: 'doesNotExist',
  exists: 'exists',
  is: 'is',
  isNot: 'isNot'
});

const requirementTypes = Object.freeze({
  audience: 'audience',
  cookie: 'cookie',
  custom: 'custom',
  device: 'device',
  localStorage: 'localStorage',
  node: 'node',
  pageViewsHistory: 'pageViewsHistory',
  queryParam: 'queryParam',
  sessionStorage: 'sessionStorage',
  url: 'url'
});

const numericComparators = Object.freeze({
  atLeast: 'atLeast',
  atMost: 'atMost',
  exactly: 'exactly',
  lessThan: 'lessThan',
  moreThan: 'moreThan'
});

const typeRepetitions = Object.freeze({
  atLeast: 'atLeast',
  atMost: 'atMost',
  exactly: 'exactly',
  lessThan: 'lessThan',
  moreThan: 'moreThan'
});

const limitTypes = Object.freeze({
  oneDay: 'oneDay',
  oneMonth: 'oneMonth',
  oneWeek: 'oneWeek',
  session: 'session',
  threeMonths: 'threeMonths'
});

const nodeTypes = Object.freeze({
  internal: 'internal',
  root: 'root'
});

const triggerTypes = Object.freeze({
  clickOnElement: 'clickOnElement',
  custom: 'custom',
  pageLoad: 'pageLoad',
  timeOnPage: 'timeOnPage'
});

const devices = Object.freeze({
  desktop: 'desktop',
  mobile: 'mobile'
});

const campaignStatus = [
  status.inactive,
  status.active,
  status.deleted
] as const;

const audienceStatus = [status.active, status.deleted] as const;
const triggers = [
  triggerTypes.clickOnElement,
  triggerTypes.custom,
  triggerTypes.pageLoad,
  triggerTypes.timeOnPage
];
const audienceRequirements = [requirementTypes.pageViewsHistory];
const campaignRequirements = [
  requirementTypes.cookie,
  requirementTypes.custom,
  requirementTypes.device,
  requirementTypes.localStorage,
  requirementTypes.queryParam,
  requirementTypes.sessionStorage,
  requirementTypes.url,
  requirementTypes.audience
];

const constants = Object.freeze({
  audienceRequirements,
  audienceStatus,
  booleanOperators,
  campaignRequirements,
  campaignStatus,
  comparisons,
  devices,
  limitTypes,
  nodeTypes,
  numericComparators,
  requirementTypes,
  status,
  triggerTypes,
  triggers,
  typeRepetitions
});

export default constants;
