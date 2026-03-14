export type TypeApiSessions = {
  logIn: {
    request: {
      headers?: RequestInit['headers'];
      body: {
        email: string;
        password: string;
      };
    };
    response: Record<string, never>;
  };
  logOut: {
    request: {
      headers?: RequestInit['headers'];
    };
    response: Record<string, never>;
  };
};
