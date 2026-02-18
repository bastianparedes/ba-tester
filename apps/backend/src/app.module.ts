import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { CampaignsController } from './controllers/campaigns.controller';
import { HealthController } from './controllers/health.controller';
import { RolesController } from './controllers/roles.controller';
import { ScriptController } from './controllers/script.controller';
import { TenantsController } from './controllers/tenants.controller';
import { UsersController } from './controllers/users.controller';
import { EventsGateway } from './gateways/campaigns.gateway';
import { DbRepository } from './repositories/db.repository';
import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { DbService } from './services/db.service';
import { InitializeService } from './services/initialize/initialize.service';

@Module({
  imports: [],
  controllers: [AuthController, ScriptController, RolesController, CampaignsController, TenantsController, UsersController, HealthController],
  providers: [DbRepository, DbService, CacheService, AuthService, InitializeService, EventsGateway],
})
export class AppModule {}
