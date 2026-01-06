import { ClientPage } from './clientPage';
import db from '@/libs/db';

export default async function Page() {
  const tenants = await db.tenants.getAll();
  return <ClientPage initialTenants={tenants} />;
}
