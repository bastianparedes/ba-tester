import type { TypeExecutionGroupScript, TypeTrackEventScript } from '../../../../domain/types/script';

type TypeBaTester = {
  executionGroupsData: TypeExecutionGroupScript[];
  trackEventsData: TypeTrackEventScript[];
  cookie?: {
    get: ({ name }: { name: string }) => string | null;
    set: ({ name, value, exdays, path, domain }: { name: string; value: string | number; exdays: number; path?: string | undefined; domain?: string | undefined }) => void;
    remove: ({ name }: { name: string }) => void;
  };
  device?: 'desktop' | 'mobile';
};

export type { TypeBaTester };
