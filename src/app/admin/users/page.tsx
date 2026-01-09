import { ClientPage } from './clientPage';
import { Navbar } from '@/app/_common/components/navigation/Navbar';
import { Sidebar } from '@/app/_common/components/navigation/Sidebar';
import db from '@/libs/db/mongodb';

export default async function Page() {
  const users = await db.users.getAll();
  const roles = await db.roles.getAll();

  return (
    <Sidebar>
      <Navbar breadcrumb={[{ name: 'Roles' }]}>
        <ClientPage initialUsers={users} roles={roles} />
      </Navbar>
    </Sidebar>
  );
}
