import React from 'react';

import { classNames } from 'bastianparedes/utils';

import styles from './styles.module.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const Index = ({ children, className, onClick }: Props) => {
  return (
    <button className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Index;
