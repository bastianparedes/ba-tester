export type TypeApiResponse<T extends Record<string, unknown>> =
  | {
      errors: string[];
      data?: never;
    }
  | {
      errors?: never;
      data?: T;
    };
