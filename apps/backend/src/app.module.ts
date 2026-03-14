import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AuthController } from './controllers/auth.controller';
import { CampaignsController } from './controllers/campaigns.controller';
import { ExecutionGroupsController } from './controllers/executionGroup.controller';
import { HealthController } from './controllers/health.controller';
import { RolesController } from './controllers/roles.controller';
import { ScriptController } from './controllers/script.controller';
import { TenantsController } from './controllers/tenants.controller';
import { TrackEventController } from './controllers/trackEvent.controller';
import { UsersController } from './controllers/users.controller';
import { EventsGateway } from './gateways/campaigns.gateway';
import { CampaignRepository } from './repositories/campaign.repository';
import { ExecutionGroupRepository } from './repositories/executionGroup.repository';
import { RoleRepository } from './repositories/role.repository';
import { TenantRepository } from './repositories/tenant.repository';
import { TrackEventRepository } from './repositories/trackEvent.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { DbService } from './services/db.service';
import { ScriptService } from './services/script.service';

@Module({
  controllers: [
    TrackEventController,
    AuthController,
    ScriptController,
    RolesController,
    CampaignsController,
    TenantsController,
    UsersController,
    AccountController,
    HealthController,
    ExecutionGroupsController,
  ],
  imports: [],
  providers: [
    TrackEventRepository,
    ExecutionGroupRepository,
    CampaignRepository,
    RoleRepository,
    TenantRepository,
    UserRepository,
    DbService,
    ScriptService,
    CacheService,
    AuthService,
    EventsGateway,
  ],
})
export class AppModule {}
