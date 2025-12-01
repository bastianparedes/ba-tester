import React from 'react';

import styles from './styles.module.scss';
import commonConstants from '../../../../../config/common/constants';
import { useTranslationContext } from '../../../_contexts/useTranslation';
import { useFiltersContext } from '../../context/filters';

const FilterByStatus = () => {
  const translation = useTranslationContext();
  const { addToFilterByStatusList, removeFromFilterByStatusList, filterByStatusList } = useFiltersContext();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.value as (typeof commonConstants)['campaignStatus'][number];
    if (event.target.checked) addToFilterByStatusList(status);
    else if (filterByStatusList.length > 1) removeFromFilterByStatusList(status);
  };

  return (
    <fieldset>
      <legend className={styles.legend}>{translation.campaigns.filters.status}</legend>
      {commonConstants.campaignStatus.map((status) => {
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
            <label htmlFor={id}>{translation.common.statusLabels[status]}</label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default FilterByStatus;
