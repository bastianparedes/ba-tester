import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import { apiCaller } from '@/libs/restClient';
import { ClientPage } from './clientPage';

type PageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};
export default async function Page({ params }: PageProps) {
  const tenantId = Number((await params).tenantId);

  const headersList = await headers();
  const cookies = headersList.get('cookie') as string;
  const response = await apiCaller.tenants.get({ headers: { Cookie: cookies }, pathParams: { tenantId } });
  if (!response.ok) redirect(constants.pages.logIn());

  const tenant = await response.json();

  return (
    <Navigation tenant={tenant} breadcrumb={[{ name: 'Tenants', path: constants.pages.tenants() }, { name: tenant.name }, { name: 'Campaigns' }]}>
      <ClientPage tenantId={tenantId} />
    </Navigation>
  );
}
