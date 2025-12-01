import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
  title: 'Bastián Paredes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-ES">
      <head>
        <script async src="/api/public/script"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
