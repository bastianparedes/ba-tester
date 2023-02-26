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

export type campaignWithVariationsEvaluatorsStatus = campaign & {
  evaluator: evaluator[];
  status: status;
  variation: variation[];
};

export type campaignWithStatus = campaignWithStatus;
