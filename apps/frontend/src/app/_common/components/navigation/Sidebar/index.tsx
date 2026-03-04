'use client';

import { Boxes, Building2, Code, Eye, FlaskConical, Shield, UserCog } from 'lucide-react';
import type React from 'react';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import constants from '@/config/constants';
import type { TypeTenant } from '@/domain/types';
import { ComponentLanguage } from './Language';

type Props = {
  children: React.ReactNode;
  tenant?: TypeTenant;
};

export function Sidebar({ children, tenant }: Props) {
  const { translation } = useTranslationContext();
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Language Section */}

            <div className="mb-6">
              <div className="text-md font-semibold text-gray-400 uppercase mb-2 px-2">{translation.common.language}</div>
              <ComponentLanguage />
            </div>

            {/* AB Tests Section */}

            <div className="mb-6">
              <div className="text-md font-semibold text-gray-400 uppercase mb-2 px-2">{translation.common.testing}</div>

              <a href={constants.pages.tenants()} className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-1 text-gray-300 hover:bg-gray-800">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium">{translation.common.tenants}</span>
              </a>

              {tenant && (
                <a
                  href={constants.pages.campaigns({ tenantId: tenant.id })}
                  className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-1 text-gray-300 hover:bg-gray-800"
                >
                  <FlaskConical className="w-5 h-5" />
                  <span className="text-sm font-medium">{translation.common.campaigns}</span>
                </a>
              )}

              {tenant && (
                <a
                  href={constants.pages.executionGroups({ tenantId: tenant.id })}
                  className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-1 text-gray-300 hover:bg-gray-800"
                >
                  <Boxes className="w-5 h-5" />
                  <span className="text-sm font-medium">{translation.common.executionGroups}</span>
                </a>
              )}

              {tenant && (
                <a
                  href={constants.pages.script({ tenantId: tenant.id })}
                  className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-1 text-gray-300 hover:bg-gray-800"
                >
                  <Code className="w-5 h-5" />
                  <span className="text-sm font-medium">{translation.common.scriptAndUrl}</span>
                </a>
              )}

              {tenant && (
                <a
                  href={constants.pages.playground({ tenantId: tenant.id })}
                  className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-1 text-gray-300 hover:bg-gray-800"
                >
                  <Eye className="w-5 h-5" />
                  <span className="text-sm font-medium">{translation.common.playground}</span>
                </a>
              )}
            </div>

            {/* Administration Section */}
            <div className="mb-6">
              <div className="text-md font-semibold text-gray-400 uppercase mb-2 px-2">{translation.common.administration}</div>
              <a href={constants.pages.roles()} className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-1 text-gray-300 hover:bg-gray-800">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">{translation.common.roles}</span>
              </a>
              <a href={constants.pages.users()} className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors mb-1 text-gray-300 hover:bg-gray-800">
                <UserCog className="w-5 h-5" />
                <span className="text-sm font-medium">{translation.common.users}</span>
              </a>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
