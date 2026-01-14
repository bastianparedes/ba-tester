import { Navigation } from '@/app/_common/components/navigation';
import db from '@/libs/db';
import { ClientPage } from './clientPage';

export default async function Page() {
  const tenants = await db.tenants.getAll();
  return (
    <Navigation breadcrumb={[{ name: 'Tenants' }]}>
      <ClientPage initialTenants={tenants} />
    </Navigation>
  );
}
