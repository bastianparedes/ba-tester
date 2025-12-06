import React from 'react';

import ClickOnElement from './ClickOnElement';
import Custom from './Custom';
import PageLoad from './PageLoad';
import TimeOnPage from './TimeOnPage';
import type { TypeCampaignExtendedWithoutDate, TypeTriggerData } from '@/types/databaseObjects';

interface Props {
  trigger: TypeTriggerData;
  setCampaign: (
    campaign: (TypeCampaignExtendedWithoutDate: TypeCampaignExtendedWithoutDate) => TypeCampaignExtendedWithoutDate,
  ) => void;
}

const Element = ({ setCampaign, trigger }: Props) => {
  if (trigger.type === 'clickOnElement') return <ClickOnElement setCampaign={setCampaign} trigger={trigger} />;

  if (trigger.type === 'custom') return <Custom setCampaign={setCampaign} trigger={trigger} />;

  if (trigger.type === 'pageLoad') return <PageLoad />;

  if (trigger.type === 'timeOnPage') return <TimeOnPage setCampaign={setCampaign} trigger={trigger} />;

  return null;
};
export default Element;
