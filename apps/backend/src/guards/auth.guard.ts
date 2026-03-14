import { CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common';
import { cookieNames } from '../../../domain/config';
import { getTokenData } from '../libs/auth/jwt';
import { DbService } from '../services/db.service';
import { type Request } from '../types/request';

export function AuthGuard(permission: string): Type<CanActivate> {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(private readonly dbService: DbService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = request.cookies[cookieNames.token];
      if (!token) return false;
      const tokenData = getTokenData({ purpose: 'session', token });
      if (!tokenData.valid) return false;
      const userId = tokenData.id;

      const user = await this.dbService.users.get({ userId });
      if (!user) return false;

      const userHasPermission = user.roles.some((some) => some.permissions.includes(permission));
      if (!userHasPermission) return false;

      request.user = user;
      return true;
    }
  }

  return mixin(AuthGuardMixin);
}
