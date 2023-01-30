import React from 'react';

import styles from './styles.module.scss';
import labels from '../../../../config/labels';

interface props {
  onClick: () => void;
}

const Cancel = ({ onClick }: props): JSX.Element => {
  return (
    <button className={styles.button} onClick={onClick}>
      {labels.campaign.cancel}
    </button>
  );
};

export default Cancel;
