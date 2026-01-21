import type { TypeBaTester } from '../types';

type TypeTriggerData = TypeBaTester['campaignsData'][number]['triggers'][number];

class Trigger {
  trigger: TypeTriggerData;
  readonly idCampaign: number;

  constructor(trigger: TypeTriggerData, idCampaign: number) {
    this.trigger = trigger;
    this.idCampaign = idCampaign;
  }

  setFire(fire: () => Promise<void>) {
    const trigger = this.trigger;
    if (trigger.type === 'clickOnElement') {
      const valueStringOne = trigger.data.selector;
      const fn = (event: MouseEvent) => {
        if ((event.target as HTMLElement).closest(valueStringOne) !== null) {
          window.removeEventListener('click', fn);
          fire();
        }
      };

      window.addEventListener('click', fn);
    } else if (trigger.type === 'custom') {
      try {
        trigger.data.javascript(fire);
      } catch (error) {
        console.log(error);
      }
    } else if (trigger.type === 'pageLoad') fire();
    else if (trigger.type === 'timeOnPage') {
      const timePassed = Date.now() - performance.timeOrigin;
      const time = trigger.data.milliseconds - timePassed;
      setTimeout(() => {
        fire();
      }, time);
    }
  }
}

export default Trigger;
