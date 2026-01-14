import { restClient } from '@/libs/restClient';

const url = () => '/api/public/auth/session';

export type TypeGet = {
  response: never;
};
export const logOut = async () => {
  const response = await restClient.get<TypeGet['response']>({ url: url() });
  return response;
};

export type TypePost = {
  body: {
    email: string;
    password: string;
  };
  response: never;
};
export const logIn = async ({ body }: { body: TypePost['body'] }) => {
  const response = await restClient.post<TypePost['response']>({
    url: url(),
    body,
  });
  return response;
};
