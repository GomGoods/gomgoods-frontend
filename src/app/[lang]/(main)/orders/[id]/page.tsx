import { notFound } from "next/navigation";
import { hasLocale } from "../../../dictionaries";
import { getOrderTrackingById } from "@/components/orders/order-tracking-data";
import { OrderDetailView } from "@/components/orders/OrderDetailView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const isVi = lang === "vi";
  const order = getOrderTrackingById(id);

  return {
    title: isVi
      ? `Chi tiết đơn hàng #${order.orderCode} - GomGoods`
      : `Order Details #${order.orderCode} - GomGoods`,
    description: isVi
      ? `Theo dõi chu trình giao nhận đơn hàng #${order.orderCode} trên sàn GomGoods.`
      : `Track order #${order.orderCode} on GomGoods.`,
  };
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();

  const order = getOrderTrackingById(id);

  return <OrderDetailView order={order} lang={lang} />;
}
