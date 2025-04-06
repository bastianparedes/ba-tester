import React, { JSX } from 'react';

import { MdClose } from 'react-icons/md';

import Shadow from '../Shadow';
import styles from './styles.module.scss';

interface props {
  children?: React.ReactNode;
  setModalVisible: (boolean: boolean) => void;
}

const Modal = ({ children, setModalVisible }: props): JSX.Element => {
  const handleOnClose = (): void => {
    setModalVisible(false);
  };

  return (
    <Shadow setVisible={setModalVisible}>
      <div className={styles.modal}>
        <button
          className={styles.button}
          data-testid="data-testid-button-closer-modal"
          onClick={handleOnClose}
        >
          <MdClose />
        </button>
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </Shadow>
  );
};

export { Modal };
export default Modal;
