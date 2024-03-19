import React from 'react';

import Link from 'next/link';
import { IoLogoJavascript } from 'react-icons/io';

import styles from './styles.module.scss';
import constants from '../../../../../../../../config/constants';

const ButtonCampaigns = () => {
  return (
    <div className={styles.buttonContainer}>
      <Link
        prefetch={false}
        className={styles.a}
        rel="noopener noreferrer"
        target="_blank"
        href={constants.pages.bundle}
      >
        <IoLogoJavascript className={styles.icon} />
      </Link>
    </div>
  );
};

export default ButtonCampaigns;
