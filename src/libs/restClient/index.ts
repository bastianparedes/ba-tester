import { useLoaderStore } from '@/app/_common/contexts/Loader/state';

const constructRequest = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
  const { showLoader, hideLoader } = useLoaderStore.getState();

  const requestFunction = async <T extends Record<string, unknown> | unknown[]>({
    url,
    body,
  }: {
    url: string;
    body?: Record<string, unknown> | FormData;
  }): Promise<
    { ok: true; json: () => Promise<{ data: T }> } | { ok: false; json: () => Promise<{ errors: string[] }> }
  > => {
    showLoader();
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
    } finally {
      hideLoader();
    }
  };
  return requestFunction;
};

export const restClient = {
  get: constructRequest('GET'),
  post: constructRequest('POST'),
  put: constructRequest('PUT'),
  delete: constructRequest('DELETE'),
};
