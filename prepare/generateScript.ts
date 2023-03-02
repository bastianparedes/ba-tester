import Campaign from './Campaign';
import cookie from './cookie';
import Evaluator from './Evaluator';
import Variation from './Variation';
import constants from '../config/constants';
import type {
  campaignWithVariationsEvaluators,
  evaluator,
  variation
} from '../types/databaseObjects';
import getRandomFromArray from '../utils/getRandomFromArray';

window.AB = window.AB ?? {};

window.AB.campaigns = window.AB.campaigns ?? [];

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

window.AB.constructCampaignToRun = (
  campaignData: campaignWithVariationsEvaluators
): Campaign => {
  const evaluators = campaignData.evaluators.map(
    (evaluatorData: evaluator) =>
      new Evaluator(evaluatorData.idEvaluator, evaluatorData.javascript)
  );
  const variations = campaignData.variations.map(
    (variationData: variation) =>
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

  return campaign;
};

window.AB.cookieName = constants.cookie.name;

window.AB.readCookie = () => {
  let result = {};

  if (window.AB?.cookieName === undefined) return result;

  const abTestCookie = cookie.get(window.AB.cookieName);
  const cookieExists = abTestCookie !== '';

  if (cookieExists) {
    let cookieData: {
      idCampaign: number | any;
      idVariation: number | any;
    };

    try {
      cookieData = JSON.parse(abTestCookie);
    } catch {
      return {};
    }

    const idCampaign = Number(cookieData.idCampaign);
    const idVariation = Number(cookieData.idVariation);

    if (Number.isInteger(idCampaign)) result = { ...result, idCampaign };
    if (Number.isInteger(idVariation)) result = { ...result, idVariation };
  }

  return result;
};

window.AB.runVariation = (idCampaign, idVariation) => {
  if (window.AB?.findCampaignThatContainsVariation === undefined) return;
  if (window.AB?.constructCampaignToRun === undefined) return;

  const campaignData = window.AB.findCampaignThatContainsVariation(
    idCampaign,
    idVariation
  );
  if (campaignData === undefined) return;

  const campaign = window.AB.constructCampaignToRun(campaignData);
  campaign.getSpecificFunction(idVariation)();
};

window.AB.script = async () => {
  if (window.AB?.campaigns?.length === 0) return;
  if (window.AB?.readCookie === undefined) return;
  if (window.AB?.findCampaignThatContainsVariation === undefined) return;
  if (window.AB?.constructCampaignToRun === undefined) return;
  if (window.AB?.campaigns === undefined) return;

  const { idCampaign, idVariation } = window.AB.readCookie();

  if (idCampaign !== undefined && idVariation !== undefined) {
    const campaignData = window.AB.findCampaignThatContainsVariation(
      idCampaign,
      idVariation
    );

    if (campaignData !== undefined) {
      const campaign = window.AB.constructCampaignToRun(campaignData);

      campaign.getSpecificFunction(idVariation)();
      return;
    }
  }

  const campaignData = getRandomFromArray(window.AB.campaigns);
  const campaign = window.AB.constructCampaignToRun(campaignData);
  campaign.getRandomFunction()();
};

window.AB.script();
