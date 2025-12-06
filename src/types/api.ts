import { type NextResponse } from 'next/server';

export type TypeApiResponse<T extends Record<string, unknown>> = Promise<
  NextResponse<
    | {
        errors: string[];
        data?: never;
      }
    | {
        errors?: never;
        data?: T;
      }
  >
>;
