import commonConstants from '../../../../domain/constants';
import { TypeExecutionGroupScript } from '../../../../domain/types/script';
import Campaign from '../classes/Campaign';
import { ExecutionGroupCookieManager } from '../classes/ExecutionGroupCookieManager';
import Trigger from '../classes/Trigger';
import Variation from '../classes/Variation';
import type { TypeBaTester } from '../types';
import { getRandomFromArray } from '../utils/random';

declare global {
  interface Window {
    ba_tester: TypeBaTester;
  }
}

const onlyPreviousCampaignsStrategy = async (
  campaigns: Campaign[],
  onlyCampaignsPreviouslyExecuted: boolean,
  executionGroupCookieManager: ExecutionGroupCookieManager,
): Promise<Campaign[]> => {
  if (!onlyCampaignsPreviouslyExecuted) return campaigns;
  const campaignIds = campaigns.map((campaign) => campaign.id);

  const oldSavedcampaignIds = executionGroupCookieManager.getCampaignIds();
  for (const campaignId of oldSavedcampaignIds) {
    if (!campaignIds.includes(campaignId)) {
      executionGroupCookieManager.deleteCampaignId(campaignId);
    }
  }

  const savedCampaignIds = executionGroupCookieManager.getCampaignIds();
  if (savedCampaignIds.length === 0) return campaigns;

  const previouslyExecutedCampaigns = campaigns.filter((campaign) => savedCampaignIds.includes(campaign.id));
  return previouslyExecutedCampaigns;
};

const waitForAllOrNotStrategy = async (campaigns: Campaign[], waitForEveryCampaignToBeEvaluated: boolean): Promise<Campaign[]> => {
  if (!waitForEveryCampaignToBeEvaluated) return campaigns;
  const awaitedCampaigns = await Promise.all(campaigns.map((campaign) => campaign.requirementsWereMetPromise.then(() => campaign)));
  return awaitedCampaigns;
};

const oneOrManyStrategy = async (
  campaigns: Campaign[],
  onlyOneCampaignPerPageLoad: boolean,
  executionGroupCookieManager: ExecutionGroupCookieManager,
): Promise<Campaign[]> => {
  if (!onlyOneCampaignPerPageLoad) return campaigns;

  const campaignIdsPreviouslyExecuted = executionGroupCookieManager.getCampaignIds();
  if (campaignIdsPreviouslyExecuted.length > 1) {
    const randomCampaignId = getRandomFromArray(campaignIdsPreviouslyExecuted);
    campaignIdsPreviouslyExecuted
      .filter((campaignId) => randomCampaignId !== campaignId)
      .forEach((campaignId) => {
        executionGroupCookieManager.deleteCampaignId(campaignId);
      });
  }

  const campaignsAlreadyResolved = campaigns.filter((campaign) => campaign.requirementsWereEvaluated && campaign.requirementsWereMet);
  const randomCampaign = getRandomFromArray(campaignsAlreadyResolved);
  if (randomCampaign !== undefined) {
    return [randomCampaign];
  }

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
  const executionGroupCookieManager = new ExecutionGroupCookieManager(executionGroup.id);

  let campaigns = executionGroup.campaigns.map((campaignData) => {
    const triggers = campaignData.triggers.map((triggerData) => new Trigger(triggerData, campaignData.id));
    const variations = campaignData.variations.map((variationData) => new Variation(variationData, campaignData.id));
    const campaign = new Campaign(campaignData.id, campaignData.name, campaignData.requirements, triggers, variations);
    return campaign;
  });

  const strategiesAndFlags = [
    { flag: executionGroup.onlyCampaignsPreviouslyExecuted, fn: onlyPreviousCampaignsStrategy },
    { flag: executionGroup.waitForEveryCampaignToBeEvaluated, fn: waitForAllOrNotStrategy },
    { flag: executionGroup.onlyOneCampaignPerPageLoad, fn: oneOrManyStrategy },
  ];

  for (const strategieAndFlag of strategiesAndFlags) {
    campaigns = await strategieAndFlag.fn(campaigns, strategieAndFlag.flag, executionGroupCookieManager);
  }

  campaigns.forEach((campaign) => {
    campaign.requirementsWereMetPromise.then((requirementsWereMet) => {
      if (requirementsWereMet) {
        executionGroupCookieManager.insertCampaignId(campaign.id);
        campaign.applyChanges();
      }
    });
  });
};

export const initCampaigns = () => {
  window[commonConstants.windowKey].executionGroupsData.forEach((executionGroupData) => {
    initExecutionGroup(executionGroupData);
  });
};
