import { Injectable } from '@nestjs/common';
import { superAdminId } from '../../../domain/config';
import { flatPermissions } from '../../../domain/permissions';
import { getPasswordHashed } from '../libs/auth/password';
import { env } from '../libs/env';
import { CampaignRepository } from '../repositories/campaign.repository';
import { RoleRepository } from '../repositories/role.repository';
import { TenantRepository } from '../repositories/tenant.repository';
import { UserRepository } from '../repositories/user.repository';
import { CacheService } from './cache.service';
import { ScriptService } from './script.service';

@Injectable()
export class DbService {
  users: UserRepository;
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

        if (args.userId === superAdminId) {
          const user = {
            email: env.SUPER_ADMIN_EMAIL,
            id: superAdminId,
            name: 'Super Admin',
            role: {
              description: 'Super admin is GOD',
              id: 'Super Admin Role ID',
              name: 'Super Admin Role',
              permissions: flatPermissions,
            },
          };
          await this.cacheService.users.save({ user });
          return user;
        }

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
      getForLogin: async (args) => {
        if (args.email === env.SUPER_ADMIN_EMAIL)
          return {
            id: superAdminId,
            email: env.SUPER_ADMIN_EMAIL,
            passwordHash: getPasswordHashed(env.SUPER_ADMIN_PASSWORD),
          };
        return this.userRepository.getForLogin(args);
      },
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
        const result = await this.campaignRepository.update(args, requirements);
        await this.scriptService.populateScript({ tenantId: args.tenantId });
        return result;
      },
    };
  }
}
