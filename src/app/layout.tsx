import React from 'react';
import './styles/global.css';
import './styles/normalize.css';

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
      <body>{children}</body>
    </html>
  );
};

export default Layout;
