import React from 'react';

import styles from './styles.module.scss';
import labels from '../../../../config/labels';
import type { campaignJoined } from '../../../../types/databaseObjects';

interface props {
  campaign: campaignJoined;
  onClick: () => void;
}

const Save = ({ campaign, onClick }: props): JSX.Element => {
  const thereAreVariation = campaign.variation.length > 0;
  const trafficSumNot100 =
    campaign.variation.reduce(
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
