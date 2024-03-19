import React from 'react';

import ButtonCampaigns from './buttons/Campaigns';
import ButtonBundle from './buttons/Bundle';
import ButtonExample from './buttons/Example';
import styles from './styles.module.scss';

const SidebarButtons = () => {
  return (
    <div className={styles.container}>
      <ButtonCampaigns />
      <ButtonBundle />
      <ButtonExample />
    </div>
  );
};

export default SidebarButtons;
