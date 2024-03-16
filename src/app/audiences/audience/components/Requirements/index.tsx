import React from 'react';

import Requirement from './Requirement';
import styles from './styles.module.scss';
import type { AudienceExtendedWithoutDate } from '../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../common/context/useTranslation';

interface Props {
  requirements: AudienceExtendedWithoutDate['requirements'];
  setAudience: (
    audience: (
      AudienceExtendedWithoutDate: AudienceExtendedWithoutDate
    ) => AudienceExtendedWithoutDate
  ) => void;
}

const Requirements = ({ setAudience, requirements }: Props) => {
  const translation = useTranslationContext();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          {translation.audience.requirements.title}
        </h2>
      </header>
      <div className={styles.requirementsContainer}>
        <Requirement
          grandParentNode={null}
          id={'0'}
          index={0}
          parentNode={null}
          requirement={requirements}
          setAudience={setAudience}
        />
      </div>
    </div>
  );
};

export default Requirements;
