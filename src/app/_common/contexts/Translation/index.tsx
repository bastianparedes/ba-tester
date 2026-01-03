'use client';

import { useState, createContext, useContext } from 'react';
import languagesObject from './languages';
import type React from 'react';

type Language = keyof typeof languagesObject;
const languageKeys = Object.keys(languagesObject) as Language[];

type TranslationContextType = {
  translation: (typeof languagesObject)[Language]['labels'];
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
};
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

type TranslationProviderProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};
export function TranslationProvider({ children, initialLanguage }: TranslationProviderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [isOpen, setIsOpen] = useState(false);

  const translation = languagesObject[selectedLanguage].labels;
  return (
    <TranslationContext.Provider value={{ setLanguage: setSelectedLanguage, translation }}>
      {children}

      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {languageKeys.map((lang) => (
              <button
                key={languagesObject[lang].name}
                onClick={() => setSelectedLanguage(lang)}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                  selectedLanguage === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="font-medium">{languagesObject[lang].name}</span>
                {selectedLanguage === lang && <span className="ml-auto text-blue-600">✓</span>}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-lg border border-gray-200 px-4 py-2 transition-all hover:shadow-xl font-medium"
        >
          {languagesObject[selectedLanguage].name}
        </button>
      </div>
    </TranslationContext.Provider>
  );
}

export const useTranslationContext = () => {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error('useTranslationContext must be used inside TranslationProvider');
  return ctx;
};
