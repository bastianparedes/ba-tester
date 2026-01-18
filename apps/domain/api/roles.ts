import type { TypeRole } from '../types';

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
    response: TypeRole;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
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
      headers?: RequestInit['headers'];
      pathParams: { roleId: string };
    };
    response: Record<string, never>;
  };
};
