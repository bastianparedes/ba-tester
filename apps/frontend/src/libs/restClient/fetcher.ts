import { env } from '@/libs/env';
import { withLoader } from '@/utils/hof';

const constructRequest = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
  const requestFunction = async <T extends Record<string, unknown> | unknown[] | string>({
    url,
    queryParams = {},
    body,
    headers = {},
  }: {
    url: string;
    queryParams?: Record<string, string | number | string[] | number[]>;
    body?: Record<string, unknown>;
    headers?: RequestInit['headers'];
  }): Promise<{ ok: true; json: () => Promise<T>; text: () => Promise<string> } | { ok: false }> => {
    const isServerSide = typeof window === 'undefined';
    const baseUrl = isServerSide ? env.NEXT_PUBLIC_BACKEND_URL_SERVER_SIDE : env.NEXT_PUBLIC_BACKEND_URL_CLIENT_SIDE;

    const objectUrl = new URL(baseUrl + url);
    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          objectUrl.searchParams.append(key, String(v));
        });
      } else {
        objectUrl.searchParams.append(key, String(value));
      }
    });

    try {
      console.info('Making fetch to', objectUrl.toString());
      const response = await fetch(objectUrl.toString(), {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        credentials: 'include',
      });

      return { ok: response.ok, json: async () => response.json(), text: async () => response.text() };
    } catch (error) {
      console.error(error);
      return { ok: false };
    }
  };
  return requestFunction;
};

export const fetchers = {
  get: withLoader(constructRequest('GET')),
  post: withLoader(constructRequest('POST')),
  put: withLoader(constructRequest('PUT')),
  delete: withLoader(constructRequest('DELETE')),
};
