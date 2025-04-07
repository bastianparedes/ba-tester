import React from 'react';

import FilterByName from './Name';
import FilterByQuantity from './Quantity';
import FilterByStatus from './Status';
import styles from './styles.module.scss';

const Filters = () => {
  return (
    <aside className={styles.aside}>
      <FilterByName />
      <FilterByStatus />
      <FilterByQuantity />
    </aside>
  );
};

export default Filters;
