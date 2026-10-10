import { CampaignDetail } from "@/components/admin/campaigns/CampaignDetail";

export default async function AdminCampaignDetailAliasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CampaignDetail id={id} />;
}
