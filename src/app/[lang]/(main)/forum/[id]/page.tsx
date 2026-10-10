import { getDictionary, hasLocale, type Locale } from "../../../dictionaries";
import { notFound } from "next/navigation";
import { ForumPostDetail } from "@/components/forum/ForumPostDetail";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const isVi = lang === "vi";

  return {
    title: isVi
      ? `Bài viết #${id} - Diễn đàn Fandom GomGoods`
      : `Post #${id} - GomGoods Fandom Forum`,
    description: isVi
      ? "Chi tiết bài thảo luận trong cộng đồng GomGoods"
      : "Community forum discussion details on GomGoods",
  };
}

export default async function ForumPostDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <ForumPostDetail postId={id} dict={dict} lang={lang} />;
}
