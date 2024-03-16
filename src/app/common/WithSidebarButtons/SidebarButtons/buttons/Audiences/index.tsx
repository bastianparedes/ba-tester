import React from 'react';

import Link from 'next/link';
import { BsFillPeopleFill } from 'react-icons/bs';

import styles from './styles.module.scss';
import constants from '../../../../../../../config/constants';

const ButtonCampaigns = () => {
  return (
    <div className={styles.buttonContainer}>
      <Link
        prefetch={false}
        className={styles.a}
        href={constants.pages.audiences}
      >
        <BsFillPeopleFill className={styles.icon} />
      </Link>
    </div>
  );
};

export default ButtonCampaigns;
