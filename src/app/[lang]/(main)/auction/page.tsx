import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { AuctionView } from "@/components/auction/AuctionView";
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
      ? "Sàn Đấu Giá - GomGoods"
      : "Auctions - GomGoods",
    description: isVi
      ? "Khám phá và tham gia các phiên đấu giá vật phẩm hiếm, mô hình anime, thẻ bài TCG và goods sưu tầm độc quyền trên GomGoods."
      : "Discover and participate in exclusive auctions for rare anime figures, TCG cards, and limited fandom collectibles on GomGoods.",
  };
}

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <AuctionView dict={dict} lang={lang} />;
}
