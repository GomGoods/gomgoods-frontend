"use client";

import { use } from "react";
import { PromotionForm } from "@/components/admin/storefront/PromotionForm";
import { MOCK_PROMOTIONS } from "@/components/admin/dashboard-data";

export default function EditPromotionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const promo = MOCK_PROMOTIONS.find((p) => p.id === id);

  if (!promo) {
    return (
      <div className="py-12 text-center">
        <p className="text-headline-sm text-on-surface">Khuyến mãi không tồn tại</p>
        <p className="text-body-md text-on-surface-variant mt-2">
          ID: {id} không tìm thấy trong hệ thống
        </p>
      </div>
    );
  }

  return <PromotionForm initialData={promo} isEditing />;
}
