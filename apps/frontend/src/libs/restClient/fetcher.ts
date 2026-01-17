import { withLoader } from '@/utils/hof';

const constructRequest = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
  const requestFunction = async <T extends Record<string, unknown> | unknown[]>({
    url,
    queryParams = {},
    body,
  }: {
    url: string;
    queryParams?: Record<string, string | number | string[] | number[]>;
    body?: Record<string, unknown>;
  }): Promise<{ ok: true; json: () => Promise<{ data: T }> } | { ok: false; json: () => Promise<{ errors: string[] }> }> => {
    const isServerSide = typeof window === 'undefined';
    const baseUrl = isServerSide ? process.env.NEXT_PUBLIC_BACKEND_URL_SERVER_SIDE : process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT_SIDE;

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
      const response = await fetch(objectUrl.toString(), {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      return { ok: response.ok, json: async () => data };
    } catch (error) {
      console.error(error);
      return { ok: false, json: async () => ({ errors: ['Network error'] }) };
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
