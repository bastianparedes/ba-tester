import type { TypeOrderDirection, TypeRequirementData, TypeStatus, TypeTriggerData, TypeVariationData } from '../types';

export type TypeApiCampaigns = {
  get: {
    request: {
      pathParams: { tenantId: string; campaignId: string };
      body: never;
    };
    response:
      | {
          id: number;
          tenantId: number;
          name: string;
          requirements: {
            type: 'node';
            data: {
              children: TypeRequirementData[];
              operator: 'and' | 'or';
            };
          } & {
            type: 'node';
          };
          status: TypeStatus;
          triggers: TypeTriggerData[];
          variations: TypeVariationData[];
        }
      | undefined;
  };
  getMany: {
    request: {
      pathParams: { tenantId: string };
      queryParams: {
        textSearch: string;
        orderBy: 'name' | 'id' | 'status';
        orderDirection: TypeOrderDirection;
        page: number;
        quantity: number;
        statusList: TypeStatus[];
      };
      body: never;
    };
    response: {
      campaigns: {
        id: number;
        tenantId: number;
        name: string;
        requirements: {
          type: 'node';
          data: {
            children: TypeRequirementData[];
            operator: 'and' | 'or';
          };
        } & {
          type: 'node';
        };
        status: TypeStatus;
        triggers: TypeTriggerData[];
        variations: TypeVariationData[];
      }[];
      count: number;
    };
  };
  create: {
    request: {
      pathParams: { tenantId: string };
      body: {
        name: string;
        requirements: {
          data: {
            children: TypeRequirementData[];
            operator: 'and' | 'or';
          };
          type: 'node';
        };
        status: TypeStatus;
        triggers: (
          | {
              data: {
                selector: string;
              };
              id: number;
              type: 'clickOnElement';
            }
          | {
              data: {
                javascript: string;
                name: string;
              };
              id: number;
              type: 'custom';
            }
          | {
              data: Record<string, never>;
              id: number;
              type: 'pageLoad';
            }
          | {
              data: {
                milliseconds: number;
              };
              id: number;
              type: 'timeOnPage';
            }
        )[];
        variations: {
          css: string;
          html: string;
          id: number;
          javascript: string;
          name: string;
          traffic: number;
        }[];
      };
    };
    response: undefined;
  };
  update: {
    request: {
      pathParams: { tenantId: string; campaignId: string };
      body: {
        name: string;
        requirements: {
          data: {
            children: TypeRequirementData[];
            operator: 'and' | 'or';
          };
          type: 'node';
        };
        status: TypeStatus;
        triggers: (
          | {
              data: {
                selector: string;
              };
              id: number;
              type: 'clickOnElement';
            }
          | {
              data: {
                javascript: string;
                name: string;
              };
              id: number;
              type: 'custom';
            }
          | {
              data: Record<string, never>;
              id: number;
              type: 'pageLoad';
            }
          | {
              data: {
                milliseconds: number;
              };
              id: number;
              type: 'timeOnPage';
            }
        )[];
        variations: {
          css: string;
          html: string;
          id: number;
          javascript: string;
          name: string;
          traffic: number;
        }[];
      };
    };
    response: undefined;
  };
  delete: {
    request: {
      pathParams: { tenantId: string; campaignId: string };
      body: never;
    };
    response: never;
  };
};
