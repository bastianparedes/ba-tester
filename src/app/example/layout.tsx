/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { basePath } from 'next.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bastián Paredes'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-ES">
      <head>
        <script async src={basePath + '/api/script'}></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
