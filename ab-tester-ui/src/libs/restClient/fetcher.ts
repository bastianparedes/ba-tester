import { env } from '@/libs/env';
import { withLoader } from '@/utils/hof';

export async function getCookies(): Promise<string> {
  if (typeof window !== 'undefined') {
    return document.cookie;
  }
  const { headers } = await import('next/headers');
  const headersResponse = await headers();
  const cookies = headersResponse.get('cookie') ?? '';
  return cookies;
}

const constructRequest = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
  const requestFunction = async <T extends Record<string, unknown> | unknown[] | string>({
    url,
    queryParams = {},
    body,
  }: {
    url: string;
    queryParams?: Record<string, string | number | string[] | number[]>;
    body?: Record<string, unknown>;
  }): Promise<{ ok: true; json: () => Promise<T>; text: () => Promise<string> } | { ok: false }> => {
    const isServerSide = typeof window === 'undefined';
    const baseUrl = isServerSide ? env.NEXT_PUBLIC_BACKEND_URL_FROM_SERVER_SIDE : env.NEXT_PUBLIC_BACKEND_URL_FROM_CLIENT_SIDE;

    const objectUrl = new URL(baseUrl + url);
    const cookies = await getCookies();

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
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookies,
        },
        method,
      });

      return { json: async () => response.json(), ok: response.ok, text: async () => response.text() };
    } catch (error) {
      console.error(error);
      return { ok: false };
    }
  };
  return requestFunction;
};

export const fetchers = {
  delete: withLoader(constructRequest('DELETE')),
  get: withLoader(constructRequest('GET')),
  post: withLoader(constructRequest('POST')),
  put: withLoader(constructRequest('PUT')),
};
