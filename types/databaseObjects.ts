import type {
  campaign,
  evaluator,
  status,
  variation
} from '.prisma/client/index';

export type { campaign };
export type { evaluator };
export type { status };
export type { variation };

export type campaignJoined = campaign & {
  evaluator: evaluator[];
  status: status;
  variation: variation[];
};
