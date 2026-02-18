import { Injectable, OnModuleInit } from '@nestjs/common';
import { roles, seedMongoDb, users } from './mongodb';
import { campaigns, tenants } from './postgres';

@Injectable()
export class DbRepository implements OnModuleInit {
  users = users;
  roles = roles;
  tenants = tenants;
  campaigns = campaigns;

  onModuleInit() {
    seedMongoDb();
  }
}
