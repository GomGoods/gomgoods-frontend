import { CampaignDetail } from "@/components/admin/campaigns/CampaignDetail";

export default async function AdminCampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CampaignDetail id={id} />;
}
