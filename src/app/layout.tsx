import React from 'react';
import './styles/global.css';
import './styles/normalize.css';

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
