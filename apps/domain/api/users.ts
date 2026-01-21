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
        role: {
          id: string;
        };
      };
    };
    response: TypeUser;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { userId: string };
      body: {
        name: string;
        email: string;
        role: {
          id: string;
        };
      };
    };
    response: TypeUser;
  };
  delete: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { userId: string };
    };
    response: Record<string, never>;
  };
};
