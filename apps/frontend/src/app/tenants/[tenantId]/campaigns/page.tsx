import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import db from '@/libs/db';
import { ClientPage } from './clientPage';

type PageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};
export default async function Page({ params }: PageProps) {
  const tenantId = Number((await params).tenantId);
  const tenant = await db.tenants.get({ tenantId });
  if (!tenant) return redirect(constants.pages.tenants());

  return (
    <Navigation tenant={tenant} breadcrumb={[{ name: 'Tenants', path: constants.pages.tenants() }, { name: tenant.name }, { name: 'Campaigns' }]}>
      <ClientPage tenantId={tenantId} />
    </Navigation>
  );
}
