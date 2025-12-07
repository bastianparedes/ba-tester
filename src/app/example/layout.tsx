import type React from 'react';

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
