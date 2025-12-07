import React from 'react';
import { cx } from 'class-variance-authority';
import styles from './styles.module.scss';

interface props {
  children?: React.ReactNode;
  setVisible?: ((boolean: boolean) => void) | null;
}

const Shadow = ({ children, setVisible = null }: props) => {
  const handleOnClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (setVisible === null) return;

    const target = event.target as HTMLElement;
    const classList = target.classList;
    const shadoWasClicked = classList.contains(styles.shadow);

    if (shadoWasClicked) setVisible(false);
  };

  return (
    <div className={cx(styles.shadow, styles.dark)} data-testid="data-testid-shadow" onClick={handleOnClick}>
      {children}
    </div>
  );
};

export { Shadow };
export default Shadow;
