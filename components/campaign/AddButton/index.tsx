import React from 'react';

import styles from './styles.module.scss';

interface props {
  children?: React.ReactNode;
  onClick: () => void;
}

const Index = ({ children, onClick }: props): JSX.Element => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Index;
