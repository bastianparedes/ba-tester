import { Navigation } from '@/app/_common/components/navigation';
import { apiCaller } from '@/libs/restClient';
import { ClientPage } from './clientPage';

export default async function Page() {
  const response = await apiCaller.tenants.getAll();
  if (!response.ok) throw new Error('Error del servidor');
  const tenants = await response.json();
  return (
    <Navigation breadcrumb={[{ name: 'Tenants' }]}>
      <ClientPage initialTenants={tenants} />
    </Navigation>
  );
}
