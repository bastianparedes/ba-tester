import type { TypeApiSessions } from '@digital-retail/ab-tester-types/api/sessions';
import { fetchers } from '../fetcher';

export const sessions = {
  logIn: async (data: TypeApiSessions['logIn']['request']) => {
    const response = await fetchers.post<TypeApiSessions['logIn']['response']>({
      body: data.body,

      url: '/public/auth/session',
    });
    return response;
  },
  logOut: async () => {
    const response = await fetchers.get<TypeApiSessions['logOut']['response']>({
      url: '/public/auth/session',
    });
    return response;
  },
};
