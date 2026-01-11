'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const root = window.document.documentElement;
    if (language === 'bn') {
      root.classList.add('font-bangla');
    } else {
      root.classList.remove('font-bangla');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
