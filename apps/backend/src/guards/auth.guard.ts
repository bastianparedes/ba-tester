import { type Request } from 'express';
@Req() req: Request



import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  mixin,
} from '@nestjs/common';
import { DbService } from '@/services/db.service';
import { JwtService } from '@/services/jwt.service';
import { PasswordService } from '@/services/password.service';

export function PermissionGuard(permission: string): Type<CanActivate> {
  @Injectable()
  class AuthGuard implements CanActivate {
    constructor(
      private readonly dbService: DbService, 
      private readonly jwtService: JwtService,
      private readonly passwordService: PasswordService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return this.permissionsService.hasPermission(user, permission);
    }
  }

  return mixin(AuthGuard);
}
