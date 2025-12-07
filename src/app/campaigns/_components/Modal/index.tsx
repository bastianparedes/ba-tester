import React, { JSX } from 'react';

import { MdClose } from 'react-icons/md';

import Shadow from '../Shadow';

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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[5px] max-sm:w-full max-sm:max-h-[90%] max-sm:fixed max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-t-[10px] max-sm:rounded-b-none">
        <button
          className="flex items-center justify-center absolute right-0 translate-x-1/2 -translate-y-1/2 p-0 bg-white border-2 border-black rounded-full text-2xl text-black max-sm:static max-sm:border-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:m-[5px] max-sm:ml-auto"
          data-testid="data-testid-button-closer-modal"
          onClick={handleOnClose}
        >
          <MdClose />
        </button>
        <div className="overflow-auto">{children}</div>
      </div>
    </Shadow>
  );
};

export { Modal };
export default Modal;
