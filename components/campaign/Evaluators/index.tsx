import React from 'react';

import Evaluator from './Evaluator';
import styles from './styles.module.scss';
import labels from '../../../config/labels';
import type {
  campaignWithVariationsEvaluatorsStatus,
  evaluator
} from '../../../types/databaseObjects';
import AddButton from '../AddButton';

interface props {
  evaluators: evaluator[];
  setCampaign: (
    campaign: (
      campaignWithVariationsEvaluatorsStatus: campaignWithVariationsEvaluatorsStatus
    ) => campaignWithVariationsEvaluatorsStatus
  ) => void;
}

const Evaluators = ({ setCampaign, evaluators }: props): JSX.Element => {
  const addNewEvaluator = (): void => {
    setCampaign((campaign) => {
      const newIdEvaluator =
        evaluators.reduce(
          (highest, nextEvaluator) =>
            Math.max(highest, nextEvaluator.idEvaluator),
          0
        ) + 1;

      return {
        ...campaign,
        evaluator: [
          ...evaluators,
          {
            idCampaign: campaign.idCampaign,
            idEvaluator: newIdEvaluator,
            javascript: 'resolve(true);',
            name: 'Evaluator ' + String(newIdEvaluator)
          }
        ]
      };
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{labels.campaign.evaluators.title}</h2>
        <AddButton onClick={addNewEvaluator}>
          {labels.campaign.evaluators.newEvaluator}
        </AddButton>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>
              <span>{labels.campaign.evaluators.table.name}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {evaluators.map((evaluator) => (
            <Evaluator
              evaluator={evaluator}
              key={evaluator.idEvaluator}
              setCampaign={setCampaign}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Evaluators;
