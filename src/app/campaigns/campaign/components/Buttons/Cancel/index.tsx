import React from 'react';

import styles from './styles.module.scss';
import { useTranslationContext } from '../../../../_contexts/useTranslation';

interface Props {
  onClick: () => void;
}

const Cancel = ({ onClick }: Props) => {
  const translation = useTranslationContext();
  return (
    <button className={styles.button} onClick={onClick}>
      {translation.campaign.cancel}
    </button>
  );
};

export default Cancel;
