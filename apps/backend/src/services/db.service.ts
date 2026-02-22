import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/repositories/role.repository';
import { CampaignRepository } from '../repositories/campaign.repository';
import { TenantRepository } from '../repositories/tenant.repository';
import { UserRepository } from '../repositories/user.repository';
import { CacheService } from './cache.service';
import { ScriptService } from './script.service';

@Injectable()
export class DbService {
  users: Omit<UserRepository, 'onModuleInit'>;
  roles: RoleRepository;
  tenants: TenantRepository;
  campaigns: CampaignRepository;
  constructor(
    private readonly cacheService: CacheService,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly tenantRepository: TenantRepository,
    private readonly campaignRepository: CampaignRepository,
    private readonly scriptService: ScriptService,
  ) {
    this.users = {
      ...this.userRepository,
      get: async (args) => {
        const cached = await this.cacheService.users.get({ userId: args.userId });
        if (cached) return cached;

        const user = await this.userRepository.get(args);
        if (user) await this.cacheService.users.save({ user });
        return user;
      },
      create: this.userRepository.create,
      update: async (args, updates) => {
        await this.userRepository.update(args, updates);
        const user = await this.userRepository.get({ userId: args.userId });
        if (!user) throw new Error('Could not get recently updated user');
        await this.cacheService.users.save({ user });
        return user;
      },
      getForLogin: this.userRepository.getForLogin,
      getAll: this.userRepository.getAll,
      getMany: this.userRepository.getMany,
      remove: async (args) => {
        const removedUser = await this.userRepository.remove(args);
        await this.cacheService.users.clear({ userId: args.userId });
        return removedUser;
      },
    };
    this.roles = {
      ...this.roleRepository,
      update: async (...args) => {
        const updatedRole = await this.roleRepository.update(...args);
        await this.cacheService.users.clearAll();
        return updatedRole;
      },
      remove: async (...args) => {
        const removedRole = await this.roleRepository.remove(...args);
        await this.cacheService.users.clearAll();
        return removedRole;
      },
    };
    this.tenants = this.tenantRepository;
    this.campaigns = {
      ...this.campaignRepository,
      create: async (args, requirements) => {
        const result = await this.campaignRepository.create(args, requirements);
        await this.scriptService.populateScript({ tenantId: args.tenantId });
        return result;
      },
      update: async (args, requirements) => {
        const result = await this.campaignRepository.create(args, requirements);
        await this.scriptService.populateScript({ tenantId: args.tenantId });
        return result;
      },
    };
  }
}
