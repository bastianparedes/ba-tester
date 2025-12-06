import { restClient } from '@/libs/restClient';
import { TypeRequirementDataCampaign, TypeTriggerData, TypeVariationData } from '@/types/databaseObjects';

const url = '/api/campaigns/';

export type TypeGet = {
  response: {
    campaigns: {
      id: number;
      name: string;
      requirements: {
        type: 'node';
        data: {
          children: TypeRequirementDataCampaign[];
          operator: 'and' | 'or';
        };
      } & {
        type: 'node';
      };
      status: 'active' | 'deleted' | 'inactive';
      triggers: TypeTriggerData[];
      variations: TypeVariationData[];
    };
  };
};

export const getCampaign = async ({ pathParams }: { pathParams: { id: number } }) => {
  const response = await restClient.get<TypeGet['response']>({
    url: `${url}${pathParams.id}`,
  });

  return response;
};

export type TypePut = {
  body: {
    name: string;
    requirements: {
      data: {
        children: TypeRequirementDataCampaign[];
        operator: 'and' | 'or';
      };
      type: 'node';
    };
    status: 'active' | 'deleted' | 'inactive';
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
            seconds: number;
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
export const updateCampaign = async ({ pathParams, body }: { pathParams: { id: number }; body: TypePut['body'] }) => {
  const response = await restClient.put<TypePut['response']>({ url: `${url}${pathParams.id}`, body });
  return response;
};
