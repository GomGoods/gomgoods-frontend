import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../../dictionaries";
import { getProductDetailById } from "@/components/product/product-detail-data";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const isVi = lang === "vi";
  const product = getProductDetailById(id);

  return {
    title: `${product.title} - GomGoods`,
    description: isVi
      ? `Mua ${product.title} giá tốt trên GomGoods. Tình trạng ${product.specs.condition}, người bán uy tín ${product.seller.name}.`
      : `Buy ${product.title} on GomGoods. Condition: ${product.specs.condition}, verified seller ${product.seller.name}.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const product = getProductDetailById(id);

  return <ProductDetailView product={product} dict={dict} lang={lang} />;
}
