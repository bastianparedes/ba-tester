import * as role from './admin/roles/[roleId]/client';
import * as roles from './admin/roles/client';
import * as user from './admin/users/[userId]/client';
import * as users from './admin/users/client';
import * as auth from './public/auth/session/client';
import * as campaign from './tenants/[tenantId]/campaigns/[campaignId]/client';
import * as campaigns from './tenants/[tenantId]/campaigns/client';
import * as tenant from './tenants/[tenantId]/client';
import * as tenants from './tenants/client';

export default {
  auth,
  roles,
  role,
  users,
  user,
  tenants,
  tenant,
  campaigns,
  campaign,
};
