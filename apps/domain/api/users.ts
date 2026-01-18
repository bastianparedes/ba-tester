import type { TypeUser } from '../types';

export type TypeApiUsers = {
  getAll: {
    request: {
      headers?: RequestInit['headers'];
    };
    response: TypeUser[];
  };
  create: {
    request: {
      headers?: RequestInit['headers'];
      body: {
        name: string;
        email: string;
        password: string;
        role: {
          id: number;
        };
      };
    };
    response: TypeUser;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { userId: number };
      body: TypeUser;
    };
    response: TypeUser;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { userId: number };
    };
    response: Record<string, never>;
  };
};
