import React from 'react';
import './styles/global.css';
import './styles/normalize.css';
import { Lato } from 'next/font/google';

const latoInit = Lato({
  subsets: ['latin'],
  weight: ['100', '300']
});

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
