import { restClient } from '@/libs/restClient';

const url = () => `/api/users`;

export type TypePost = {
  body: {
    name: string;
    email: string;
    password: string;
    roleId: string;
  };
  response: never;
};
export const create = async ({ body }: { body: TypePost['body'] }) => {
  const response = await restClient.post<TypePost['response']>({ url: url(), body });
  return response;
};
