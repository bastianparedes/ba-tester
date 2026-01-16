import { Injectable } from '@nestjs/common';
import { DbService } from '../db.service';
import { JwtService } from '../jwt.service';
import { PasswordService } from '../password.service';
import { cookieNames } from '@/domain/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly dbService: DbService,
        private readonly jwtService: JwtService,
        private readonly passwordService: PasswordService,
    ) {}

    async getUserFromToken(cookies: Record<string, string | undefined>) {
        const token = cookies[cookieNames.token];
        if (!token) return null;
        const tokenData = this.jwtService.getTokenData(token, 'session' )
        if (!tokenData.valid) return null;
        const userId = tokenData.id;
        const user = await this.dbService.users.get({ userId });
        return user;
    }
}
