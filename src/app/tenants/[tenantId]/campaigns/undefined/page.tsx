import { ClientPage } from '../[campaignId]/clientPage';
import commonConstants from '@/config/common/constants';

type PageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};
const Page = async (props: PageProps) => {
  const params = await props.params;
  const tenantId = Number(params.tenantId);

  return (
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
  );
};

export default Page;
