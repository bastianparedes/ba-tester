import type React from 'react';
import type { TypeTenant } from '@/domain/types';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

type Props = {
  children: React.ReactNode;
  tenant?: TypeTenant;
  breadcrumb: {
    name: string;
    path?: string;
  }[];
};

export function Navigation({ children, tenant, breadcrumb }: Props) {
  return (
    <Sidebar tenant={tenant}>
      <Navbar breadcrumb={breadcrumb}>{children}</Navbar>
    </Sidebar>
  );
}
