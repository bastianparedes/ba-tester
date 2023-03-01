import React, { useState } from 'react';

import { classNames } from 'bastianparedes/utils';
import { MdDelete, MdEdit } from 'react-icons/md';

import styles from './styles.module.scss';
import type {
  campaignWithVariationsEvaluatorsStatus,
  evaluator
} from '../../../../types/databaseObjects';
import Editor from '../Editor';

interface props {
  evaluator: evaluator;
  setCampaign: (
    campaign: (
      campaignWithVariationsEvaluatorsStatus: campaignWithVariationsEvaluatorsStatus
    ) => campaignWithVariationsEvaluatorsStatus
  ) => void;
}

const Evaluator = ({ setCampaign, evaluator }: props): JSX.Element => {
  const [showEditor, setShowEditor] = useState(false);
  const openEditor = (): void => {
    setShowEditor(true);
  };

  const idEvaluator = evaluator.idEvaluator;
  const deleteEvaluator = (): void => {
    setCampaign((campaign) => {
      const newEvaluators = campaign.evaluators.filter(
        (evaluator: evaluator) => idEvaluator !== evaluator.idEvaluator
      );

      return {
        ...campaign,
        evaluators: newEvaluators
      };
    });
  };

  const saveName = (event: React.FocusEvent<HTMLInputElement>): void => {
    setCampaign((campaign) => {
      const evaluators = campaign.evaluators.map((evaluator) => {
        if (idEvaluator === evaluator.idEvaluator) {
          evaluator.name = event.target.value;
        }

        return evaluator;
      });

      return {
        ...campaign,
        evaluators
      };
    });
  };

  return (
    <tr className={styles.container}>
      <td className={styles.td}>
        <input defaultValue={evaluator.name} onBlur={saveName} type="text" />
      </td>
      <td className={classNames(styles.td, styles.littleButton)}>
        <button className={styles.button} onClick={openEditor}>
          <MdEdit />
        </button>
        {showEditor && (
          <Editor
            evaluator={evaluator}
            setCampaign={setCampaign}
            setShowEditor={setShowEditor}
          />
        )}
      </td>
      <td className={classNames(styles.td, styles.littleButton)}>
        <button className={styles.button} onClick={deleteEvaluator}>
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default Evaluator;
