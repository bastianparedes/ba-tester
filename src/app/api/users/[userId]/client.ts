import { restClient } from '@/libs/restClient';

const url = ({ userId }: { userId: string }) => `/api/users/${userId}`;

export type TypePut = {
  body: {
    name: string;
    email: string;
    description: string;
    role: {
      id: string;
    };
  };
  response: never;
};
export const update = async ({ pathParams, body }: { pathParams: { userId: string }; body: TypePut['body'] }) => {
  const response = await restClient.put<TypePut['response']>({
    url: url({ userId: pathParams.userId }),
    body,
  });
  return response;
};

export type TypeDelete = {
  body: never;
  response: never;
};
export const remove = async ({ pathParams }: { pathParams: { userId: string } }) => {
  const response = await restClient.delete<TypeDelete['response']>({
    url: url({ userId: pathParams.userId }),
  });
  return response;
};
