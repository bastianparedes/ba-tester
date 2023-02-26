import React from 'react';

import Campaign from './Campaign';
import styles from './styles.module.scss';
import labels from '../../../config/labels';
import type { campaignWithStatus } from '../../../types/databaseObjects';

interface props {
  campaigns: campaignWithStatus[];
}

const Index = ({ campaigns }: props): JSX.Element => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>
            <span>{labels.index.camapignsTable.id}</span>
          </th>
          <th className={styles.th}>
            <span>{labels.index.camapignsTable.campaignName}</span>
          </th>
          <th className={styles.th}>
            <span>{labels.index.camapignsTable.status}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((campaign) => (
          <Campaign campaign={campaign} key={campaign.idCampaign} />
        ))}
      </tbody>
    </table>
  );
};

export default Index;
