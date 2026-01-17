import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { CampaignsController } from './controllers/campaigns.controller';
import { RolesController } from './controllers/roles.controller';
import { ScriptController } from './controllers/script.controller';
import { TenantsController } from './controllers/tenants.controller';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/auth.service';
import { DbService } from './services/db.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, ScriptController, RolesController, CampaignsController, TenantsController, UsersController],
  providers: [DbService, AuthService],
})
export class AppModule {}
