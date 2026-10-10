import Image from "next/image";
import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Decorative ambient background blur */}
      <div className="w-64 md:w-80 h-64 md:h-80 relative mb-6 flex items-center justify-center">
        <Image
          src="/404notfound-Photoroom.png"
          alt="404 Not Found"
          fill
          sizes="(max-width: 768px) 256px, 320px"
          className="object-contain drop-shadow-2xl select-none"
          priority
        />
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-label-md font-semibold mb-4">
        <span>404 • Không tìm thấy trang</span>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
        Oops! Goods này đã bị bế đi mất
      </h1>

      <p className="text-body-md md:text-body-lg text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
        Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi đường dẫn hoặc tạm thời không khả dụng.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/vi"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-label-lg shadow-md hover:opacity-95 hover:shadow-lg active:scale-95 transition-all"
        >
          <Home className="w-5 h-5" />
          <span>Về trang chủ GomGoods</span>
        </Link>
        <Link
          href="/vi/marketplace"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-label-lg border border-outline-variant hover:border-outline shadow-sm active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5 text-primary" />
          <span>Khám phá Chợ</span>
        </Link>
      </div>
    </main>
  );
}
