import React from 'react';
import './styles/global.css';
// import './styles/normalize.css';
import { UserProvider } from './_common/contexts/User';
import { ToastProvider } from './_common/contexts/ToastEmitter';
import { Loader } from './_common/contexts/Loader/Component';
import { Metadata } from 'next';
import { DynamicDialog } from './_common/contexts/Dialog/Component';
import { TranslationProvider } from './_common/contexts/Translation';
import { cookies } from 'next/headers';
import constants from '@/config/constants';
import { getUserFromCookies } from '@/utils/user';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'BA Tester',
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const languageInCookie = cookieStore.get(constants.cookieNames.lang)?.value || 'english';
  const user = await getUserFromCookies();

  return (
    <html lang="es-ES">
      <body>
        <TranslationProvider language={languageInCookie}>
          <UserProvider user={user}>
            <Loader />
            <ToastProvider>
              <DynamicDialog />
              {children}
            </ToastProvider>
          </UserProvider>
        </TranslationProvider>
      </body>
    </html>
  );
};

export default Layout;
