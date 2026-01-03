import {
  TypeStringComparator,
  TypeNumericComparator,
  TypeDeviceType,
  TypeBooleanOperator,
  TypeTriggerType,
  TypeRequirementType,
  TypeStatus,
} from '@/types/constants';

const labels = {
  campaign: {
    cancel: 'Cancel',
    name: {
      inputPlaceHolder: "Campaign's name",
      title: 'Campaign',
    },
    requirements: {
      newRequirement: 'New Restriction',
      table: {
        name: 'Name',
      },
      title: 'Restrictions',
    },
    save: 'Save',
    triggers: {
      booleanOperators: {
        or: 'or',
      },
      newTrigger: 'New Trigger',
      placeholder: {
        clickOnElement: {
          valueStringOne: 'CSS Selector',
        },
        custom: {
          valueStringOne: 'Name',
        },
      } satisfies Partial<Record<TypeTriggerType, unknown>>,
      milliseconds: 'Milliseconds',
      table: {
        name: 'Name',
      },
      title: 'Triggers',
      types: {
        pageLoad: 'Page load',
        clickOnElement: 'Click on element',
        timeOnPage: 'Time on page',
        custom: 'Custom',
      } satisfies Record<TypeTriggerType, string>,
    },
    variations: {
      newVariation: 'New Variation',
      table: {
        id: 'ID',
        name: 'Name',
        traffic: 'Traffic',
      },
      title: 'Variations',
    },
  },
  campaigns: {
    camapaignsTable: {
      campaignName: 'Campaign Name',
      id: 'ID',
      lastModified: 'Last modified',
      status: 'Status',
    },
    filters: {
      title: 'Filters',
      name: 'Search by name',
      page: 'Page',
      quantity: 'Quantity',
      status: 'Status',
      applyFilters: 'Apply Filters',
    },
    header: {
      createCampaignButton: 'Create new campaign',
      title: 'Campaigns',
      subTitle: 'Gestión de experimentos y variaciones',
    },
    table: {
      noData: 'No se encontraron tests que coincidan con los filtros',
    },
  },
  common: {
    requirement: {
      comparator: {
        contains: 'Contains',
        doesNotContain: 'Does not contain',
        exists: 'Exists',
        doesNotExist: 'Does not exist',
        is: 'Is',
        isNot: 'Is not',
        atLeast: 'At least',
        atMost: 'At most',
        exactly: 'Exactly',
        lessThan: 'Less than',
        moreThan: 'More than',
      } satisfies Record<TypeStringComparator | TypeNumericComparator, string>,
      device: {
        desktop: 'Desktop',
        mobile: 'Mobile',
      } satisfies Record<TypeDeviceType, string>,
      operator: {
        and: 'and',
        or: 'or',
      } satisfies Record<TypeBooleanOperator, string>,
      placeholder: {
        cookie: {
          name: 'Name',
          value: 'Value',
        },
        custom: {
          name: 'Title',
        },
        device: {},
        localStorage: {
          name: 'Name',
          value: 'Value',
        },
        queryParam: {
          name: 'Name',
          value: 'Value',
        },
        sessionStorage: {
          name: 'Name',
          value: 'Value',
        },
        url: {
          value: 'Value',
        },
      } satisfies Partial<Record<TypeRequirementType, { name?: string; value?: string }>>,
      type: {
        cookie: 'Cookie',
        custom: 'Custom',
        device: 'Device',
        localStorage: 'Local storage',
        queryParam: 'Query Param',
        sessionStorage: 'Session storage',
        url: 'URL',
      } satisfies Record<Exclude<TypeRequirementType, 'node'>, string>,
    },
    statusLabels: {
      active: 'Active',
      deleted: 'Deleted',
      inactive: 'Inactive',
    } satisfies Record<TypeStatus, string>,
    symbols: {
      percentage: '%',
    },
  },
};

export default labels;
