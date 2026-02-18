import { Injectable } from '@nestjs/common';
import { DbRepository } from '../repositories/db.repository';
import { CacheService } from './cache.service';

@Injectable()
export class DbService {
  users: typeof this.dbRepository.users;
  roles: typeof this.dbRepository.roles;
  tenants: typeof this.dbRepository.tenants;
  campaigns: typeof this.dbRepository.campaigns;
  constructor(
    private readonly dbRepository: DbRepository,
    private readonly cacheService: CacheService,
  ) {
    this.users = {
      ...this.dbRepository.users,
      get: async (args) => {
        const cached = await this.cacheService.users.get({ userId: args.userId });
        if (cached) return cached;

        const user = await this.dbRepository.users.get(args);
        if (user) await this.cacheService.users.save({ user });
        return user;
      },
      update: async (args, updates) => {
        await this.dbRepository.users.update(args, updates);
        const user = await this.dbRepository.users.get({ userId: args.userId });
        if (!user) throw new Error('Could not get recently updated user');
        await this.cacheService.users.save({ user });
        return user;
      },
    };
    this.roles = this.dbRepository.roles;
    this.tenants = this.dbRepository.tenants;
    this.campaigns = this.dbRepository.campaigns;
  }
}
