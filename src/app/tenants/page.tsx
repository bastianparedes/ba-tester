import { ClientPage } from './clientPage';
import db from '@/libs/db';

export default async function Page() {
  const tenants = await db.getTenants();
  return <ClientPage initialTenants={tenants} />;
}
