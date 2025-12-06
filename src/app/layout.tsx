import React from 'react';
import './styles/global.css';
import './styles/normalize.css';
import { ToastProvider } from './_common/contexts/ToastEmitter';
import { LoaderProvider } from './_common/contexts/Loader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es-ES">
      <head>
        <meta charSet="utf-8" />
        <title>Bastián Paredes</title>
      </head>
      <body>
        <LoaderProvider>
          <ToastProvider>{children}</ToastProvider>
        </LoaderProvider>
      </body>
    </html>
  );
};

export default Layout;
