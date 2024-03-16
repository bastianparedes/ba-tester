import React from 'react';

import styles from './styles.module.scss';
import { useTranslationContext } from '../../../../common/context/useTranslation';
import { useFiltersContext } from '../../context/filters';

const FilterByName = () => {
  const translation = useTranslationContext();
  const { setFilterByName } = useFiltersContext();
  let idInterval: NodeJS.Timeout;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearInterval(idInterval);
    idInterval = setTimeout(() => {
      setFilterByName(() => event.target.value);
    }, 1000);
  };

  return (
    <fieldset>
      <legend className={styles.legend}>
        {translation.campaigns.filters.name}
      </legend>
      <input onChange={handleOnChange} type="text" />
    </fieldset>
  );
};

export default FilterByName;
