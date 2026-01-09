import { restClient } from '@/libs/restClient';

const url = ({ roleId }: { roleId: string }) => `/api/admin/roles/${roleId}`;

export type TypePut = {
  body: { name: string; description: string; permissions: string[] };
  response: never;
};
export const update = async ({ pathParams, body }: { pathParams: { roleId: string }; body: TypePut['body'] }) => {
  const response = await restClient.put<TypePut['response']>({
    url: url({ roleId: pathParams.roleId }),
    body,
  });
  return response;
};

export type TypeDelete = {
  body: never;
  response: never;
};
export const remove = async ({ pathParams }: { pathParams: { roleId: string } }) => {
  const response = await restClient.delete<TypeDelete['response']>({
    url: url({ roleId: pathParams.roleId }),
  });
  return response;
};
