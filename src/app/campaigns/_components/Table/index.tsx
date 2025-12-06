import React from 'react';

import Column from './Column';
import Row from './Row';
import styles from './styles.module.scss';
import { useTranslationContext } from '../../_contexts/useTranslation';
import { type TypeOrderDirection } from '@/types/db';

interface Props {
  columns: {
    id: string;
    label: string;
    width: number;
  }[];
  orderInfo?: {
    order: TypeOrderDirection;
    orderBy: string;
    setOrder: (arg0: (arg1: TypeOrderDirection) => typeof arg1) => void;
    setOrderBy: (arg0: (arg1: string) => typeof arg1) => void;
  };
  rows: {
    id: string | number;
    labels: (string | number | React.ReactNode)[];
    href: string;
  }[];
}

const Table = ({ columns, orderInfo, rows }: Props) => {
  const translation = useTranslationContext();
  const thereAreRows = rows.length > 0;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <Column id={column.id} key={column.id} label={column.label} orderInfo={orderInfo} width={column.width} />
          ))}
        </tr>
      </thead>
      <tbody>
        {thereAreRows ? (
          rows.map((row) => <Row href={row.href} key={row.id} labels={row.labels} />)
        ) : (
          <tr>
            <td className={styles.tdNoRows} colSpan={columns.length}>
              {translation.common.table.noData}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
