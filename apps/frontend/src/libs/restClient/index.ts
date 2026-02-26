import { campaigns } from './api/campaigns';
import { executionGroups } from './api/executionGroups';
import { roles } from './api/roles';
import { scripts } from './api/scripts';
import { sessions } from './api/sessions';
import { tenants } from './api/tenants';
import { users } from './api/users';

export const apiCaller = {
  roles,
  users,
  sessions,
  tenants,
  executionGroups,
  campaigns,
  scripts,
};
