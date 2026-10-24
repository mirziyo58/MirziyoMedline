import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "uz" | "ru";
/** A bilingual text value. */
export type L = { uz: string; ru: string };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "uz", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setL] = useState<Lang>("uz");
  useEffect(() => {
    const s = localStorage.getItem("lang");
    if (s === "ru" || s === "uz") setL(s);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setL(l);
    localStorage.setItem("lang", l);
  }, []);
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

/** Returns a translator: t({ uz, ru }) → text in the current language. */
export function useT() {
  const { lang } = useLang();
  return useCallback((l: L) => l[lang], [lang]);
}

/** Shorthand for writing bilingual literals. */
export const l = (uz: string, ru: string): L => ({ uz, ru });
