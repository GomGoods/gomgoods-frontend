import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { SellView } from "@/components/sell/SellView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === "vi";

  return {
    title: isVi
      ? "Đăng bán / Pass đồ Fandom chính hãng - GomGoods"
      : "Sell / Pass Fandom Collectibles - GomGoods",
    description: isVi
      ? "Đăng bán figure, card, standee, goods fandom chính hãng nhanh chóng, an toàn với bảo hiểm giao dịch trung gian 100% tại GomGoods."
      : "List authentic figures, TCG cards, anime merch with 100% buyer-seller escrow protection on GomGoods.",
  };
}

export default async function SellPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <SellView dict={dict} lang={lang as Locale} />;
}
