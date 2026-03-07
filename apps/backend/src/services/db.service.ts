import { Injectable } from '@nestjs/common';
import { superAdminId } from '../../../domain/config';
import { flatPermissions } from '../../../domain/permissions';
import { getPasswordHashed } from '../libs/auth/password';
import { env } from '../libs/env';
import { CampaignRepository } from '../repositories/campaign.repository';
import { ExecutionGroupRepository } from '../repositories/executionGroup.repository';
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
  executionGroup: ExecutionGroupRepository;
  campaigns: CampaignRepository;
  constructor(
    private readonly cacheService: CacheService,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly tenantRepository: TenantRepository,
    private readonly campaignRepository: CampaignRepository,
    private readonly executionGroupRepository: ExecutionGroupRepository,
    private readonly scriptService: ScriptService,
  ) {
    this.users = {
      ...this.userRepository,
      create: this.userRepository.create,
      get: async (args) => {
        if (env.NODE_ENV === 'production') {
          const cached = await this.cacheService.users.get({ userId: args.userId });
          if (cached) return cached;
        }

        if (args.userId === superAdminId) {
          const user = {
            email: env.SUPER_ADMIN_EMAIL,
            id: superAdminId,
            name: 'Super Admin',
            role: {
              description: 'Super admin is GOD',
              id: -1,
              name: 'Super Admin Role',
              permissions: flatPermissions,
            },
            roleId: -1,
          };
          await this.cacheService.users.save({ user });
          return user;
        }

        const user = await this.userRepository.get(args);
        if (user) await this.cacheService.users.save({ user });
        return user;
      },
      getAll: this.userRepository.getAll,
      getForLogin: async (args) => {
        if (args.email === env.SUPER_ADMIN_EMAIL)
          return {
            email: env.SUPER_ADMIN_EMAIL,
            id: superAdminId,
            passwordHash: getPasswordHashed(env.SUPER_ADMIN_PASSWORD),
          };
        return this.userRepository.getForLogin(args);
      },
      remove: async (args) => {
        const removedUser = await this.userRepository.remove(args);
        await this.cacheService.users.clear({ userIds: [args.userId] });
        return removedUser;
      },
      update: async (args) => {
        await this.userRepository.update(args);
        const user = await this.userRepository.get({ userId: args.userId });
        if (!user) throw new Error('Could not get recently updated user');
        await this.cacheService.users.save({ user });
      },
    };
    this.roles = {
      ...this.roleRepository,
      remove: async (...args) => {
        const users = await this.userRepository.getAllWithRoleId({ roleId: args[0].roleId });
        await this.roleRepository.remove(...args);
        await this.cacheService.users.clear({ userIds: users.map((u) => u.id) });
      },
      update: async (...args) => {
        const updatedRole = await this.roleRepository.update(...args);
        const users = await this.userRepository.getAllWithRoleId({ roleId: args[0].roleId });

        await this.cacheService.users.clear({ userIds: users.map((u) => u.id) });
        return updatedRole;
      },
    };
    this.tenants = this.tenantRepository;
    this.campaigns = {
      ...this.campaignRepository,
      create: async (args) => {
        const result = await this.campaignRepository.create(args);
        await this.scriptService.clear({ tenantId: args.tenantId });
        return result;
      },
      remove: async (args) => {
        const result = await this.campaignRepository.remove(args);
        await this.scriptService.clear({ tenantId: args.tenantId });
        return result;
      },
      update: async (args) => {
        const result = await this.campaignRepository.update(args);
        await this.scriptService.clear({ tenantId: args.tenantId });
        return result;
      },
    };
    this.executionGroup = {
      ...this.executionGroupRepository,
      create: async (args) => {
        const result = await this.executionGroupRepository.create(args);
        await this.scriptService.clear({ tenantId: args.tenantId });
        return result;
      },
      remove: async (args) => {
        const result = await this.executionGroupRepository.remove(args);
        await this.scriptService.clear({ tenantId: args.tenantId });
        return result;
      },
      update: async (args) => {
        const result = await this.executionGroupRepository.update(args);
        await this.scriptService.clear({ tenantId: args.tenantId });
        return result;
      },
    };
  }
}
