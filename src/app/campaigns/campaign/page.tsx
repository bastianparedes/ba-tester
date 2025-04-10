import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import path from 'path';

import Components from './components';
import commonConstants from '../../../../config/common/constants';
import constants from '../../../../config/constants';
import drizzle from '../../../../lib/drizzle';
import { Campaign } from '../../../../lib/drizzle/schema';
import { basePath } from '../../../../next.config';

const Page = async (props: {
  searchParams: Promise<{ id: string | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const redirectUrl = path.join(basePath, constants.pages.campaigns);

  if (searchParams.id === undefined)
    return (
      <Components
        initialCampaign={{
          id: undefined,
          name: 'New Campaign Name',
          requirements: {
            data: {
              children: [],
              operator: 'and'
            },
            type: 'node'
          },
          status: commonConstants.status.inactive,
          triggers: [],
          variations: []
        }}
      />
    );

  const isNumber = /^-?\d+$/.test(searchParams.id);
  if (!isNumber) redirect(redirectUrl);

  const id = Number.parseInt(searchParams.id);

  const initialCampaign = await drizzle.query.Campaign.findFirst({
    where: eq(Campaign.id, id)
  });

  if (initialCampaign === undefined) redirect(redirectUrl);

  return <Components initialCampaign={initialCampaign} />;
};

export default Page;
