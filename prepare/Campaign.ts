import type Evaluator from './Evaluator';
import type Variation from './Variation';
import getRandomFromArray from '../utils/getRandomFromArray';

const getRandomVariation = (variations: Variation[]): Variation => {
  const expandedVariations = variations.flatMap((variation) =>
    Array(variation.traffic).fill(variation)
  );
  const variation = getRandomFromArray(expandedVariations);
  return variation;
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

  getRandomFunction(): Function {
    return async () => {
      const allEvaluatorsPassed = await this.evaluate();
      if (!allEvaluatorsPassed) return;

      const randomVariationToRun = getRandomVariation(this.variations);
      if (randomVariationToRun === undefined) return;

      randomVariationToRun.getFunction()();
    };
  }

  getSpecificFunction(
    idVariation: number,
    setCookie: boolean = true
  ): Function {
    return async () => {
      const allEvaluatorsPassed = await this.evaluate();
      if (!allEvaluatorsPassed) return;

      const variation = this.variations.find(
        (variation) => variation.idVariation === idVariation
      );
      variation?.getFunction(setCookie)();
    };
  }
}

export default Campaign;
