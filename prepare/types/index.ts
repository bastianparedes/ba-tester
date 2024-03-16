import type {
  getAudiencesForFrontend,
  getCampaignsForFrontend
} from 'prepare/utils/database';

type History = {
  events: {
    click: {
      class: string | null;
      date: number;
      id: string | null;
      tagName: string;
    }[];
    pageView: {
      date: number;
      url: string;
    }[];
    userSession: {
      date: number;
      isLoggedIn: boolean;
    }[];
  };
};

type ba_tester = {
  satelliteTrack: (args0: string) => void;
  audiencesData: Awaited<ReturnType<typeof getAudiencesForFrontend>>;
  campaignsData: Awaited<ReturnType<typeof getCampaignsForFrontend>>;
  cookie: {
    get: (arg0: string) => string | null;
    set: (
      arg0: string,
      arg01: string | number,
      arg02: number,
      arg03: string,
      arg04: string
    ) => void;
    remove: (arg0: string) => void;
  };
  device: 'desktop' | 'mobile';
};

export type { ba_tester, History };
