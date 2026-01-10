import { restClient } from '@/libs/restClient';

const url = '/api/auth/log-out';

export type TypeGet = {
  response: never;
};
export const logOut = async () => {
  const response = await restClient.get<TypeGet['response']>({ url });
  return response;
};
