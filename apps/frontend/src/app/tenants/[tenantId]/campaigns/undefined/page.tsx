import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import commonConstants from '@/domain/constants';
import { apiCaller } from '@/libs/restClient';
import { ClientPage } from '../[campaignId]/clientPage';

type PageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};
const Page = async (props: PageProps) => {
  const params = await props.params;
  const tenantId = Number(params.tenantId);

  const tenantResponse = await apiCaller.tenants.get({ pathParams: { tenantId } });
  if (!tenantResponse.ok) return redirect(constants.pages.tenants());
  const tenant = await tenantResponse.json();

  return (
    <Navigation
      tenant={tenant}
      breadcrumb={[
        { name: 'Tenants', path: constants.pages.tenants() },
        { name: tenant.name },
        { name: 'Campaigns', path: constants.pages.campaigns({ tenantId }) },
        { name: 'New campaign' },
      ]}
    >
      <ClientPage
        initialCampaign={{
          executionGroupId: null,
          id: undefined,
          name: 'New Campaign Name',
          requirements: {
            data: {
              children: [],
              operator: 'and',
            },
            type: 'node',
          },
          status: commonConstants.status.active,
          tenantId,
          triggers: [],
          variations: [],
        }}
        tenantId={tenantId}
        campaignId={undefined}
      />
    </Navigation>
  );
};

export default Page;
