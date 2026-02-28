import commonConstants from '../../../../domain/constants';
import Campaign from '../classes/Campaign';
import Trigger from '../classes/Trigger';
import Variation from '../classes/Variation';
import type { TypeBaTester } from '../types';

declare global {
  interface Window {
    ba_tester: TypeBaTester;
  }
}

const script = () => {
  const campaignsEvaluatedPromises = window[commonConstants.windowKey].campaignsData.map((campaignData) => {
    const triggers = campaignData.triggers.map((triggerData) => new Trigger(triggerData, campaignData.id));

    const variations = campaignData.variations.map((variationData) => new Variation(variationData, campaignData.id));
    const campaign = new Campaign(campaignData.id, campaignData.name, campaignData.requirements, triggers, variations);
    return campaign.requirementsWereMetPromise.then(() => campaign);
  });

  // run after they were evaluated
  /* Promise.all(campaignsEvaluatedPromises).then((campaigns) => {
    campaigns.forEach((campaign) => {
      campaign.fire();
    });
  }); */

  // run on their own
  campaignsEvaluatedPromises.forEach((campaignPromise) => {
    campaignPromise.then((campaign) => {
      if (campaign.requirementsWereMet) campaign.fire();
    });
  });
};

export default script;
