import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthController } from './controllers/auth.controller';
import { CampaignsController } from './controllers/campaigns.controller';
import { RolesController } from './controllers/roles.controller';
import { ScriptController } from './controllers/script.controller';
import { TenantsController } from './controllers/tenants.controller';
import { UsersController } from './controllers/users/users.controller';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { DbService } from './services/db.service';
import { JwtService } from './services/jwt.service';
import { PasswordService } from './services/password.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, ScriptController, RolesController, CampaignsController, TenantsController, UsersController],
  providers: [AppService, DbService, AuthService, PasswordService, JwtService],
})
export class AppModule {}
