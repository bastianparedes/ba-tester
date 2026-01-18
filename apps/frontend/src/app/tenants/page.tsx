import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import { apiCaller } from '@/libs/restClient';
import { ClientPage } from './clientPage';

export default async function Page() {
  const headersList = await headers();
  const cookies = headersList.get('cookie') as string;

  const response = await apiCaller.tenants.getAll({ headers: { Cookie: cookies } });
  if (!response.ok) redirect(constants.pages.logIn());

  const tenants = await response.json();

  return (
    <Navigation breadcrumb={[{ name: 'Tenants' }]}>
      <ClientPage initialTenants={tenants} />
    </Navigation>
  );
}
