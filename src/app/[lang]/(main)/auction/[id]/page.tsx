import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../../dictionaries";
import { getAuctionDetailById } from "@/components/auction/auction-data";
import { AuctionDetailView } from "@/components/auction/AuctionDetailView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const isVi = lang === "vi";
  const item = getAuctionDetailById(id);

  return {
    title: `${item.title} - GomGoods Đấu Giá`,
    description: isVi
      ? `Tham gia đấu giá ${item.title} trên GomGoods. Giá khởi điểm ${item.startingPrice.toLocaleString()} đ.`
      : `Bid on ${item.title} on GomGoods. Starting at ${item.startingPrice.toLocaleString()} VND.`,
  };
}

export default async function AuctionDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const item = getAuctionDetailById(id);

  return <AuctionDetailView item={item} dict={dict} lang={lang} />;
}
