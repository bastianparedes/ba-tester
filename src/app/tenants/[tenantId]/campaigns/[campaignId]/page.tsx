import { redirect } from 'next/navigation';

import { ClientPage } from './clientPage';
import constants from '../../../../../config/constants';
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

  const initialCampaign = await db.campaigns.get({ tenantId, campaignId });
  const redirectUrl = constants.pages.campaigns({ tenantId });
  if (initialCampaign === undefined) redirect(redirectUrl);

  return <ClientPage initialCampaign={initialCampaign} />;
};

export default Page;
