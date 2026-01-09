import { redirect } from 'next/navigation';
import { Navbar } from '@/app/_common/components/navigation/Navbar';
import { Sidebar } from '@/app/_common/components/navigation/Sidebar';
import { ClientPage } from './clientPage';
import constants from '@/config/constants';
import db from '@/libs/db/postgres';

type PageProps = {
  params: Promise<{
    tenantId: string;
    campaignId: string;
  }>;
};
const Page = async (props: PageProps) => {
  const params = await props.params;
  const tenantId = Number(params.tenantId);
  const campaignId = Number(params.campaignId);

  const tenant = await db.tenants.get({ tenantId });
  if (!tenant) return redirect(constants.pages.tenants());

  const initialCampaign = await db.campaigns.get({ tenantId, campaignId });
  if (initialCampaign === undefined) redirect(constants.pages.campaigns({ tenantId }));

  return (
    <Navbar
      breadcrumb={[
        { name: 'Tenants', path: constants.pages.tenants() },
        { name: tenant.name },
        { name: 'Campaigns', path: constants.pages.campaigns({ tenantId }) },
        { name: initialCampaign.name, path: constants.pages.campaigns({ tenantId }) },
      ]}
    >
      <Sidebar tenant={tenant}>
        <ClientPage initialCampaign={initialCampaign} />
      </Sidebar>
    </Navbar>
  );
};

export default Page;
