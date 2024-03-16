import React from 'react';

import styles from './styles.module.scss';
import { useTranslationContext } from '../../../../../common/context/useTranslation';

interface Props {
  onClick: () => void;
}

const Cancel = ({ onClick }: Props) => {
  const translation = useTranslationContext();
  return (
    <button className={styles.button} onClick={onClick}>
      {translation.audience.cancel}
    </button>
  );
};

export default Cancel;
