import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import commonConstants from '@/domain/constants';
import db from '@/libs/db';
import { ClientPage } from '../[campaignId]/clientPage';

type PageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};
const Page = async (props: PageProps) => {
  const params = await props.params;
  const tenantId = Number(params.tenantId);

  const tenant = await db.tenants.get({ tenantId });
  if (!tenant) return redirect(constants.pages.tenants());

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
          id: undefined,
          tenantId,
          name: 'New Campaign Name',
          requirements: {
            data: {
              children: [],
              operator: 'and',
            },
            type: 'node',
          },
          status: commonConstants.status.inactive,
          triggers: [],
          variations: [],
        }}
      />
    </Navigation>
  );
};

export default Page;
