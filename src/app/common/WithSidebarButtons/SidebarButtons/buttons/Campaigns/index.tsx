import React from 'react';

import Link from 'next/link';
import { GrTest } from 'react-icons/gr';

import styles from './styles.module.scss';
import constants from '../../../../../../../config/constants';

const ButtonCampaigns = () => {
  return (
    <div className={styles.buttonContainer}>
      <Link
        prefetch={false}
        className={styles.a}
        href={constants.pages.campaigns}
      >
        <GrTest className={styles.icon} />
      </Link>
    </div>
  );
};

export default ButtonCampaigns;
