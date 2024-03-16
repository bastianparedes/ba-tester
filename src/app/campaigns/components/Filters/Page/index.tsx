import React from 'react';

import styles from './styles.module.scss';
import { useTranslationContext } from '../../../../common/context/useTranslation';
import { useFiltersContext } from '../../context/filters';

const FilterByQuantity = () => {
  const translation = useTranslationContext();
  const { quantity, page, count, setPage } = useFiltersContext();

  const totalPages = Math.floor(count / quantity);
  const pagesAvailable = Array.from(Array(totalPages + 1).keys());

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(() => Number(event.target.value));
  };

  return (
    <fieldset>
      <legend className={styles.legend}>
        {translation.campaigns.filters.page}
      </legend>
      {pagesAvailable.map((pageAvailable) => {
        const id = 'radio-filter-page-' + String(pageAvailable);
        return (
          <div className={styles.container} key={pageAvailable}>
            <input
              checked={page === pageAvailable}
              id={id}
              onChange={handleOnChange}
              type="radio"
              value={pageAvailable}
            />
            <label htmlFor={id}>{pageAvailable + 1}</label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default FilterByQuantity;
