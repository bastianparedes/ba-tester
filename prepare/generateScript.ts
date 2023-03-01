import Campaign from './Campaign';
import cookie from './cookie';
import Evaluator from './Evaluator';
import Variation from './Variation';
import constants from '../config/constants';
import type { evaluator, variation } from '../types/databaseObjects';
import getRandomFromArray from '../utils/getRandomFromArray';

window.AB = window.AB ?? {};

window.AB.findCampaignThatContainsVariation = (
  idCampaign: number,
  idVariation: number
) => {
  const campaign = window.AB?.campaigns?.find(
    (campaign) => campaign.idCampaign === idCampaign
  );

  const variation = campaign?.variations.find(
    (variation) => variation.idVariation === idVariation
  );

  if (variation !== undefined) return campaign;
  return undefined;
};

const runScript = async (): Promise<void> => {
  if (window.AB?.campaigns?.length === 0) return;

  const abTestCookie = cookie.get(constants.cookie.name);
  const cookieExists = abTestCookie !== '';

  if (cookieExists) {
    const cookieData: {
      idCampaign: number | any;
      idVariation: number | any;
    } = JSON.parse(abTestCookie);

    const idCampaignInCookie = Number(cookieData.idCampaign);
    const idVariationInCookie = Number(cookieData.idVariation);

    if (
      Number.isInteger(idCampaignInCookie) &&
      Number.isInteger(idVariationInCookie)
    ) {
      const campaignData = window.AB.findCampaignThatContainsVariation(
        idCampaignInCookie,
        idVariationInCookie
      );

      if (campaignData !== undefined) {
        const evaluators = campaignData.evaluators.map(
          (evaluatorData) =>
            new Evaluator(evaluatorData.idEvaluator, evaluatorData.javascript)
        );
        const variations = campaignData.variations.map(
          (variationData) =>
            new Variation(
              variationData.idVariation,
              campaignData.idCampaign,
              variationData.html,
              variationData.css,
              variationData.javascript,
              variationData.traffic
            )
        );
        const campaign = new Campaign(
          campaignData.idCampaign,
          evaluators,
          variations
        );

        campaign.getSpecificFunction(idVariationInCookie)();
        return;
      }
    }
  }

  const campaignDataToRun = getRandomFromArray(window.AB.campaigns);

  const evaluators = campaignDataToRun.evaluators.map(
    (evaluatorData: evaluator) =>
      new Evaluator(evaluatorData.idEvaluator, evaluatorData.javascript)
  );
  const variations = campaignDataToRun.variations.map(
    (variationData: variation) =>
      new Variation(
        variationData.idVariation,
        campaignDataToRun.idCampaign,
        variationData.html,
        variationData.css,
        variationData.javascript,
        variationData.traffic
      )
  );
  const campaignToRun = new Campaign(
    campaignDataToRun.idCampaign,
    evaluators,
    variations
  );

  campaignToRun.getRandomFunction()();
};

runScript();
