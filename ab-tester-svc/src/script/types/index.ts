import type { TypeAudienceScript, TypeExecutionGroupScript, TypeTrackEventScript } from '@ba-tester/types/script';

type TypeBaTester = {
  executionGroupsData: TypeExecutionGroupScript[];
  trackEventsData: TypeTrackEventScript[];
  audiencesData: TypeAudienceScript[];
};

export type { TypeBaTester };
