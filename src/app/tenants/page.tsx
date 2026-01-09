import { ClientPage } from './clientPage';
import db from '@/libs/db/postgres';
import { Navigation } from '@/app/_common/components/navigation';

export default async function Page() {
  const tenants = await db.tenants.getAll();
  return (
    <Navigation breadcrumb={[{ name: 'Tenants' }]}>
      <ClientPage initialTenants={tenants} />
    </Navigation>
  );
}
