import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import { getBuiltScript } from '@/app/api/public/script/[tenantId]/util';
import constants from '@/config/constants';
import { apiCaller } from '@/libs/restClient';
import { ClientPage } from './clientPage';

type Props = {
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function Page({ params: promiseParams }: Props) {
  const params = await promiseParams;
  const tenantId = Number(params.tenantId);
  const url = constants.pages.apiScript({ tenantId });
  const script = await getBuiltScript({ tenantId });
  const tenantResponse = await apiCaller.tenants.get({ pathParams: { tenantId } });
  if (!tenantResponse.ok) return redirect(constants.pages.tenants());
  const tenant = await tenantResponse.json();

  return (
    <Navigation tenant={tenant} breadcrumb={[{ name: 'Tenants', path: constants.pages.tenants() }, { name: tenant.name }, { name: 'Campaigns' }]}>
      <ClientPage url={url} script={script} />
    </Navigation>
  );
}
