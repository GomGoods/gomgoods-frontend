import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === "vi";

  return {
    title: isVi ? "Thanh toán an toàn - GomGoods" : "Secure Checkout - GomGoods",
    description: isVi
      ? "Thanh toán đơn hàng an toàn, bảo hiểm 100% rủi ro với đa dạng phương thức COD, ví điện tử, thẻ và VietQR trên GomGoods."
      : "Safe checkout with 100% buyer protection. Multiple payment options: COD, e-wallets, cards, and VietQR on GomGoods.",
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return <CheckoutView dict={dict} lang={lang as Locale} />;
}
