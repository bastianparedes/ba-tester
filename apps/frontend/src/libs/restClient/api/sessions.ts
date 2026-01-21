import type { TypeApiSessions } from '@/domain/api/sessions';
import { fetchers } from '../fetcher';

export const sessions = {
  logOut: async (data: TypeApiSessions['logOut']['request']) => {
    const response = await fetchers.get<TypeApiSessions['logOut']['response']>({
      headers: data.headers,
      url: '/public/auth/session',
    });
    return response;
  },
  logIn: async (data: TypeApiSessions['logIn']['request']) => {
    const response = await fetchers.post<TypeApiSessions['logIn']['response']>({
      headers: data.headers,
      url: '/public/auth/session',
      body: data.body,
    });
    return response;
  },
};
