import React from 'react';

import styles from './styles.module.scss';
import type { TypeCampaignExtended, TypeTriggerData } from '@/types/db';
import { useTranslationContext } from '../../../../../../_contexts/useTranslation';

interface Props {
  trigger: TypeTriggerData & { type: 'timeOnPage' };
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Trigger = ({ setCampaign, trigger }: Props) => {
  const translation = useTranslationContext();

  const handleOnChangeSeconds = (event: React.FocusEvent<HTMLInputElement>) => {
    const valueAsNumber = Math.round(event.target.valueAsNumber);
    let newSeconds = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber;
    newSeconds = Math.trunc(newSeconds);
    if (newSeconds < 0) newSeconds = 0;
    else if (newSeconds > 60000) newSeconds = 60000;
    event.target.value = String(newSeconds);
    trigger.data.seconds = newSeconds;
    setCampaign((campaign) => {
      return structuredClone(campaign);
    });
  };

  return (
    <div className={styles.container}>
      <input max={60000} min={0} onChange={handleOnChangeSeconds} step={1} type="number" value={trigger.data.seconds} />
      <span>{translation.campaign.triggers.seconds}</span>
    </div>
  );
};

export default Trigger;
