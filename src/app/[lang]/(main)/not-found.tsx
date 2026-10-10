import { cookies } from "next/headers";
import { getDictionary, defaultLocale, type Locale, hasLocale } from "../dictionaries";
import { NotFoundContent } from "@/components/not-found/NotFoundContent";

export default async function MainNotFound() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  let lang: Locale = defaultLocale;

  if (cookieLocale && hasLocale(cookieLocale)) {
    lang = cookieLocale;
  }

  const dict = await getDictionary(lang);

  return <NotFoundContent dict={dict} lang={lang} />;
}
