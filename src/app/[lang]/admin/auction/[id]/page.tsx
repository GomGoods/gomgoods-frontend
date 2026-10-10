import { AuctionDetail } from "@/components/admin/auctions/AuctionDetail";

export default async function AdminAuctionDetailAliasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AuctionDetail id={id} />;
}
