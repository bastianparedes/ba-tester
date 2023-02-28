import Campaign from './Campaign';
import cookie from './cookie';
import Evaluator from './Evaluator';
import Variation from './Variation';
import constants from '../config/constants';
import type { campaignWithVariationsEvaluatorsStatus } from '../types/databaseObjects';
import getRandomFromArray from '../utils/getRandomFromArray';

const runScript = async (): Promise<void> => {
  const campaigns = window.ab.campaigns.map(
    (campaign: campaignWithVariationsEvaluatorsStatus) => {
      const evaluators = campaign.evaluator.map(
        (evaluatorData) =>
          new Evaluator(evaluatorData.idEvaluator, evaluatorData.javascript)
      );

      const variations = campaign.variation.map(
        (variationData) =>
          new Variation(
            variationData.idVariation,
            campaign.idCampaign,
            variationData.html,
            variationData.css,
            variationData.javascript,
            variationData.traffic
          )
      );

      return new Campaign(campaign.idCampaign, evaluators, variations);
    }
  );

  if (campaigns.length === 0) return;

  const abTestCookie = cookie.get(constants.cookie.name);
  const cookieExists = abTestCookie !== '';

  if (cookieExists) {
    const cookieData: { idCampaign?: number; idVariation?: number } =
      JSON.parse(abTestCookie);

    const idCampaignInCookie = cookieData.idCampaign;
    const idVariationInCookie = cookieData.idVariation;

    const campaignAsignedByCookie = campaigns.find(
      (campaign) => idCampaignInCookie === campaign.idCampaign
    );

    const variationAsignedByCookie = campaignAsignedByCookie?.variations.find(
      (variation) => idVariationInCookie === variation.idVariation
    );

    if (
      campaignAsignedByCookie !== undefined &&
      variationAsignedByCookie !== undefined
    ) {
      const campaignEvaluatorsPassed: boolean =
        await campaignAsignedByCookie.evaluate();

      if (campaignEvaluatorsPassed) {
        variationAsignedByCookie.getFunction()();
        return;
      }
    }
  }

  const campaignToRun = getRandomFromArray(campaigns);
  if (campaignToRun === undefined) return;

  campaignToRun.getFunction()();
};

runScript();
