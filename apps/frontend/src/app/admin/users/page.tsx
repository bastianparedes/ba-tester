import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import { apiCaller } from '@/libs/restClient';
import { ClientPage } from './clientPage';

export default async function Page() {
  const headersList = await headers();
  const cookies = headersList.get('cookie') as string;
  const usersResponse = await apiCaller.users.getAll({ headers: { Cookie: cookies } });
  if (!usersResponse.ok) redirect(constants.pages.logIn());

  const rolesResponse = await apiCaller.roles.getAll({ headers: { Cookie: cookies } });
  if (!rolesResponse.ok) redirect(constants.pages.logIn());

  const users = await usersResponse.json();
  const roles = await rolesResponse.json();

  return (
    <Navigation breadcrumb={[{ name: 'Users' }]}>
      <ClientPage initialUsers={users} roles={roles} />
    </Navigation>
  );
}
