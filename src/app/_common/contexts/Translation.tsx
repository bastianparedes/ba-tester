'use client';

import { useState, createContext, useContext } from 'react';
import translations from '../../../config/translation';
import type React from 'react';

type Language = 'english' | 'spanish';

type TranslationContextType = {
  translation: (typeof translations)[Language];
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
};
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

type TranslationProviderProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};
export function TranslationProvider({ children, initialLanguage }: TranslationProviderProps) {
  const [language, setLanguage] = useState(initialLanguage);
  const translation = translations[language];
  return <TranslationContext.Provider value={{ setLanguage, translation }}>{children}</TranslationContext.Provider>;
}

export const useTranslationContext = () => {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error('useTranslationContext must be used inside TranslationProvider');
  return ctx;
};
