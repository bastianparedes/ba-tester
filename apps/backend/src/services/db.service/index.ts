import { Injectable, OnModuleInit } from '@nestjs/common';
import { roles, seedMongoDb, users } from './mongodb';
import { campaigns, tenants } from './postgres';
import { cache } from './redis';

@Injectable()
export class DbService implements OnModuleInit {
  users = users;
  roles = roles;
  tenants = tenants;
  campaigns = campaigns;
  cache = cache;

  onModuleInit() {
    seedMongoDb();
  }
}
