import { ForumDetail } from "@/components/admin/forum/ForumDetail";

export default async function AdminForumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ForumDetail id={id} />;
}
