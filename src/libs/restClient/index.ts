import { withLoader } from '../hof';

const constructRequest = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
  const requestFunction = async <T extends Record<string, unknown> | unknown[]>({
    url,
    body,
  }: {
    url: string;
    body?: Record<string, unknown> | FormData;
  }): Promise<
    { ok: true; json: () => Promise<{ data: T }> } | { ok: false; json: () => Promise<{ errors: string[] }> }
  > => {
    try {
      const response = await fetch(url, {
        method,
        body: body instanceof FormData ? body : JSON.stringify(body),
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

export const restClient = {
  get: withLoader(constructRequest('GET')),
  post: withLoader(constructRequest('POST')),
  put: withLoader(constructRequest('PUT')),
  delete: withLoader(constructRequest('DELETE')),
};
