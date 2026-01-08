import { restClient } from '@/libs/restClient';
import { TypeStatus, TypeRequirementData } from '@/types/domain';

const url = ({ tenantId, campaignId }: { tenantId: number; campaignId: number }) =>
  `/api/tenants/${tenantId}/campaigns/${campaignId}`;

export type TypePut = {
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
export const update = async ({
  pathParams,
  body,
}: {
  pathParams: { tenantId: number; campaignId: number };
  body: TypePut['body'];
}) => {
  const response = await restClient.put<TypePut['response']>({
    url: url({ tenantId: pathParams.tenantId, campaignId: pathParams.campaignId }),
    body,
  });
  return response;
};
