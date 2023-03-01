import type { campaignWithVariationsEvaluators } from '../types/databaseObjects';

declare global {
  interface Window {
    AB: {
      campaigns: campaignWithVariationsEvaluators[];
      findCampaignThatContainsVariation: (
        campaign: number,
        idVariation: number
      ) => campaignWithVariationsEvaluators | undefined;
      runVariationFunction: (idCampaign: number, idVariation: number) => void;
    };
  }
}
