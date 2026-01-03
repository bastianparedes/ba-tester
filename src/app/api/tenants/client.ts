import { restClient } from '@/libs/restClient';
import { TypeTenant } from '@/types/db';

const url = () => '/api/tenants';

export type TypeGet = {
  response: {
    tenants: TypeTenant[];
  };
};

export const getTentants = async () => {
  const response = await restClient.get<TypeGet['response']>({
    url: url(),
  });

  return response;
};

export type TypePost = {
  body: {
    name: TypeTenant['name'];
    description: TypeTenant['description'];
    domain: TypeTenant['domain'];
  };
  response: TypeTenant;
};
export const createTenant = async ({ body }: { body: TypePost['body'] }) => {
  const response = await restClient.post<TypePost['response']>({ url: url(), body });
  return response;
};
