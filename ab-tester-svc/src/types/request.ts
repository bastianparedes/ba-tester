import { type TypeUser } from '@digital-retail/ab-tester-types/user';
import { type Request as ExpressRequest } from 'express';

export type Request = Omit<ExpressRequest, 'cookies'> & {
  cookies: Record<string, string | undefined>;
  user?: TypeUser;
};
