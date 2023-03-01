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

export type campaignWithVariationsEvaluators = campaign & {
  evaluators: evaluator[];
  variations: variation[];
};
export type campaignWithStatus = campaign & { status: status };
export type campaignWithVariationsEvaluatorsStatus = campaign & {
  evaluators: evaluator[];
  status: status;
  variations: variation[];
};
