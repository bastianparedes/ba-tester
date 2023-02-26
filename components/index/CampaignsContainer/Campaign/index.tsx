import React from 'react';

import styles from './styles.module.scss';
import constants from '../../../../config/constants';
import type { campaignWithStatus } from '../../../../types/databaseObjects';
import capitalize from '../../../../utils/capitalize';

interface props {
  campaign: campaignWithStatus;
}

const Index = ({ campaign }: props): JSX.Element => {
  const href = constants.path.campaign + '/' + String(campaign.idCampaign);
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        <a className={styles.a} href={href}>
          {campaign.idCampaign}
        </a>
      </td>
      <td className={styles.td}>
        <a className={styles.a} href={href}>
          {campaign.name}
        </a>
      </td>
      <td className={styles.td}>
        <span className={styles[campaign.status.value]}>
          {capitalize(campaign.status.value)}
        </span>
      </td>
    </tr>
  );
};

export default Index;
