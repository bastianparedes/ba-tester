import React from 'react';

import Link from 'next/link';

import styles from './styles.module.scss';
import constants from '../../../../../config/constants';
import { useTranslationContext } from '../../../common/context/useTranslation';

const Index = () => {
  const translation = useTranslationContext();
  return (
    <header className={styles.header}>
      <span className={styles.title}>{translation.audiences.header.title}</span>
      <Link
        prefetch={false}
        className={styles.button}
        href={{ pathname: constants.pages.audience }}
      >
        {translation.audiences.header.createAudienceButton}
      </Link>
    </header>
  );
};

export default Index;
