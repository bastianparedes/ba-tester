import React from 'react';

import FilterByName from './Name';
import FilterByPage from './Page';
import FilterByQuantity from './Quantity';
import FilterByStatus from './Status';
import styles from './styles.module.scss';

const Filters = () => {
  return (
    <aside className={styles.aside}>
      <FilterByName />
      <FilterByStatus />
      <FilterByQuantity />
      <FilterByPage />
    </aside>
  );
};

export default Filters;
