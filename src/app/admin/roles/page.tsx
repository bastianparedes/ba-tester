import { Navigation } from '@/app/_common/components/navigation';
import db from '@/libs/db';
import { ClientPage } from './clientPage';

export default async function Page() {
  const roles = await db.roles.getAll();
  return (
    <Navigation breadcrumb={[{ name: 'Roles' }]}>
      <ClientPage initialRoles={roles} />
    </Navigation>
  );
}
