import { restClient } from '@/libs/restClient';
import type { TypeTenant } from '@/types/domain';

const url = ({ tenantId }: { tenantId: number }) => `/api/tenants/${tenantId}`;

export type TypePut = {
  body: {
    name: TypeTenant['name'];
    description: TypeTenant['description'];
    domain: TypeTenant['domain'];
  };
  response: {
    id: TypeTenant['id'];
    name: TypeTenant['name'];
    description: TypeTenant['description'];
    domain: TypeTenant['domain'];
  };
};
export const update = async ({
  pathParams,
  body,
}: {
  pathParams: { tenantId: number };
  body: TypePut['body'];
}) => {
  const response = await restClient.put<TypePut['response']>({
    url: url({ tenantId: pathParams.tenantId }),
    body,
  });
  return response;
};
