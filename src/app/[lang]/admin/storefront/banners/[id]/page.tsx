"use client";

import { use } from "react";
import { BannerForm } from "@/components/admin/storefront/BannerForm";
import { MOCK_BANNERS } from "@/components/admin/dashboard-data";

export default function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const banner = MOCK_BANNERS.find((b) => b.id === id);

  if (!banner) {
    return (
      <div className="py-12 text-center">
        <p className="text-headline-sm text-on-surface">Banner không tồn tại</p>
        <p className="text-body-md text-on-surface-variant mt-2">
          ID: {id} không tìm thấy trong hệ thống
        </p>
      </div>
    );
  }

  return <BannerForm initialData={banner} isEditing />;
}
