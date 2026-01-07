import { restClient } from '@/libs/restClient';

const url = ({ roleId }: { roleId: string }) => `/api/roles/${roleId}`;

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
