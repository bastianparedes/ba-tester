import React from 'react';

import { TrpcProvider } from './_contexts/TrpcProvider';
import { TranslationProvider } from './_contexts/useTranslation';
import WithSidebarButtons from './_contexts/WithSidebarButtons';
import { url } from '../../../lib/trpc/config';
import './styles/global.css';
import './styles/normalize.css';
import '../../../styles/styles.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es-ES">
      <head>
        <meta charSet="utf-8" />
        <title>Bastián Paredes</title>
      </head>
      <body>
        <TranslationProvider languaje="english">
          <WithSidebarButtons>
            <TrpcProvider url={url}>{children}</TrpcProvider>
          </WithSidebarButtons>
        </TranslationProvider>
      </body>
    </html>
  );
};

export default Layout;
