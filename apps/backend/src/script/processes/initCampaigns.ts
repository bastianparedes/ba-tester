import commonConstants from '../../../../domain/constants';
import { TypeExecutionGroupScript } from '../../../../domain/types/script';
import Campaign from '../classes/Campaign';
import Trigger from '../classes/Trigger';
import Variation from '../classes/Variation';
import type { TypeBaTester } from '../types';

declare global {
  interface Window {
    ba_tester: TypeBaTester;
  }
}

const waitForAllOrNotStrategy = async (campaigns: Campaign[], waitForEveryCampaignToBeEvaluated: boolean): Promise<Campaign[]> => {
  if (!waitForEveryCampaignToBeEvaluated) return campaigns;
  const awaitedCampaigns = await Promise.all(campaigns.map((campaign) => campaign.requirementsWereMetPromise.then(() => campaign)));
  return awaitedCampaigns;
};

const oneOrManyStrategy = async (campaigns: Campaign[], onlyOneCampaignPerPageLoad: boolean): Promise<Campaign[]> => {
  if (!onlyOneCampaignPerPageLoad) return campaigns;

  const campaign = await Promise.any(
    campaigns.map((campaign) =>
      campaign.requirementsWereMetPromise.then(() => {
        if (campaign.requirementsWereMet) return campaign;
        return Promise.reject();
      }),
    ),
  ).catch(() => null);

  if (!campaign) return [];

  return [campaign];
};

const initExecutionGroup = async (executionGroup: TypeExecutionGroupScript) => {
  let campaigns = executionGroup.campaigns.map((campaignData) => {
    const triggers = campaignData.triggers.map((triggerData) => new Trigger(triggerData, campaignData.id));

    const variations = campaignData.variations.map((variationData) => new Variation(variationData, campaignData.id));

    const campaign = new Campaign(campaignData.id, campaignData.name, campaignData.requirements, triggers, variations);

    return campaign;
  });

  const strategiesAndFlags = [
    { fn: waitForAllOrNotStrategy, flag: executionGroup.waitForEveryCampaignToBeEvaluated },
    { fn: oneOrManyStrategy, flag: executionGroup.onlyOneCampaignPerPageLoad },
  ];

  for (const strategieAndFlag of strategiesAndFlags) {
    campaigns = await strategieAndFlag.fn(campaigns, strategieAndFlag.flag);
  }

  campaigns.forEach((campaign) => {
    campaign.requirementsWereMetPromise.then((requirementsWereMet) => {
      if (requirementsWereMet) campaign.applyChanges();
    });
  });
};

export const initCampaigns = () => {
  window[commonConstants.windowKey].executionGroupsData.forEach((executionGroupData) => {
    initExecutionGroup(executionGroupData);
  });
};
