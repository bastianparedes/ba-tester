import { Navigation } from '@/app/_common/components/navigation';
import db from '@/libs/db';
import { ClientPage } from './clientPage';

export default async function Page() {
  const users = await db.users.getAll();
  const roles = await db.roles.getAll();

  return (
    <Navigation breadcrumb={[{ name: 'Users' }]}>
      <ClientPage initialUsers={users} roles={roles} />
    </Navigation>
  );
}
