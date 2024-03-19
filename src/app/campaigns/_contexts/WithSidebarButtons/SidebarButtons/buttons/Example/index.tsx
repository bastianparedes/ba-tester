import React from 'react';

import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

import styles from './styles.module.scss';
import constants from '../../../../../../../../config/constants';

const ButtonCampaigns = () => {
  return (
    <div className={styles.buttonContainer}>
      <Link
        rel="noopener noreferrer"
        target="_blank"
        prefetch={false}
        className={styles.a}
        href={constants.pages.example}
      >
        <FaEye className={styles.icon} />
      </Link>
    </div>
  );
};

export default ButtonCampaigns;
