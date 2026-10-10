import { redirect } from "next/navigation";
import { defaultLocale } from "./[lang]/dictionaries";

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
