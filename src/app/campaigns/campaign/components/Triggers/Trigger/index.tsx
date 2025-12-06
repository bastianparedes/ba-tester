import React from 'react';

import { cx } from 'class-variance-authority';
import { MdDelete } from 'react-icons/md';

import styles from './styles.module.scss';
import TriggerSpecific from './TriggerSpecific';
import commonConstants from '../../../../../../config/common/constants';
import type { TypeCampaignExtended, TypeTriggerData } from '@/types/databaseObjects';
import { useTranslationContext } from '../../../../_contexts/useTranslation';

interface Props {
  index: number;
  trigger: TypeTriggerData;
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Trigger = ({ index, setCampaign, trigger }: Props) => {
  const translation = useTranslationContext();
  const handleOnChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as (typeof commonConstants)['triggers'][number];
    setCampaign((campaign) => {
      const index = campaign.triggers.findIndex((triggerInList) => triggerInList.id === trigger.id);

      if (newType === 'clickOnElement')
        campaign.triggers[index] = {
          data: {
            selector: '',
          },
          id: trigger.id,
          type: newType,
        };
      else if (newType === 'custom')
        campaign.triggers[index] = {
          data: {
            javascript: 'fire();',
            name: '',
          },
          id: trigger.id,
          type: newType,
        };
      else if (newType === 'pageLoad')
        campaign.triggers[index] = {
          data: {},
          id: trigger.id,
          type: newType,
        };
      else if (newType === 'timeOnPage')
        campaign.triggers[index] = {
          data: {
            seconds: 1,
          },
          id: trigger.id,
          type: newType,
        };

      return structuredClone(campaign);
    });
  };

  const deleteTrigger = () => {
    setCampaign((campaign) => {
      campaign.triggers = campaign.triggers.filter((triggerInList) => triggerInList.id !== trigger.id);
      return structuredClone(campaign);
    });
  };

  return (
    <>
      {index > 0 && (
        <tr>
          <td>
            <span className={styles.or}>{translation.campaign.triggers.booleanOperators.or}</span>
          </td>
        </tr>
      )}
      <tr className={styles.tr}>
        <td className={styles.td}>
          <div className={styles.container}>
            <select onChange={handleOnChangeType} value={trigger.type}>
              {commonConstants.triggers.map((type) => (
                <option key={type} value={type}>
                  {translation.campaign.triggers.types[type]}
                </option>
              ))}
            </select>
            <TriggerSpecific setCampaign={setCampaign} trigger={trigger} />
          </div>
        </td>
        <td className={cx(styles.td, styles.littleButton)}>
          <button className={styles.button} onClick={deleteTrigger}>
            <MdDelete />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Trigger;
