import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/[lang]/dictionaries";
import { ChatWorkspace } from "@/components/chat/ChatWorkspace";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: `${dict.chat?.title || "Tin nhắn"} | GomGoods`,
    description: "Nhắn tin và trao đổi trực tiếp với người bán và người mua trên GomGoods.",
  };
}

export default async function ChatPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <Suspense fallback={<div className="w-full h-96 flex items-center justify-center text-sm text-muted-foreground">Đang tải tin nhắn...</div>}>
      <ChatWorkspace dict={dict} lang={lang as Locale} />
    </Suspense>
  );
}
