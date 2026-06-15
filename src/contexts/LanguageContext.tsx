import React, { createContext, useContext, useState } from "react";

export type Language = "de" | "en";

interface LanguageContextValue {
  lang: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "de",
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("de");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "de" ? "en" : "de"));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
