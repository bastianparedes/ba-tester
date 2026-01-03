'use server';

import { ClientPage } from './clientPage';

type PageProps = {
  params: Promise<{
    tenantId: string;
  }>;
};
export default async function Page({ params }: PageProps) {
  const tenantId = Number((await params).tenantId);
  return <ClientPage tenantId={tenantId} />;
}
