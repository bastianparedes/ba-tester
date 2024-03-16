import React from 'react';

import ButtonAudiences from './buttons/Audiences';
import ButtonBundle from './buttons/Bundle';
import ButtonCampaigns from './buttons/Campaigns';
import styles from './styles.module.scss';

const SidebarButtons = () => {
  return (
    <div className={styles.container}>
      <ButtonCampaigns />
      <ButtonAudiences />
      <ButtonBundle />
    </div>
  );
};

export default SidebarButtons;
