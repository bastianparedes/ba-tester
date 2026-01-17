export type TypeApiSessions = {
  logIn: {
    request: {
      body: {
        email: string;
        password: string;
      };
    };
    response: undefined;
  };
  logOut: {
    request: {
      body: never;
    };
    response: undefined;
  };
};
