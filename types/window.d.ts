import type {
  campaign,
  evaluator,
  status,
  variation
} from '.prisma/client/index';

declare global {
  interface Window {
    ab: {
      campaigns: Array<
        campaign & {
          evaluator: evaluator[];
          status: status;
          variation: variation[];
        }
      >;
    };
  }
}
