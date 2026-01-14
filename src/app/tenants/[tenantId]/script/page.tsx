import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import { getBuiltScript } from '@/app/api/public/script/[tenantId]/util';
import constants from '@/config/constants';
import db from '@/libs/db';
import { ClientPage } from './clientPage';

type Props = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function Page({ params: promiseParams }: Props) {
  const params = await promiseParams;
  const tenantId = Number(params.tenantId);
  const url = constants.pages.apiScript({ tenantId });
  const script = await getBuiltScript({ tenantId });
  const tenant = await db.tenants.get({ tenantId });
  if (!tenant) return redirect(constants.pages.tenants());

  return (
    <Navigation
      tenant={tenant}
      breadcrumb={[
        { name: 'Tenants', path: constants.pages.tenants() },
        { name: tenant.name },
        { name: 'Campaigns' },
      ]}
    >
      <ClientPage url={url} script={script} />
    </Navigation>
  );
}
