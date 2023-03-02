import React from 'react';

import styles from './styles.module.scss';
import Variation from './Variation';
import labels from '../../../config/labels';
import type {
  campaignWithVariationsEvaluatorsStatus,
  variation
} from '../../../types/databaseObjects';
import AddButton from '../AddButton';

interface props {
  variations: variation[];
  setCampaign: (
    campaign: (
      campaignWithVariationsEvaluatorsStatus: campaignWithVariationsEvaluatorsStatus
    ) => campaignWithVariationsEvaluatorsStatus
  ) => void;
}

const Variations = ({ setCampaign, variations }: props): JSX.Element => {
  const addNewVariation = (): void => {
    setCampaign((campaign) => {
      const newIdVariation =
        variations.reduce(
          (highest, nextVariation) =>
            Math.max(highest, nextVariation.idVariation),
          0
        ) + 1;

      return {
        ...campaign,
        variations: [
          ...variations,
          {
            css: '',
            html: '',
            idCampaign: campaign.idCampaign,
            idVariation: newIdVariation,
            javascript: '',
            name: 'Variation ' + String(newIdVariation),
            traffic: 0
          }
        ]
      };
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{labels.campaign.variations.title}</h2>
        <AddButton onClick={addNewVariation}>
          {labels.campaign.variations.newVariation}
        </AddButton>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>
              <span>{labels.campaign.variations.table.id}</span>
            </th>
            <th className={styles.th}>
              <span>{labels.campaign.variations.table.name}</span>
            </th>
            <th className={styles.th}>
              <span>{labels.campaign.variations.table.traffic}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {variations.map((variation) => (
            <Variation
              key={variation.idVariation}
              setCampaign={setCampaign}
              variation={variation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Variations;
