import React from 'react';

import styles from './styles.module.scss';
import { variationsWithDistributedTraffic } from './util';
import Variation from './Variation';
import type { TypeCampaignExtended, TypeVariationData } from '@/types/databaseObjects';
import { useTranslationContext } from '../../../_contexts/useTranslation';
import AddButton from '../AddButton';

interface Props {
  variations: TypeVariationData[];
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Variations = ({ setCampaign, variations }: Props) => {
  const translation = useTranslationContext();

  const addNewVariation = () => {
    setCampaign((campaign) => {
      const newCampaign = structuredClone(campaign);
      const newIdVariation = variations.reduce((highest, nextVariation) => Math.max(highest, nextVariation.id), 0) + 1;

      newCampaign.variations.push({
        css: '',
        html: '',
        id: newIdVariation,
        javascript: '',
        name: 'Variation ' + String(newIdVariation),
        traffic: 0,
      });

      newCampaign.variations = variationsWithDistributedTraffic(newCampaign.variations);

      return newCampaign;
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{translation.campaign.variations.title}</h2>
        <AddButton onClick={addNewVariation}>{translation.campaign.variations.newVariation}</AddButton>
      </header>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>
              <span>{translation.campaign.variations.table.id}</span>
            </th>
            <th className={styles.th}>
              <span>{translation.campaign.variations.table.name}</span>
            </th>
            <th className={styles.th}>
              <span>{translation.campaign.variations.table.traffic}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {variations.map((variation) => (
            <Variation key={variation.id} setCampaign={setCampaign} variation={variation} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Variations;
