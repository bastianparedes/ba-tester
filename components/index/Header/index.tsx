import React from 'react';

import styles from './styles.module.scss';
import constants from '../../../config/constants';
import labels from '../../../config/labels';

const Index = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <span className={styles.title}>{labels.index.header.title}</span>
      <a
        className={styles.button}
        href={
          constants.path.campaign +
          '/' +
          String(constants.newCampaign.idCampaign)
        }
      >
        {labels.index.header.createCampaignButton}
      </a>
    </header>
  );
};

export default Index;
