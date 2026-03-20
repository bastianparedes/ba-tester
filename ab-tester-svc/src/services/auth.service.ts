import { Injectable } from '@nestjs/common';
import { getTokenData } from '../libs/auth/jwt';
import { cookieNames } from '../libs/constants';
import { DbService } from './db.service';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DbService) {}

  async getUserFromToken(cookies: Record<string, string | undefined>) {
    const token = cookies[cookieNames.token];
    if (!token) return null;
    const tokenData = getTokenData({ purpose: 'session', token });
    if (!tokenData.valid) return null;
    const userId = tokenData.id;
    const user = await this.dbService.users.get({ userId });
    return user;
  }
}
