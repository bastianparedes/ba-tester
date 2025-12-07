import React from 'react';
import './styles/global.css';
// import './styles/normalize.css';
import { ToastProvider } from './_common/contexts/ToastEmitter';
import { LoaderProvider } from './_common/contexts/Loader';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'BA Tester',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es-ES">
      <body>
        <LoaderProvider>
          <ToastProvider>{children}</ToastProvider>
        </LoaderProvider>
      </body>
    </html>
  );
};

export default Layout;
