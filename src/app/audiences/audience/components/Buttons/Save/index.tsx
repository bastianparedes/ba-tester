import React from 'react';

import styles from './styles.module.scss';
import type { AudienceExtendedWithoutDate } from '../../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../../common/context/useTranslation';

interface Props {
  audience: AudienceExtendedWithoutDate;
  onClick: () => void;
}

const Save = ({ audience, onClick }: Props) => {
  const translation = useTranslationContext();
  const emptyName = audience.name.trim() === '';

  return (
    <>
      <button className={styles.button} disabled={emptyName} onClick={onClick}>
        {translation.audience.save}
      </button>
    </>
  );
};

export default Save;
