import type { TypeAudienceScript, TypeExecutionGroupScript, TypeTrackEventScript } from '../../../../domain/types/script';

type TypeBaTester = {
  executionGroupsData: TypeExecutionGroupScript[];
  trackEventsData: TypeTrackEventScript[];
  audiencesData: TypeAudienceScript[];
};

export type { TypeBaTester };
