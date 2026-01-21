import { Injectable } from '@nestjs/common';
import { cookieNames } from '../../../domain/config';
import { getTokenData } from '../libs/auth/jwt';
import { DbService } from './db.service';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DbService) {}

  async getUserFromToken(cookies: Record<string, string | undefined>) {
    const token = cookies[cookieNames.token];
    if (!token) return null;
    const tokenData = getTokenData({ token, purpose: 'session' });
    if (!tokenData.valid) return null;
    const userId = tokenData.id;
    const user = await this.dbService.users.get({ userId });
    return user;
  }
}
