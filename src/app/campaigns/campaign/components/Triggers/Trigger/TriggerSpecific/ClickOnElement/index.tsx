import React from 'react';

import type { TypeCampaignExtended, TypeTriggerData } from '@/types/db';
import { useTranslationContext } from '../../../../../../_contexts/useTranslation';

interface Props {
  trigger: TypeTriggerData & { type: 'clickOnElement' };
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Trigger = ({ setCampaign, trigger }: Props) => {
  const translation = useTranslationContext();
  const selector = trigger.data.selector;

  const handleOnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setCampaign((campaign) => {
      const newSelector = event.target.value;
      trigger.data.selector = newSelector;
      return structuredClone(campaign);
    });
  };

  return (
    <input
      value={selector}
      onChange={handleOnChange}
      placeholder={translation.campaign.triggers.placeholder[trigger.type].valueStringOne}
      type="text"
    />
  );
};

export default Trigger;
