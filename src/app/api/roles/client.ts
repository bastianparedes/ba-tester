import { restClient } from '@/libs/restClient';

const url = () => `/api/roles`;

export type TypePost = {
  body: {
    name: string;
    description: string;
    permissions: string[];
  };
  response: never;
};
export const create = async ({ body }: { body: TypePost['body'] }) => {
  const response = await restClient.post<TypePost['response']>({ url: url(), body });
  return response;
};
