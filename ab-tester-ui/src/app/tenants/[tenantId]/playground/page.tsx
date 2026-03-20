import { redirect } from 'next/navigation';
import { Navigation } from '@/app/_common/components/navigation';
import constants from '@/config/constants';
import { apiCaller } from '@/libs/restClient';

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
  params: Promise<{
    tenantId: string;
  }>;
};

export default async function Page({ params: promiseParams, searchParams }: Props) {
  const params = await promiseParams;
  const tenantId = Number(params.tenantId);

  const tenantResponse = await apiCaller.tenants.get({ pathParams: { tenantId } });
  if (!tenantResponse.ok) return redirect(constants.pages.tenants());
  const tenant = await tenantResponse.json();

  const queryParams = new URLSearchParams(await searchParams).toString();
  const url = `${constants.pages.playgroundEmbed({ tenantId })}?${queryParams}`;
  return (
    <Navigation tenant={tenant} breadcrumb={[{ name: 'Tenants', path: constants.pages.tenants() }, { name: tenant.name }, { name: 'Playground' }]}>
      <iframe src={url} title="embed-playground" className="w-full h-svh" />
    </Navigation>
  );
}
