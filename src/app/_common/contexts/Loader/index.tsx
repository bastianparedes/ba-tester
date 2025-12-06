'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

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
      {counter > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-9999">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error('useLoader must be used inside LoaderProvider');
  return ctx;
};
