import type { TypeAudienceScript, TypeExecutionGroupScript, TypeTrackEventScript } from '@digital-retail/ab-tester-types/script';

type TypeBaTester = {
  executionGroupsData: TypeExecutionGroupScript[];
  trackEventsData: TypeTrackEventScript[];
  audiencesData: TypeAudienceScript[];
};

export type { TypeBaTester };
