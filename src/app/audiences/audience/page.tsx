import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import path from 'path';

import Components from './components';
import commonConstants from '../../../../config/common/constants';
import constants from '../../../../config/constants';
import drizzle from '../../../../lib/drizzle';
import { Audience } from '../../../../lib/drizzle/schema';
import { basePath } from '../../../../next.config';

const Page = async ({
  searchParams
}: {
  searchParams: { id: string | undefined };
}) => {
  const redirectUrl = path.join(basePath, constants.pages.audiences);

  if (searchParams.id === undefined)
    return (
      <Components
        initialAudience={{
          id: undefined,
          name: 'New Audience Name',
          requirements: {
            data: {
              children: [],
              operator: 'and'
            },
            type: 'node'
          },
          status: commonConstants.status.active
        }}
      />
    );

  const isNumber = /^-?\d+$/.test(searchParams.id);
  if (!isNumber) redirect(redirectUrl);

  const id = Number.parseInt(searchParams.id);

  const initialAudience = await drizzle.query.Audience.findFirst({
    columns: {
      id: true,
      name: true,
      requirements: true,
      status: true
    },
    where: eq(Audience.id, id)
  });

  if (initialAudience === undefined) redirect(redirectUrl);

  return <Components initialAudience={initialAudience} />;
};

export default Page;
