import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { CampaignView } from "@/components/campaign/CampaignView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === "vi";

  return {
    title: isVi ? "Chiến dịch - GomGoods" : "Campaigns - GomGoods",
    description: isVi
      ? "Tham gia các chiến dịch cộng đồng, sự kiện săn deal hàng hiếm và lễ hội fandom độc quyền tại GomGoods."
      : "Join community campaigns, rare deal hunts, and exclusive fandom festivals on GomGoods.",
  };
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <CampaignView dict={dict} lang={lang} />;
}
