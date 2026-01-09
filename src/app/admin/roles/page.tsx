import { ClientPage } from './clientPage';
import db from '@/libs/db/mongodb';
import { Navigation } from '@/app/_common/components/navigation';

export default async function Page() {
  const roles = await db.roles.getAll();
  return (
    <Navigation breadcrumb={[{ name: 'Roles' }]}>
      <ClientPage initialRoles={roles} />
    </Navigation>
  );
}
