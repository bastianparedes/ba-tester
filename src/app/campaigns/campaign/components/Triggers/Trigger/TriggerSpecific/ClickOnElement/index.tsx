import React from 'react';

import type {
  CampaignExtendedWithoutDate,
  TriggerData
} from '../../../../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../../../../common/context/useTranslation';

interface Props {
  trigger: TriggerData & { type: 'clickOnElement' };
  setCampaign: (
    campaign: (
      CampaignExtendedWithoutDate: CampaignExtendedWithoutDate
    ) => CampaignExtendedWithoutDate
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
      placeholder={
        translation.campaign.triggers.placeholder[trigger.type].valueStringOne
      }
      type="text"
    />
  );
};

export default Trigger;
