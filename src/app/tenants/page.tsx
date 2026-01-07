import { ClientPage } from './clientPage';
import db from '@/libs/db/postgres';
import { Navbar } from '@/app/_common/components/navigation/Navbar';

export default async function Page() {
  const tenants = await db.tenants.getAll();
  return (
    <Navbar breadcrumb={[{ name: 'Tenants' }]}>
      <ClientPage initialTenants={tenants} />
    </Navbar>
  );
}
