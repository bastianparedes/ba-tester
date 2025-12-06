import type { getCampaignsForScript } from '@/script/utils/database';

type ba_tester = {
  campaignsData: Awaited<ReturnType<typeof getCampaignsForScript>>;
  cookie: {
    get: ({ name }: { name: string }) => string | null;
    set: ({
      name,
      value,
      exdays,
      path,
    }: {
      name: string;
      value: string | number;
      exdays: number;
      path?: string | undefined;
    }) => void;
    remove: ({ name }: { name: string }) => void;
  };
  device: 'desktop' | 'mobile';
};

export type { ba_tester };
