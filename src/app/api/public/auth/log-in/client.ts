import { restClient } from '@/libs/restClient';

const url = () => '/api/public/auth/log-in';

export type TypePost = {
  body: {
    email: string;
    password: string;
  };
  response: never;
};
export const logIn = async ({ body }: { body: TypePost['body'] }) => {
  const response = await restClient.post<TypePost['response']>({ url: url(), body });
  return response;
};
