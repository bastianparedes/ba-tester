import { ClientPage } from './clientPage';
import { Navbar } from '@/app/_common/components/navigation/Navbar';
import { Sidebar } from '@/app/_common/components/navigation/Sidebar';
import db from '@/libs/db/mongodb';

export default async function Page() {
  const roles = await db.roles.getAll();
  return (
    <Navbar breadcrumb={[{ name: 'Roles' }]}>
      <Sidebar>
        <ClientPage initialRoles={roles} />
      </Sidebar>
    </Navbar>
  );
}
