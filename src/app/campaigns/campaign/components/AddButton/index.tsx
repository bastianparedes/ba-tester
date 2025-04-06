import React from 'react';

import { cx } from 'class-variance-authority';

import styles from './styles.module.scss';

interface Props {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const Index = ({ children, className, onClick }: Props) => {
  return (
    <button className={cx(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Index;
