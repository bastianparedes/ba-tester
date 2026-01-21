import { type Request as ExpressRequest } from 'express';
import { type TypeUser } from '../../../domain/types';

export type Request = Omit<ExpressRequest, 'cookies'> & {
  cookies: Record<string, string | undefined>;
  user?: TypeUser;
};
