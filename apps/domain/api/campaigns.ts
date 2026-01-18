import type { TypeOrderDirection, TypeRequirementData, TypeStatus, TypeTriggerData, TypeVariationData } from '../types';

export type TypeApiCampaigns = {
  get: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: number; campaignId: number };
    };
    response: {
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
    };
  };
  getMany: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: number };
      queryParams: {
        textSearch: string;
        orderBy: 'name' | 'id' | 'status';
        orderDirection: TypeOrderDirection;
        page: number;
        quantity: number;
        statusList: TypeStatus[];
      };
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
      headers?: RequestInit['headers'];
      pathParams: { tenantId: number };
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
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: number; campaignId: number };
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
    response: Record<string, never>;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { tenantId: number; campaignId: number };
    };
    response: never;
  };
};
