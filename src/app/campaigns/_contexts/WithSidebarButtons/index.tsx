import React from 'react';

import { FlaskConical, Code, Eye } from 'lucide-react';
import constants from '@/config/constants';

interface Props {
  children?: React.ReactNode;
}

const WithSidebarButtons = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="min-h-svh w-16 bg-gray-900 flex flex-col items-center py-6 gap-6">
        <a
          href={constants.pages.campaigns}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-linear-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
        >
          <FlaskConical className="w-6 h-6 text-white" />
        </a>

        <a
          href={constants.pages.bundle}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 shadow-lg"
        >
          <Code className="w-6 h-6 text-gray-900" />
        </a>

        <a
          href={constants.pages.example}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-lg"
        >
          <Eye className="w-6 h-6 text-white" />
        </a>
      </div>
      <section className="flex-1 ml-16">{children}</section>
    </div>
  );
};

export default WithSidebarButtons;
