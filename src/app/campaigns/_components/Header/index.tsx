import React from 'react';

import Link from 'next/link';

import styles from './styles.module.scss';
import constants from '../../../../config/constants';
import { useTranslationContext } from '../../_contexts/useTranslation';

const Index = () => {
  const translation = useTranslationContext();
  return (
    <header className={styles.header}>
      <span className={styles.title}>{translation.campaigns.header.title}</span>
      <Link prefetch={false} className={styles.button} href={{ pathname: constants.pages.campaign }}>
        {translation.campaigns.header.createCampaignButton}
      </Link>
    </header>
  );
};

export default Index;
