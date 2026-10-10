import { notFound } from "next/navigation";

const dictionaries = {
  vi: () =>
    import("./dictionaries/vi.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const locales: Locale[] = ["vi"];
export const defaultLocale: Locale = "vi";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale = defaultLocale) => {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
};

export const getDictionaryByLocale = async (locale: Locale) => {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
};
