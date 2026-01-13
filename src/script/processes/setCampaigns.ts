import type { TypeBaTester } from '@/script/types';
import Campaign from '../classes/Campaign';
import Trigger from '../classes/Trigger';
import Variation from '../classes/Variation';

declare global {
  interface Window {
    ba_tester: TypeBaTester;
  }
}

const script = () => {
  window.ba_tester.campaignsData?.forEach((campaignData) => {
    const triggers = campaignData.triggers.map(
      (triggerData) => new Trigger(triggerData, campaignData.id),
    );

    const variations = campaignData.variations.map(
      (variationData) => new Variation(variationData, campaignData.id),
    );
    new Campaign(
      campaignData.id,
      campaignData.name,
      campaignData.requirements,
      triggers,
      variations,
    );
  });
};

export default script;
