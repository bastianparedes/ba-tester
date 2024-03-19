import React from 'react';

import styles from './styles.module.scss';
import commonConstants from '../../../../../../config/common/constants';
import type { CampaignExtendedWithoutDate } from '../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../_contexts/useTranslation';

interface Props {
  campaign: CampaignExtendedWithoutDate;
  setCampaign: (
    campaign: (
      CampaignExtendedWithoutDate: CampaignExtendedWithoutDate
    ) => CampaignExtendedWithoutDate
  ) => void;
}

const Index = ({ campaign, setCampaign }: Props) => {
  const translation = useTranslationContext();

  const handleOnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setCampaign((campaign: CampaignExtendedWithoutDate) => {
      campaign.name = event.target.value;
      return structuredClone(campaign);
    });
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target
      .value as (typeof commonConstants)['campaignStatus'][number];
    setCampaign((campaign) => {
      campaign.status = newStatus;
      return structuredClone(campaign);
    });
  };

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{translation.campaign.name.title}</h2>
        <select onChange={handleOnSelect} value={campaign.status}>
          {commonConstants.campaignStatus.map((statusValue) => (
            <option key={statusValue} value={statusValue}>
              {translation.common.statusLabels[statusValue]}
            </option>
          ))}
        </select>
      </header>
      <input
        className={styles.input}
        value={campaign.name}
        onChange={handleOnChange}
        placeholder={translation.campaign.name.inputPlaceHolder}
        type="text"
      />
    </div>
  );
};

export default Index;
