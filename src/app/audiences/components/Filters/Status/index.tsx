import React from 'react';

import styles from './styles.module.scss';
import commonConstants from '../../../../../../config/common/constants';
import { useTranslationContext } from '../../../../common/context/useTranslation';
import { useFiltersContext } from '../../context/filters';

const FilterByStatus = () => {
  const translation = useTranslationContext();
  const {
    addToFilterByStatusList,
    removeFromFilterByStatusList,
    filterByStatusList
  } = useFiltersContext();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target
      .value as (typeof commonConstants)['audienceStatus'][number];
    if (event.target.checked) addToFilterByStatusList(status);
    else if (filterByStatusList.length > 1)
      removeFromFilterByStatusList(status);
  };

  return (
    <fieldset>
      <legend className={styles.legend}>
        {translation.audiences.filters.status}
      </legend>
      {commonConstants.audienceStatus.map((status) => {
        const id = 'checkbox-filter-status-' + String(status);
        return (
          <div className={styles.container} key={status}>
            <input
              checked={filterByStatusList.includes(status)}
              id={id}
              onChange={handleOnChange}
              type="checkbox"
              value={status}
            />
            <label htmlFor={id}>
              {translation.common.statusLabels[status]}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default FilterByStatus;
