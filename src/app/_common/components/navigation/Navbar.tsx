'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cx } from 'class-variance-authority';
import { useUser } from '@/app/_common/contexts/User';

type Props = {
  children: React.ReactNode;
  breadcrumb: {
    name: string;
    path?: string;
  }[];
};

export function Navbar({ children, breadcrumb }: Props) {
  const user = useUser();
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-base text-slate-500">
            {breadcrumb.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight />}
                <a
                  href={crumb.path}
                  className={cx({
                    'transition-colors duration-200': index < breadcrumb.length - 1,
                    'text-slate-900 font-medium': index === breadcrumb.length - 1,
                    'hover:text-blue-600': !!crumb.path,
                  })}
                >
                  {crumb.name}
                </a>
              </React.Fragment>
            ))}
          </div>

          {/* Right side: User info */}
          {user.isLogedIn && (
            <div className="flex items-center">
              <div className="flex items-center px-3 py-1.5 bg-gray-100 rounded-lg">
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{user.data.name}</div>
                  <div className="text-xs text-gray-500">{user.data.role.name}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
