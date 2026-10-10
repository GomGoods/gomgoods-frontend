import { notFound } from "next/navigation";
import { hasLocale } from "../../../dictionaries";
import { getDealCategory, dealCategories } from "@/components/deal/deal-data";
import { DealCategoryView } from "@/components/deal/DealCategoryView";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = Object.keys(dealCategories);
  const locales = ["vi"];
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const isVi = lang === "vi";
  const deal = getDealCategory(slug);

  if (!deal) {
    return {
      title: isVi ? "Không tìm thấy Deal - GomGoods" : "Deal Not Found - GomGoods",
    };
  }

  return {
    title: `${deal.title} - Săn Deal Fandom GomGoods`,
    description: isVi
      ? `${deal.title} - ${deal.subtitle}. Săn hàng hiếm, giá cực hời và an toàn 100% tại GomGoods.`
      : `${deal.title} - ${deal.subtitle}. Discover rare fandom merchandise and exclusive deals on GomGoods.`,
  };
}

export default async function DealPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const deal = getDealCategory(slug);
  if (!deal) notFound();

  return <DealCategoryView deal={deal} lang={lang} />;
}
