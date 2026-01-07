import { ClientPage } from './clientPage';
import { Navbar } from '@/app/_common/components/navigation/Navbar';
import { Sidebar } from '@/app/_common/components/navigation/Sidebar';

export default async function Page() {
  return (
    <Sidebar>
      <Navbar breadcrumb={[{ name: 'Roles' }]}>
        <ClientPage />
      </Navbar>
    </Sidebar>
  );
}
