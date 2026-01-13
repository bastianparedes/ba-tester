import { redirect } from 'next/navigation';
import type React from 'react';
import constants from '@/config/constants';
import db from '@/libs/db';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    tenantId: string;
  }>;
};
export default async function RootLayout(props: LayoutProps) {
  const params = await props.params;
  const tenantId = Number(params.tenantId);
  const tenant = await db.tenants.get({ tenantId });
  if (!tenant) redirect(constants.pages.tenants());

  return props.children;
}
