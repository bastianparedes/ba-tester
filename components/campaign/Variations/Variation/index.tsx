import React, { useState } from 'react';

import { classNames } from 'bastianparedes/utils';
import { MdDelete, MdEdit } from 'react-icons/md';

import styles from './styles.module.scss';
import labels from '../../../../config/labels';
import type {
  campaignWithVariationsEvaluatorsStatus,
  variation
} from '../../../../types/databaseObjects';
import Editor from '../Editor';

interface props {
  variation: variation;
  setCampaign: (
    campaign: (
      campaignWithVariationsEvaluatorsStatus: campaignWithVariationsEvaluatorsStatus
    ) => campaignWithVariationsEvaluatorsStatus
  ) => void;
}

const Variation = ({ setCampaign, variation }: props): JSX.Element => {
  const [showEditor, setShowEditor] = useState(false);
  const openEditor = (): void => {
    setShowEditor(true);
  };

  const idVariation = variation.idVariation;

  const deleteVariation = (): void => {
    setCampaign((campaign) => {
      const newVariations = campaign.variations.filter(
        (variation: variation) => idVariation !== variation.idVariation
      );

      return {
        ...campaign,
        variations: newVariations
      };
    });
  };

  const saveName = (event: React.FocusEvent<HTMLInputElement>): void => {
    setCampaign((campaign) => {
      const variations = campaign.variations.map((variation) => {
        if (idVariation === variation.idVariation) {
          variation.name = event.target.value;
        }

        return variation;
      });

      return {
        ...campaign,
        variations
      };
    });
  };

  const saveTraffic = (event: React.FocusEvent<HTMLInputElement>): void => {
    setCampaign((campaign) => {
      const newVariations = campaign.variations.map((variation: variation) => {
        if (idVariation === variation.idVariation) {
          const preNewTraffic = Math.trunc(event.target.valueAsNumber);
          const newTraffic =
            preNewTraffic < 0 ? 0 : preNewTraffic > 100 ? 100 : preNewTraffic;
          event.target.value = String(newTraffic);
          variation.traffic = newTraffic;
        }
        return variation;
      });

      return {
        ...campaign,
        variations: newVariations
      };
    });
  };

  return (
    <tr className={styles.container}>
      <td className={styles.td}>
        <span>{variation.idVariation}</span>
      </td>
      <td className={styles.td}>
        <input defaultValue={variation.name} onBlur={saveName} type="text" />
      </td>
      <td className={styles.td}>
        <input
          className={styles.trafficInput}
          defaultValue={variation.traffic}
          max="100"
          min="0"
          onBlur={saveTraffic}
          step="1"
          type="number"
        />
        <span className={styles.percentage}>{labels.symbols.percentage}</span>
      </td>
      <td className={classNames(styles.td, styles.littleButton)}>
        <button className={styles.button} onClick={openEditor}>
          <MdEdit />
        </button>
        {showEditor && (
          <Editor
            setCampaign={setCampaign}
            setShowEditor={setShowEditor}
            variation={variation}
          />
        )}
      </td>
      <td className={classNames(styles.td, styles.littleButton)}>
        <button className={styles.button} onClick={deleteVariation}>
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default Variation;
