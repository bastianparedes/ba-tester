import { ClientPage } from './clientPage';
import { Navbar } from '@/app/_common/components/navigation/Navbar';
import { Sidebar } from '@/app/_common/components/navigation/Sidebar';
import db from '@/libs/db/mongodb';

export default async function Page() {
  const users = await db.users.getAll();
  const roles = await db.roles.getAll();

  return (
    <Navbar breadcrumb={[{ name: 'Users' }]}>
      <Sidebar>
        <ClientPage initialUsers={users} roles={roles} />
      </Sidebar>
    </Navbar>
  );
}
