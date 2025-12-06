import type { TypeBaTester } from '@/script/types';

type TypeTriggerData = TypeBaTester['campaignsData'][number]['triggers'][number];

class Trigger {
  trigger: TypeTriggerData;
  readonly idCampaign: number;

  constructor(trigger: TypeTriggerData, idCampaign: number) {
    this.trigger = trigger;
    this.idCampaign = idCampaign;
  }

  setFire(fire: () => Promise<void>) {
    if (this.trigger.type === 'clickOnElement') {
      const valueStringOne = (this.trigger.data as any).selector;
      const fn = (event: MouseEvent) => {
        if ((event.target as HTMLElement).closest(valueStringOne) !== null) {
          window.removeEventListener('click', fn);
          fire();
        }
      };

      window.addEventListener('click', fn);
    } else if (this.trigger.type === 'custom') {
      try {
        eval((this.trigger.data as any).javascript);
      } catch (error) {
        console.log(error);
      }
    } else if (this.trigger.type === 'pageLoad') fire();
    else if (this.trigger.type === 'timeOnPage') {
      const timePassed = new Date().getTime() - performance.timeOrigin;
      setTimeout(
        () => {
          fire();
        },
        (this.trigger.data as any).seconds * 1000 - timePassed,
      );
    }
  }
}

export default Trigger;
