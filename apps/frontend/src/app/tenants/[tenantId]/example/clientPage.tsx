'use client';

type Props = {
  tenantId: number;
};

// http://localhost:3000/tenants/1/example

export default function ClientPage({ tenantId }: Props) {
  return <iframe src={`/tenants/${tenantId}/example/embed`} title="embed-example" className="w-full h-svh" />;
}
