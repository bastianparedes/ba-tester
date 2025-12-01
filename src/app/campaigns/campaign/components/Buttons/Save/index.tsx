import React from 'react';

import styles from './styles.module.scss';
import type { CampaignExtendedWithoutDate } from '@/types/databaseObjects';
import { useTranslationContext } from '../../../../_contexts/useTranslation';

interface Props {
  campaign: CampaignExtendedWithoutDate;
  onClick: () => void;
}

const Save = ({ campaign, onClick }: Props) => {
  const translation = useTranslationContext();

  const thereAreVariation = campaign.variations.length > 0;
  const trafficSumNot100 = campaign.variations.reduce((sum, variation) => sum + variation.traffic, 0) !== 100;
  const emptyName = campaign.name.trim() === '';

  return (
    <>
      <button
        className={styles.button}
        disabled={(thereAreVariation && trafficSumNot100) || emptyName}
        onClick={onClick}
      >
        {translation.campaign.save}
      </button>
    </>
  );
};

export default Save;
