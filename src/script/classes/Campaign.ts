import Requirement from './Requirement';
import type Trigger from './Trigger';
import type Variation from './Variation';
import type { TypeBaTester } from '@/script/types';
import { getId } from '@/script/utils/info';
import queryParam from '@/script/utils/queryParam';

type TypeRequirementData = TypeBaTester['campaignsData'][number]['requirements'];

class Campaign {
  id: number;
  name: string;
  requirementData: TypeRequirementData;
  triggers: Trigger[];
  variations: Variation[];
  triggeredOnce: boolean;
  force: boolean;

  constructor(
    id: number,
    name: string,
    requirementData: TypeRequirementData,
    triggers: Trigger[],
    variations: Variation[],
  ) {
    this.id = id;
    this.name = name;
    this.requirementData = requirementData;
    this.triggers = triggers;
    this.variations = variations;
    this.force = queryParam.get('ba_tester_campaign') === String(id);
    this.triggeredOnce = false;
    this.triggers.forEach((trigger) => {
      trigger.setFire(() => this.fire());
    });
  }

  async evaluate() {
    if (this.requirementData.data.children.length === 0) return true;
    return new Requirement(this.requirementData).evaluate();
  }

  getVariation() {
    if (this.force) {
      return this.variations.find((variation) => String(variation.data.id) === queryParam.get('ba_tester_variation'));
    }

    const numberDecider = ((Math.abs(getId()) + this.id) / 100) % 100;
    let accumulator = 0;
    return this.variations.find((variation) => {
      accumulator += variation.data.traffic;
      if (accumulator >= numberDecider) return true;
    });
  }

  async fire() {
    if (this.triggeredOnce) return;
    this.triggeredOnce = true;
    const allRequirementsPassed = this.force || (await this.evaluate());
    if (!allRequirementsPassed) return;

    const variation = this.getVariation();
    if (variation === undefined) return;

    console.log(`🚀 BA Tester - Fired Campaign: (id: ${this.id}) ${this.name} - Variation: ${variation.data.name}`);
    variation.run();
  }
}

export default Campaign;
