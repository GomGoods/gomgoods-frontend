import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/[lang]/dictionaries";
import { SellerProfileView } from "@/components/seller/SellerProfileView";
import { getSellerProfileById, getSellerProducts } from "@/components/seller/seller-data";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const seller = getSellerProfileById(id);

  return {
    title: `${seller.name} - Hồ sơ Người Bán | GomGoods`,
    description: `Khám phá các món đồ thanh lý, figure, card bo góc chính hãng giá tốt từ ${seller.name} trên GomGoods.`,
  };
}

export default async function SellerProfilePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const seller = getSellerProfileById(id);
  const products = getSellerProducts(id);

  return (
    <SellerProfileView
      seller={seller}
      products={products}
      dict={dict}
      lang={lang}
    />
  );
}
