import { ClientPage } from '../[campaignId]/clientPage';
import commonConstants from '@/config/common/constants';
import { Navbar } from '@/app/_common/components/navigation/Navbar';
import { Sidebar } from '@/app/_common/components/navigation/Sidebar';
import constants from '@/config/constants';
import db from '@/libs/db/postgres';
import { redirect } from 'next/navigation';

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
    <Navbar
      breadcrumb={[
        { name: 'Tenants', path: constants.pages.tenants() },
        { name: tenant.name },
        { name: 'Campaigns', path: constants.pages.campaigns({ tenantId }) },
        { name: 'New campaign' },
      ]}
    >
      <Sidebar tenant={tenant}>
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
      </Sidebar>
    </Navbar>
  );
};

export default Page;
