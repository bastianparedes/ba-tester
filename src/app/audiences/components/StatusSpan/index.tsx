import React from 'react';

import styles from './styles.module.scss';
import commonConstants from '../../../../../config/common/constants';
import { useTranslationContext } from '../../../common/context/useTranslation';

interface Props {
  status: (typeof commonConstants)['audienceStatus'][number];
}

const StatusSpan = ({ status }: Props) => {
  const translation = useTranslationContext();
  return (
    <span className={styles[status]}>
      {translation.common.statusLabels[status]}
    </span>
  );
};

export default StatusSpan;
