import type { TypeRole } from '../types/role';
import type { TypeUser } from '../types/user';

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
        name: TypeUser['name'];
        email: TypeUser['email'];
        password: string;
      };
    };
    response: Record<string, never>;
  };
  update: {
    request: {
      headers?: RequestInit['headers'];
      pathParams: { userId: TypeUser['id'] };
      body: {
        name: TypeUser['name'];
        email: TypeUser['email'];
        roleIds: TypeRole['id'][];
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
  updatePassword: {
    request: {
      headers?: RequestInit['headers'];
      body: {
        oldPassword: string;
        newPassword: string;
      };
    };
    response: Record<string, never>;
  };
  updateAccount: {
    request: {
      headers?: RequestInit['headers'];
      body: {
        name: TypeUser['name'];
        email: TypeUser['email'];
      };
    };
    response: Record<string, never>;
  };
};
