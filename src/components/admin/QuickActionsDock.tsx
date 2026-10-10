"use client";

import { HeadsetIcon } from "lucide-react";

export function QuickActionsDock() {
  return (
    <section className="bg-secondary-fixed/50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
          <HeadsetIcon size={24} />
        </div>
        <div>
          <h3 className="text-headline-sm text-on-surface">
            Trung tâm hỗ trợ CSKH &amp; Hòa giải Fandom
          </h3>
          <p className="text-body-sm text-on-surface-variant">
            Hệ thống gợi ý giải quyết hoàn tiền thông minh dựa trên phân tích hình ảnh check legit tự động.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <button className="px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface text-label-md shadow-sm hover:bg-surface-container-low transition-all">
          Xem cẩm nang xử lý
        </button>
        <button className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-label-md shadow-md hover:bg-on-primary-container transition-all">
          Mở cổng hỗ trợ trực tuyến
        </button>
      </div>
    </section>
  );
}
