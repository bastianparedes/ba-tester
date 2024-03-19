import commonConstants from '../common/constants';

const labels = Object.freeze({
  campaign: {
    cancel: 'Cancel',
    name: {
      inputPlaceHolder: "Campaign's name",
      title: 'Campaign'
    },
    requirements: {
      newRequirement: 'New Restriction',
      table: {
        name: 'Name'
      },
      title: 'Restrictions'
    },
    save: 'Save',
    triggers: {
      booleanOperators: {
        or: 'or'
      },
      newTrigger: 'New Trigger',
      placeholder: {
        [commonConstants.triggerTypes.clickOnElement]: {
          valueStringOne: 'CSS Selector'
        },
        [commonConstants.triggerTypes.custom]: {
          valueStringOne: 'Name'
        }
      },
      seconds: 'Seconds',
      table: {
        name: 'Name'
      },
      title: 'Triggers',
      types: {
        [commonConstants.triggerTypes.pageLoad]: 'Page load',
        [commonConstants.triggerTypes.clickOnElement]: 'Click on element',
        [commonConstants.triggerTypes.timeOnPage]: 'Time on page',
        [commonConstants.triggerTypes.custom]: 'Custom'
      }
    },
    variations: {
      newVariation: 'New Variation',
      table: {
        id: 'ID',
        name: 'Name',
        traffic: 'Traffic'
      },
      title: 'Variations'
    }
  },
  campaigns: {
    camapaignsTable: {
      campaignName: 'Campaign Name',
      id: 'ID',
      lastModified: 'Last modified',
      status: 'Status'
    },
    filters: {
      name: 'Name',
      page: 'Page',
      quantity: 'Quantity',
      status: 'Status'
    },
    header: {
      createCampaignButton: 'Create new campaign',
      title: 'Campaigns'
    }
  },
  common: {
    requirement: {
      comparator: {
        [commonConstants.comparisons.contains]: 'Contains',
        [commonConstants.comparisons.doesNotContain]: 'Does not contain',
        [commonConstants.comparisons.exists]: 'Exists',
        [commonConstants.comparisons.doesNotExist]: 'Does not exist',
        [commonConstants.comparisons.is]: 'Is',
        [commonConstants.comparisons.isNot]: 'Is not',
        [commonConstants.typeRepetitions.atLeast]: 'at least',
        [commonConstants.typeRepetitions.atMost]: 'at most',
        [commonConstants.typeRepetitions.exactly]: 'exactly',
        [commonConstants.typeRepetitions.lessThan]: 'less than',
        [commonConstants.typeRepetitions.moreThan]: 'more than'
      },
      device: {
        [commonConstants.devices.desktop]: 'Desktop',
        [commonConstants.devices.mobile]: 'Mobile'
      },
      operator: {
        [commonConstants.booleanOperators.and]: 'and',
        [commonConstants.booleanOperators.or]: 'or'
      },
      placeholder: {
        [commonConstants.requirementTypes.cookie]: {
          name: 'Name',
          value: 'Value'
        },
        [commonConstants.requirementTypes.custom]: {
          name: 'Title'
        },
        [commonConstants.requirementTypes.device]: {},
        [commonConstants.requirementTypes.localStorage]: {
          name: 'Name',
          value: 'Value'
        },
        [commonConstants.requirementTypes.queryParam]: {
          name: 'Name',
          value: 'Value'
        },
        [commonConstants.requirementTypes.sessionStorage]: {
          name: 'Name',
          value: 'Value'
        },
        [commonConstants.requirementTypes.url]: {
          value: 'Value'
        }
      },
      type: {
        [commonConstants.requirementTypes.cookie]: 'Cookie',
        [commonConstants.requirementTypes.custom]: 'Custom',
        [commonConstants.requirementTypes.device]: 'Device',
        [commonConstants.requirementTypes.localStorage]: 'Local storage',
        [commonConstants.requirementTypes.queryParam]: 'Query Param',
        [commonConstants.requirementTypes.sessionStorage]: 'Session storage',
        [commonConstants.requirementTypes.url]: 'URL'
      }
    },
    statusLabels: {
      active: 'Active',
      deleted: 'Deleted',
      inactive: 'Inactive'
    },
    symbols: {
      percentage: '%'
    },
    table: {
      noData: 'No Data'
    }
  }
});

export default labels;
