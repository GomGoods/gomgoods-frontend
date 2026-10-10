import { DisputeDetail } from "@/components/admin/disputes/DisputeDetail";

export default async function AdminDisputeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DisputeDetail id={id} />;
}
