import { restClient } from '@/libs/restClient';
import { TypeStatus, TypeOrderDirection, TypeRequirementData, TypeTriggerData, TypeVariationData } from '@/types/db';

const url = ({ tenantId }: { tenantId: number }) => `/api/tenants/${tenantId}/campaigns`;

export type TypeGet = {
  queryParams: {
    name: string;
    orderBy: 'name' | 'id' | 'status';
    orderDirection: TypeOrderDirection;
    page: number;
    quantity: number;
    statusList: TypeStatus[];
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

export const getCampaigns = async ({
  pathParams,
  queryParams,
}: {
  pathParams: { tenantId: number };
  queryParams: TypeGet['queryParams'];
}) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(queryParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item.toString()));
    } else if (value !== null && value !== undefined) {
      params.append(key, value.toString());
    }
  }

  const response = await restClient.get<TypeGet['response']>({
    url: `${url({ tenantId: pathParams.tenantId })}?${params.toString()}`,
  });

  return response;
};

export type TypePost = {
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
  response: never;
};
export const createCampaign = async ({
  pathParams,
  body,
}: {
  pathParams: { tenantId: number };
  body: TypePost['body'];
}) => {
  const response = await restClient.post<TypePost['response']>({ url: url({ tenantId: pathParams.tenantId }), body });
  return response;
};
