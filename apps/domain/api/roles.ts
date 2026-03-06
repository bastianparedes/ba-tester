import type { TypeRole } from '../types/role';

export type TypeApiRoles = {
  getAll: {
    request: {
      headers?: RequestInit['headers'];
    };
    response: TypeRole[];
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      body: {
        name: string;
        description: string;
        permissions: string[];
      };
    };
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { roleId: TypeRole['id'] };
      body: {
        name: string;
        description: string;
        permissions: string[];
      };
    };
    response: Record<string, never>;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { roleId: TypeRole['id'] };
    };
    response: Record<string, never>;
  };
};
