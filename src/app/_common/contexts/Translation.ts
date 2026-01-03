'use client';

import constate from 'constate';

import translation from '../../../config/translation';

interface Props {
  languaje: 'english' | 'spanish';
}

const useTranslation = ({ languaje }: Props) => {
  return { ...translation[languaje] } as const;
};

const [TranslationProvider, useTranslationContext] = constate(useTranslation);
export { TranslationProvider, useTranslationContext };
