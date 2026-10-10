import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { CartView } from "@/components/cart/CartView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === "vi";

  return {
    title: isVi ? "Giỏ hàng - GomGoods" : "Shopping Cart - GomGoods",
    description: isVi
      ? "Quản lý giỏ hàng của bạn trên GomGoods. Mua sắm an toàn, đảm bảo chất lượng từ các nhà bán uy tín."
      : "Manage your shopping cart on GomGoods. Safe checkout, authentic collectibles from trusted sellers.",
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <CartView dict={dict} lang={lang as Locale} />;
}
