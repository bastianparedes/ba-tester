import * as tenants from './tenants/client';
import * as tenant from './tenants/[tenantId]/client';
import * as campaigns from './tenants/[tenantId]/campaigns/client';
import * as campaign from './tenants/[tenantId]/campaigns/[campaignId]/client';

export default {
  tenants,
  tenant,
  campaigns,
  campaign,
};
