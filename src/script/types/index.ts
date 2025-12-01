import type { getCampaignsForFrontend } from '@/script/utils/database';

type ba_tester = {
  campaignsData: Awaited<ReturnType<typeof getCampaignsForFrontend>>;
  cookie: {
    get: (arg0: string) => string | null;
    set: (arg0: string, arg01: string | number, arg02: number, arg03: string, arg04: string) => void;
    remove: (arg0: string) => void;
  };
  device: 'desktop' | 'mobile';
};

export type { ba_tester };
