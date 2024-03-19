import React from 'react';

import SidebarButtons from './SidebarButtons';
import styles from './styles.module.scss';

interface Props {
  children?: React.ReactNode;
}

const WithSidebarButtons = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <SidebarButtons />
      <section className={styles.section}>{children}</section>
    </div>
  );
};

export default WithSidebarButtons;
