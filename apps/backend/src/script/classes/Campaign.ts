import type { TypeBaTester } from '../types';
import { getId } from '../utils/info';
import Requirement from './Requirement';
import type Trigger from './Trigger';
import type Variation from './Variation';

type TypeRequirementData = TypeBaTester['executionGroupsData'][number]['campaigns'][number]['requirements'];

class Campaign {
  id: number;
  name: string;
  requirementData: TypeRequirementData;
  triggers: Trigger[];
  variations: Variation[];
  private firedOnce: boolean;
  requirementsWereMet: boolean;
  requirementsWereMetPromise: Promise<boolean>;
  private resolveRequirementsWereMet: (response: boolean) => void;

  constructor(id: number, name: string, requirementData: TypeRequirementData, triggers: Trigger[], variations: Variation[]) {
    this.id = id;
    this.name = name;
    this.requirementData = requirementData;
    this.triggers = triggers;
    this.variations = variations;
    this.firedOnce = false;
    this.requirementsWereMetPromise = new Promise<boolean>((resolve) => {
      this.resolveRequirementsWereMet = resolve;
    }).then((requirementsWereMet) => {
      this.requirementsWereMet = requirementsWereMet;
      return requirementsWereMet;
    });

    Promise.any(this.triggers.map((trigger) => trigger.setTrigger()))
      .then(() => this.evaluate())
      .catch(() => {});
  }

  async evaluate() {
    if (this.requirementData.data.children.length === 0) {
      this.resolveRequirementsWereMet(true);
      return true;
    }
    const result = await new Requirement(this.requirementData).evaluate();
    this.resolveRequirementsWereMet(result);
    return result;
  }

  getVariation() {
    const numberDecider = ((Math.abs(getId()) + this.id) / 100) % 100;
    let accumulator = 0;
    return this.variations.find((variation) => {
      accumulator += variation.data.traffic;
      return accumulator >= numberDecider;
    });
  }

  async applyChanges() {
    if (this.firedOnce || !this.requirementsWereMet) return;
    this.firedOnce = true;

    const variation = this.getVariation();
    if (variation === undefined) return;

    console.info(`🚀 BA Tester - Fired Campaign: (id: ${this.id}) ${this.name} - Variation: ${variation.data.name}`);
    variation.run();
  }
}

export default Campaign;
