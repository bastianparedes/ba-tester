'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Loader } from '@/app/_common/components/Loader';

type LoaderContextType = {
  showLoader: () => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

type LoaderProviderProps = {
  children: ReactNode;
};

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [counter, setCounter] = useState(0);

  const showLoader = () => setCounter((prev) => prev + 1);
  const hideLoader = () => setCounter((prev) => Math.max(prev - 1, 0));

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {counter > 0 && <Loader />}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error('useLoader must be used inside LoaderProvider');
  return ctx;
};
