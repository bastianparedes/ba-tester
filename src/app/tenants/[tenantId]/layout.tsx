import type React from 'react';
import { redirect } from 'next/navigation';
import constants from '@/config/constants';
import db from '@/libs/db';
import { Boxes, FlaskConical, Code, Eye } from 'lucide-react';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    tenantId: string;
  }>;
};
export default async function RootLayout(props: LayoutProps) {
  const params = await props.params;
  const tenantId = Number(params.tenantId);
  const tenant = await db.getTenant({ tenantId });
  if (!tenant) redirect(constants.pages.tenants());
  return (
    <div className="flex">
      <div className="min-h-svh w-16 bg-gray-900 flex flex-col items-center py-6 gap-6">
        <a
          href={constants.pages.tenants()}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg"
        >
          <Boxes className="w-6 h-6 text-white" />
        </a>

        <a
          href={constants.pages.campaigns({ tenantId })}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-linear-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
        >
          <FlaskConical className="w-6 h-6 text-white" />
        </a>

        <a
          href={constants.pages.bundle({ tenantId })}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 shadow-lg"
        >
          <Code className="w-6 h-6 text-gray-900" />
        </a>

        <a
          href={constants.pages.example({ tenantId })}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg"
        >
          <Eye className="w-6 h-6 text-white" />
        </a>
      </div>
      <section className="flex-1 ml-16">{props.children}</section>
    </div>
  );
}
