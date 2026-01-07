import React from 'react';
import './styles/global.css';
// import './styles/normalize.css';
import { ToastProvider } from './_common/contexts/ToastEmitter';
import { Loader } from './_common/contexts/Loader/Component';
import { Metadata } from 'next';
import { DynamicDialog } from './_common/contexts/Dialog/Component';
import { TranslationProvider } from './_common/contexts/Translation';
import { cookies } from 'next/headers';
import { Navigation } from '@/app/_common/components/navigation/Sidebar';

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
        <Loader />
        <TranslationProvider language={languageInCookie}>
          <ToastProvider>
            <DynamicDialog />
            {children}
            {/* <Navigation>{children}</Navigation> */}
          </ToastProvider>
        </TranslationProvider>
      </body>
    </html>
  );
};

export default Layout;
