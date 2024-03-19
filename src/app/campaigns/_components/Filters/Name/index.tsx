import React, { useState } from 'react';

import styles from './styles.module.scss';
import { useTranslationContext } from '../../../_contexts/useTranslation';
import { useFiltersContext } from '../../context/filters';

const FilterByName = () => {
  const translation = useTranslationContext();
  const { filterByname, setFilterByName } = useFiltersContext();
  const [name, setName] = useState(filterByname);
  let idInterval: NodeJS.Timeout;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
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
      <input value={name} onChange={handleOnChange} type="text" />
    </fieldset>
  );
};

export default FilterByName;
