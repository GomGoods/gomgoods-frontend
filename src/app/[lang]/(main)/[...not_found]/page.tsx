import { getDictionary, hasLocale, type Locale } from "@/app/[lang]/dictionaries";
import { notFound } from "next/navigation";
import { NotFoundContent } from "@/components/not-found/NotFoundContent";
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
      ? "404 - Không tìm thấy trang | GomGoods"
      : "404 - Page Not Found | GomGoods",
    description: isVi
      ? "Trang bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại trên GomGoods."
      : "The page you are looking for might have been removed or does not exist on GomGoods.",
  };
}

export default async function CatchAllNotFoundPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <NotFoundContent dict={dict} lang={lang as Locale} />;
}
