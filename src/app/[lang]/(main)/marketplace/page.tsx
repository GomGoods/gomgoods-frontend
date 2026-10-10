import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { MarketplaceView } from "@/components/marketplace/MarketplaceView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === "vi";

  return {
    title: isVi ? "Khám phá Marketplace - GomGoods" : "Explore Marketplace - GomGoods",
    description: isVi
      ? "Khám phá hàng ngàn mô hình anime, thẻ bài TCG, goods fandom chính hãng từ các nhà bán uy tín trên GomGoods."
      : "Discover thousands of anime figures, TCG cards, and authentic fandom collectibles on GomGoods.",
  };
}

export default async function MarketplacePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <MarketplaceView dict={dict} />;
}
