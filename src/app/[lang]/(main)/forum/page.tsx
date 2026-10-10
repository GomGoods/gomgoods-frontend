import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { ForumView } from "@/components/forum/ForumView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === "vi";

  return {
    title: isVi ? "Cộng đồng Fandom - GomGoods" : "Fandom Community - GomGoods",
    description: isVi
      ? "Diễn đàn cộng đồng GomGoods: Nơi chia sẻ đam mê merchandise, trao đổi kinh nghiệm mua bán, check giá và cảnh báo rủi ro lừa đảo."
      : "GomGoods Fandom Community: Share your merch passion, exchange trading tips, check market value, and stay alert against scams.",
  };
}

export default async function ForumPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <ForumView dict={dict} lang={lang} />;
}
