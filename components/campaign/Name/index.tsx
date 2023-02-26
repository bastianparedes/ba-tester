import React from 'react';

import styles from './styles.module.scss';
import labels from '../../../config/labels';
import type {
  campaignWithVariationsEvaluatorsStatus,
  status
} from '../../../types/databaseObjects';
import capitalize from '../../../utils/capitalize';

interface props {
  campaign: campaignWithVariationsEvaluatorsStatus;
  setCampaign: (
    campaign: (
      campaignWithVariationsEvaluatorsStatus: campaignWithVariationsEvaluatorsStatus
    ) => campaignWithVariationsEvaluatorsStatus
  ) => void;
  status: status[];
}

const Index = ({ campaign, setCampaign, status }: props): JSX.Element => {
  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    const newName = event.target.value;
    setCampaign(
      (
        campaign: campaignWithVariationsEvaluatorsStatus
      ): campaignWithVariationsEvaluatorsStatus => ({
        ...campaign,
        name: newName
      })
    );
  };

  const handleOnSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setCampaign((campaign) => {
      return {
        ...campaign,
        idStatus: Number(event.target.value)
      };
    });
  };

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{labels.campaign.name.title}</h2>
        <select
          className={styles.select}
          onChange={handleOnSelect}
          value={campaign.idStatus}
        >
          {status.map((status) => (
            <option key={status.idStatus} value={status.idStatus}>
              {capitalize(status.value)}
            </option>
          ))}
        </select>
      </header>
      <input
        className={styles.input}
        defaultValue={campaign.name}
        onBlur={handleOnBlur}
        placeholder={labels.campaign.name.inputPlaceHolder}
        type="text"
      />
    </div>
  );
};

export default Index;
