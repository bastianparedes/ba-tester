import React from 'react';

import { TranslationProvider } from './common/context/useTranslation';
import WithSidebarButtons from './common/WithSidebarButtons';
import 'bastianparedes/styles/global.css';
import 'bastianparedes/styles/normalize.css';
import '../../styles/styles.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es-ES">
      <head>
        <meta charSet="utf-8" />
        <link href="/favicon.ico" rel="icon" />
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
