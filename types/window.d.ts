import type { campaignWithVariationsEvaluatorsStatus } from '../types/databaseObjects';

declare global {
  interface Window {
    ab: {
      campaigns: campaignWithVariationsEvaluatorsStatus[];
    };
  }
}
