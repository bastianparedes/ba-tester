import React from 'react';
import './styles/global.css';
// import './styles/normalize.css';
import { ToastProvider } from './_common/contexts/ToastEmitter';
import { LoaderProvider } from './_common/contexts/Loader';
import { Metadata } from 'next';
import { DialogProvider } from './_common/contexts/Dialog';
import { TranslationProvider } from './_common/contexts/Translation';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'BA Tester',
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const languageInCookie = cookieStore.get('lang')?.value || 'english';

  return (
    <html lang="es-ES">
      <body>
        <TranslationProvider language={languageInCookie}>
          <LoaderProvider>
            <ToastProvider>
              <DialogProvider>{children}</DialogProvider>
            </ToastProvider>
          </LoaderProvider>
        </TranslationProvider>
      </body>
    </html>
  );
};

export default Layout;
