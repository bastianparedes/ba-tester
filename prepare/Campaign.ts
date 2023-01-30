import cookie from './cookie';
import type Evaluator from './Evaluator';
import type Variation from './Variation';
import constants from '../config/constants';
import getRandomFromArray from '../utils/getRandomFromArray';

const getRandomVariation = (variations: Variation[]): Variation => {
  const expandedVariations = variations.flatMap((variation) =>
    Array(variation.traffic).fill(variation)
  );
  const variation = getRandomFromArray(expandedVariations);
  return getRandomFromArray(variation);
};

class Campaign {
  idCampaign: number;
  evaluators: Evaluator[];
  variations: Variation[];
  constructor(
    idCampaign: number,
    evaluators: Evaluator[],
    variations: Variation[]
  ) {
    this.idCampaign = idCampaign;
    this.evaluators = evaluators;
    this.variations = variations;
  }

  async evaluate(): Promise<boolean> {
    if (this.evaluators.length === 0) return true;

    return Promise.all(
      this.evaluators.map(async (evaluator: Evaluator) => evaluator.evaluate())
    ).then((results) => results.every((result: boolean) => result));
  }

  getFunction(): Function {
    return async () => {
      const allEvaluatorsPassed = await this.evaluate();
      if (!allEvaluatorsPassed) return;

      const randomVariationToRun = getRandomVariation(this.variations);
      if (randomVariationToRun === undefined) return;

      randomVariationToRun.getFunction()();
      cookie.set(
        constants.cookie.name,
        JSON.stringify({
          idCampaign: this.idCampaign,
          idVariation: randomVariationToRun.idVariation
        }),
        constants.cookie.duration
      );
    };
  }
}

export default Campaign;
