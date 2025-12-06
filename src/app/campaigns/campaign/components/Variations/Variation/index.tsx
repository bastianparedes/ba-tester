import React, { useState } from 'react';

import { cx } from 'class-variance-authority';
import { MdDelete, MdEdit } from 'react-icons/md';

import styles from './styles.module.scss';
import type { TypeCampaignExtended, TypeVariationData } from '@/types/db';
import { useTranslationContext } from '../../../../_contexts/useTranslation';
import Editor from '../Editor';
import { variationsWithDistributedTraffic } from '../util';

interface Props {
  variation: TypeVariationData;
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Variation = ({ setCampaign, variation }: Props) => {
  const translation = useTranslationContext();
  const [showEditor, setShowEditor] = useState(false);
  const openEditor = () => {
    setShowEditor(true);
  };

  const id = variation.id;

  const deleteVariation = () => {
    setCampaign((campaign) => {
      campaign.variations = campaign.variations.filter((variation: TypeVariationData) => id !== variation.id);

      campaign.variations = variationsWithDistributedTraffic(campaign.variations);

      return structuredClone(campaign);
    });
  };

  const saveName = (event: React.FocusEvent<HTMLInputElement>) => {
    setCampaign((campaign) => {
      variation.name = event.target.value;
      return structuredClone(campaign);
    });
  };

  const saveTraffic = (event: React.FocusEvent<HTMLInputElement>) => {
    const valueAsNumber = Math.round(event.target.valueAsNumber);
    let newTraffic = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber;
    newTraffic = Math.trunc(newTraffic);
    if (newTraffic < 0) newTraffic = 0;
    else if (newTraffic > 100) newTraffic = 100;
    event.target.value = String(newTraffic);
    variation.traffic = newTraffic;
    setCampaign((campaign) => {
      return structuredClone(campaign);
    });
  };

  return (
    <tr className={styles.container}>
      <td className={styles.td}>
        <span>{variation.id}</span>
      </td>
      <td className={styles.td}>
        <input value={variation.name} onChange={saveName} type="text" />
      </td>
      <td className={styles.td}>
        <input
          className={styles.trafficInput}
          max={100}
          min={0}
          onChange={saveTraffic}
          step={1}
          type="number"
          value={variation.traffic}
        />
        <span className={styles.percentage}>{translation.common.symbols.percentage}</span>
      </td>
      <td className={cx(styles.td, styles.littleButton)}>
        <button className={styles.button} onClick={openEditor}>
          <MdEdit />
        </button>
        {showEditor && <Editor setCampaign={setCampaign} setShowEditor={setShowEditor} variation={variation} />}
      </td>
      <td className={cx(styles.td, styles.littleButton)}>
        <button className={styles.button} onClick={deleteVariation}>
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default Variation;
