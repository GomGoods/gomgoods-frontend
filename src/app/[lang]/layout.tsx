import { hasLocale, locales } from "./dictionaries";
import { notFound } from "next/navigation";
import { SupportChatWidget } from "@/components/support/SupportChatWidget";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      {children}
      <SupportChatWidget />
    </>
  );
}
