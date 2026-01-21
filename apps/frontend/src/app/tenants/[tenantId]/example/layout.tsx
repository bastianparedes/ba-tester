import type React from 'react';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    tenantId: string;
  }>;
};
export default async function RootLayout(props: LayoutProps) {
  const params = await props.params;
  const tenantId = Number(params.tenantId);
  return (
    <html lang="es-ES">
      <head>
        <script async src={`${process.env.NEXT_PUBLIC_BACKEND_URL_CLIENT_SIDE}/public/script/tenants/${tenantId}`}></script>
      </head>
      <body>{props.children}</body>
    </html>
  );
}
