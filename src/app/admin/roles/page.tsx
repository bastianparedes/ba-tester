import { ClientPage } from './clientPage';
import db from '@/libs/db/mongodb';
import { Navigation } from '@/app/_common/components/navigation';
import { getUserFromCookies } from '@/utils/user';
import { isUserSuperAdmin } from '@/utils/user';
import { permissions } from '@/libs/permissions';

export default async function Page() {
  const user = await getUserFromCookies();
  if (!user) return null;
  const userIsSuperAdmin = isUserSuperAdmin(user);

  const userCanCreateRoles = userIsSuperAdmin || user.role.permissions.includes(permissions.role.create);
  const userCanModifyRoles = userIsSuperAdmin || user.role.permissions.includes(permissions.role.update);
  const userCanDeleteRoles = userIsSuperAdmin || user.role.permissions.includes(permissions.role.delete);

  const roles = await db.roles.getAll();
  return (
    <Navigation breadcrumb={[{ name: 'Roles' }]}>
      <ClientPage
        initialRoles={roles}
        userCanCreateRoles={userCanCreateRoles}
        userCanModifyRoles={userCanModifyRoles}
        userCanDeleteRoles={userCanDeleteRoles}
      />
    </Navigation>
  );
}
