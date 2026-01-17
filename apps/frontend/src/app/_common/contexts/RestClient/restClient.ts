import { withLoader } from '@/utils/hof';

const constructRequest = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
  const requestFunction = async <T extends Record<string, unknown> | unknown[]>({
    url,
    body,
  }: {
    url: string;
    body?: Record<string, unknown>;
  }): Promise<{ ok: true; json: () => Promise<{ success: true; data: T } | { success: false; errors: string[] }> } | { ok: false }> => {
    try {
      const response = await fetch(url, {
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
      return { ok: false };
    }
  };
  return requestFunction;
};

export const restClient = {
  get: withLoader(constructRequest('GET')),
  post: withLoader(constructRequest('POST')),
  put: withLoader(constructRequest('PUT')),
  delete: withLoader(constructRequest('DELETE')),
};
