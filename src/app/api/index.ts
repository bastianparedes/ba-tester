import * as role from './roles/[roleId]/client';
import * as roles from './roles/client';
import * as tenants from './tenants/client';
import * as tenant from './tenants/[tenantId]/client';
import * as campaigns from './tenants/[tenantId]/campaigns/client';
import * as campaign from './tenants/[tenantId]/campaigns/[campaignId]/client';

export default {
  roles,
  role,
  tenants,
  tenant,
  campaigns,
  campaign,
};
