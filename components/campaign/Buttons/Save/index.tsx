import React from 'react';

import styles from './styles.module.scss';
import labels from '../../../../config/labels';
import type { campaignWithVariationsEvaluatorsStatus } from '../../../../types/databaseObjects';

interface props {
  campaign: campaignWithVariationsEvaluatorsStatus;
  onClick: () => void;
}

const Save = ({ campaign, onClick }: props): JSX.Element => {
  const thereAreVariation = campaign.variations.length > 0;
  const trafficSumNot100 =
    campaign.variations.reduce(
      (sum, variation) => sum + variation.traffic,
      0
    ) !== 100;
  const emptyName = campaign.name.trim() === '';

  return (
    <>
      <button
        className={styles.button}
        disabled={(thereAreVariation && trafficSumNot100) || emptyName}
        onClick={onClick}
      >
        {labels.campaign.save}
      </button>
    </>
  );
};

export default Save;
