import type { TypeRole } from '../types';

export type TypeApiRoles = {
  getAll: {
    request: {
      body: never;
    };
    response: TypeRole[];
  };
  create: {
    request: {
      body: {
        name: string;
        description: string;
        permissions: string[];
      };
    };
    response: TypeRole;
  };
  update: {
    request: {
      pathParams: { roleId: string };
      body: {
        name: string;
        description: string;
        permissions: string[];
      };
    };
    response: TypeRole;
  };
  delete: {
    request: {
      pathParams: { roleId: string };
      body: never;
    };
    response: undefined;
  };
};
