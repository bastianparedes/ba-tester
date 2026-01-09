import { ClientPage } from './clientPage';
import db from '@/libs/db/postgres';
import { Navbar } from '@/app/_common/components/navigation/Navbar';
import { Sidebar } from '@/app/_common/components/navigation/Sidebar';

export default async function Page() {
  const tenants = await db.tenants.getAll();
  return (
    <Navbar breadcrumb={[{ name: 'Tenants' }]}>
      <Sidebar>
        <ClientPage initialTenants={tenants} />
      </Sidebar>
    </Navbar>
  );
}
