import React from 'react';

interface Props {
  children?: React.ReactNode;
  setVisible?: ((value: boolean) => void) | null;
  blur?: boolean;
}

const Shadow = ({ children, setVisible = null, blur = false }: Props) => {
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!setVisible) return;

    if (event.currentTarget === event.target) {
      setVisible(false);
    }
  };

  return (
    <div
      data-testid="data-testid-shadow"
      onClick={handleOnClick}
      className={`
        fixed inset-0 w-screen h-screen z-1000
        bg-black/50
        ${blur ? 'backdrop-blur-[5px]' : ''}
      `}
    >
      {children}
    </div>
  );
};

export default Shadow;
