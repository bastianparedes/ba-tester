import React from 'react';
import { TranslationProvider } from './_contexts/useTranslation';
import WithSidebarButtons from './_contexts/WithSidebarButtons';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es-ES">
      <head>
        <meta charSet="utf-8" />
        <title>Bastián Paredes</title>
      </head>
      <body>
        <TranslationProvider languaje="english">
          <WithSidebarButtons>{children}</WithSidebarButtons>
        </TranslationProvider>
      </body>
    </html>
  );
};

export default Layout;
