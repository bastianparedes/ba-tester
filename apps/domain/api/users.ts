import type { TypeUser } from '../types';

export type TypeApiUsers = {
  getAll: {
    request: {
      headers?: RequestInit['headers'];
    };
    response: TypeUser[];
  };
  get: {
    request: {
      headers?: RequestInit['headers'];
    };
    response: TypeUser;
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      body: {
        name: string;
        email: string;
        password: string;
        roleId: TypeUser['roleId'];
      };
    };
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { userId: TypeUser['id'] };
      body: {
        name: string;
        email: string;
        roleId: TypeUser['roleId'];
      };
    };
    response: Record<string, never>;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { userId: TypeUser['id'] };
    };
    response: Record<string, never>;
  };
};
