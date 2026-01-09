import * as roles from './admin/roles/client';
import * as role from './admin/roles/[roleId]/client';
import * as users from './admin/users/client';
import * as user from './admin/users/[userId]/client';
import * as tenants from './tenants/client';
import * as tenant from './tenants/[tenantId]/client';
import * as campaigns from './tenants/[tenantId]/campaigns/client';
import * as campaign from './tenants/[tenantId]/campaigns/[campaignId]/client';

export default {
  roles,
  role,
  users,
  user,
  tenants,
  tenant,
  campaigns,
  campaign,
};
