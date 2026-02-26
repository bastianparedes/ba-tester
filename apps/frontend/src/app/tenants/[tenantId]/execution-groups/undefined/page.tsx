import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import { apiCaller } from '@/libs/restClient';
import { ClientPage } from '../[executionGroupId]/clientPage';

type PageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};
const Page = async (props: PageProps) => {
  const params = await props.params;
  const tenantId = Number(params.tenantId);
  const headersList = await headers();
  const cookies = headersList.get('cookie') as string;
  const tenantResponse = await apiCaller.tenants.get({ headers: { Cookie: cookies }, pathParams: { tenantId } });
  if (!tenantResponse.ok) return redirect(constants.pages.tenants());
  const tenant = await tenantResponse.json();
  const allCampaignsResponse = await apiCaller.campaigns.getAllLight({ headers: { Cookie: cookies }, pathParams: { tenantId } });
  if (!allCampaignsResponse.ok) return redirect(constants.pages.executionGroups({ tenantId }));
  const { campaigns } = await allCampaignsResponse.json();

  return (
    <Navigation
      tenant={tenant}
      breadcrumb={[
        { name: 'Tenants', path: constants.pages.tenants() },
        { name: tenant.name },
        { name: 'Execution groups', path: constants.pages.executionGroups({ tenantId }) },
        { name: 'New execution group' },
      ]}
    >
      <ClientPage
        initialExecutionGroup={{
          id: undefined,
          name: 'New execution group name',
          strategy: 'execute_all',
          persistCampaignAcrossReloads: true,
          tenantId,
        }}
        initialCampaigns={[]}
        tenantId={tenantId}
        executionGroupId={undefined}
        allCampaigns={campaigns}
      />
    </Navigation>
  );
};

export default Page;
