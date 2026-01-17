import type { TypeUser } from '../types';

export type TypeApiUsers = {
  getAll: {
    request: {
      body: never;
    };
    response: TypeUser[];
  };
  create: {
    request: {
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
      pathParams: { userId: string };
      body: TypeUser;
    };
    response: TypeUser;
  };
  delete: {
    request: {
      pathParams: { userId: string };
      body: never;
    };
    response: undefined;
  };
};
