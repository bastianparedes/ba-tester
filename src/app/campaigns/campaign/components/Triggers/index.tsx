import React from 'react';

import styles from './styles.module.scss';
import Trigger from './Trigger';
import commonConstants from '../../../../../config/common/constants';
import type { TypeCampaignExtended, TypeTriggerData } from '@/types/databaseObjects';
import { useTranslationContext } from '../../../_contexts/useTranslation';
import AddButton from '../AddButton';

interface Props {
  triggers: TypeTriggerData[];
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Triggers = ({ setCampaign, triggers }: Props) => {
  const translation = useTranslationContext();

  const addNewTrigger = () => {
    setCampaign((campaign) => {
      const newCampaign = structuredClone(campaign);
      const newIdTrigger = triggers.reduce((highest, nextTrigger) => Math.max(highest, nextTrigger.id), 0) + 1;

      const newTrigger = {
        data: {},
        id: newIdTrigger,
        type: commonConstants.triggerTypes.pageLoad,
      };

      newCampaign.triggers.push(newTrigger);

      return newCampaign;
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{translation.campaign.triggers.title}</h2>
        <AddButton onClick={addNewTrigger}>{translation.campaign.triggers.newTrigger}</AddButton>
      </header>
      <table className={styles.table}>
        <tbody>
          {triggers.map((trigger, index) => (
            <Trigger index={index} trigger={trigger} key={trigger.id} setCampaign={setCampaign} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Triggers;
