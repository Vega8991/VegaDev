/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useEffect } from 'react';
import { TRANSLATIONS } from './translations';

const LangContext = createContext({ lang: 'en', t: TRANSLATIONS.en });

export function LangProvider({ lang, children }) {
  const value = useMemo(() => ({ lang, t: TRANSLATIONS[lang] || TRANSLATIONS.en }), [lang]);
  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useT() {
  return useContext(LangContext);
}
