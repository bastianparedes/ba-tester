import React from 'react';

import { cx } from 'class-variance-authority';
import { BsArrowDownShort } from 'react-icons/bs';

import styles from './styles.module.scss';

interface Props {
  id: string;
  label: string;
  orderInfo?: {
    order: 'asc' | 'desc';
    orderBy: string;
    setOrder: (arg0: (arg1: 'asc' | 'desc') => typeof arg1) => void;
    setOrderBy: (arg0: (arg1: string) => typeof arg1) => void;
  };
  width: number;
}

const Column = ({ id, label, orderInfo, width }: Props) => {
  const handleOnClick = () => {
    if (orderInfo === undefined) return;

    if (id === orderInfo.orderBy) orderInfo.setOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
    else {
      orderInfo.setOrderBy(() => id);
      orderInfo.setOrder(() => 'desc');
    }
  };

  return (
    <th className={cx(styles.th)} style={{ width: String(width) + '%' }}>
      {orderInfo === undefined ? (
        label
      ) : (
        <button className={styles.button} onClick={handleOnClick}>
          <span>{label}</span>
          {orderInfo.orderBy === id && (
            <BsArrowDownShort className={cx(styles.arrow, orderInfo.order === 'asc' && styles.arrowUp)} />
          )}
        </button>
      )}
    </th>
  );
};

export default Column;
