import type Campaign from './Campaign';
import type { campaignWithVariationsEvaluators } from '../types/databaseObjects';

declare global {
  interface Window {
    AB?: {
      campaigns?: campaignWithVariationsEvaluators[];

      findCampaignThatContainsVariation?: (
        campaign: number,
        idVariation: number
      ) => campaignWithVariationsEvaluators | undefined;

      constructCampaignToRun?: (
        campaignData: campaignWithVariationsEvaluators
      ) => Campaign;

      cookieName?: string;

      readCookie?: () => {
        idCampaign?: number;
        idVariation?: number;
      };

      runVariation?: (idCampaign: number, idVariation: number) => void;

      script?: () => Promise<void>;
    };
  }
}
