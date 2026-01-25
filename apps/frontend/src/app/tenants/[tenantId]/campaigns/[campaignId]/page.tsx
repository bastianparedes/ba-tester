import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import { apiCaller } from '@/libs/restClient';
import { ClientPage } from './clientPage';

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

  const headersList = await headers();
  const cookies = headersList.get('cookie') as string;

  const tenantResponse = await apiCaller.tenants.get({ headers: { Cookie: cookies }, pathParams: { tenantId } });
  if (!tenantResponse.ok) return redirect(constants.pages.tenants());
  const tenant = await tenantResponse.json();

  const campaignResponse = await apiCaller.campaigns.get({ headers: { Cookie: cookies }, pathParams: { tenantId, campaignId } });
  if (!campaignResponse.ok) return redirect(constants.pages.campaigns({ tenantId }));

  const initialCampaign = await campaignResponse.json();

  return (
    <Navigation
      tenant={tenant}
      breadcrumb={[
        { name: 'Tenants', path: constants.pages.tenants() },
        { name: tenant.name },
        { name: 'Campaigns', path: constants.pages.campaigns({ tenantId }) },
        {
          name: initialCampaign.name,
          path: constants.pages.campaigns({ tenantId }),
        },
      ]}
    >
      <ClientPage initialCampaign={initialCampaign} tenantId={tenantId} campaignId={campaignId} />
    </Navigation>
  );
};

export default Page;
