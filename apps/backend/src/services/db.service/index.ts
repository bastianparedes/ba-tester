import { Injectable } from '@nestjs/common';
import { roles, users } from './mongodb';
import { campaigns, tenants } from './postgres';
import { cache } from './redis';

@Injectable()
export class DbService {
  users = users;
  roles = roles;
  tenants = tenants;
  campaigns = campaigns;
  cache = cache;
}
