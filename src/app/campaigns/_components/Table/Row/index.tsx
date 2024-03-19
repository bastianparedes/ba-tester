import React from 'react';

import Link from 'next/link';

import styles from './styles.module.scss';

interface Props {
  labels: (string | number | React.ReactNode)[];
  href: string;
}

const Row = ({ href, labels }: Props) => {
  return (
    <tr className={styles.tr}>
      {labels.map((label, index) => (
        <td className={styles.td} key={index}>
          <Link prefetch={false} className={styles.a} href={href}>
            {label}
          </Link>
        </td>
      ))}
    </tr>
  );
};

export default Row;
