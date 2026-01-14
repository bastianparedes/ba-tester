import type React from 'react';
import constants from '@/config/constants';

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
        <script async src={constants.pages.apiScript({ tenantId })}></script>
      </head>
      <body>{props.children}</body>
    </html>
  );
}
