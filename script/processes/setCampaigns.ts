import Campaign from '../classes/Campaign';
import Trigger from '../classes/Trigger';
import Variation from '../classes/Variation';
import type { ba_tester } from '../types';

declare global {
  interface Window {
    ba_tester: ba_tester;
  }
}

const script = () => {
  window.ba_tester.campaignsData?.forEach((campaignData) => {
    const triggers = campaignData.triggers.map(
      (triggerData) => new Trigger(triggerData, campaignData.id)
    );

    const variations = campaignData.variations.map(
      (variationData) => new Variation(variationData, campaignData.id)
    );
    return new Campaign(
      campaignData.id,
      campaignData.name,
      campaignData.requirements,
      triggers,
      variations
    );
  });
};

export default script;
