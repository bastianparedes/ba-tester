import React from 'react';

import styles from './styles.module.scss';
import constants from '../../../../../../config/constants';
import { useTranslationContext } from '../../../../common/context/useTranslation';
import { useFiltersContext } from '../../context/filters';

const FilterByQuantity = () => {
  const translation = useTranslationContext();
  const { quantity, setQuantity } = useFiltersContext();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(() => Number(event.target.value));
  };

  return (
    <fieldset>
      <legend className={styles.legend}>
        {translation.audiences.filters.quantity}
      </legend>
      {constants.quantitiesAvailable.map((quantitieAvailable) => {
        const id = 'radio-filter-quantity-' + String(quantitieAvailable);
        return (
          <div className={styles.container} key={quantitieAvailable}>
            <input
              checked={quantity === quantitieAvailable}
              id={id}
              onChange={handleOnChange}
              type="radio"
              value={quantitieAvailable}
            />
            <label htmlFor={id}>{quantitieAvailable}</label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default FilterByQuantity;
