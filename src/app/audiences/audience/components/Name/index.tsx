import React from 'react';

import styles from './styles.module.scss';
import commonConstants from '../../../../../../config/common/constants';
import type { AudienceExtendedWithoutDate } from '../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../common/context/useTranslation';

interface Props {
  audience: AudienceExtendedWithoutDate;
  setAudience: (
    audience: (
      AudienceExtendedWithoutDate: AudienceExtendedWithoutDate
    ) => AudienceExtendedWithoutDate
  ) => void;
}

const Index = ({ audience, setAudience }: Props) => {
  const translation = useTranslationContext();

  const handleOnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setAudience((audience: AudienceExtendedWithoutDate) => {
      audience.name = event.target.value;
      return structuredClone(audience);
    });
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target
      .value as (typeof commonConstants)['audienceStatus'][number];
    setAudience((audience) => {
      audience.status = newStatus;
      return structuredClone(audience);
    });
  };

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>{translation.audience.name.title}</h2>
        <select onChange={handleOnSelect} value={audience.status}>
          {commonConstants.audienceStatus.map((statusValue) => (
            <option key={statusValue} value={statusValue}>
              {translation.common.statusLabels[statusValue]}
            </option>
          ))}
        </select>
      </header>
      <input
        className={styles.input}
        value={audience.name}
        onChange={handleOnChange}
        placeholder={translation.audience.name.inputPlaceHolder}
        type="text"
      />
    </div>
  );
};

export default Index;
