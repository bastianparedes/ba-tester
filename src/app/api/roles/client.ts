import { restClient } from '@/libs/restClient';
import { TypeRole } from '@/types/domain';

const url = () => `/api/roles`;

export type TypePost = {
  body: {
    name: string;
    description: string;
    permissions: string[];
  };
  response: TypeRole;
};
export const create = async ({ body }: { body: TypePost['body'] }) => {
  const response = await restClient.post<TypePost['response']>({ url: url(), body });
  return response;
};
