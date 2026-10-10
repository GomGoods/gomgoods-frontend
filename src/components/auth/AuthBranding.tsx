import { Archive, ShieldCheck, Zap } from "lucide-react";

interface AuthBrandingProps {
  mode: "login" | "register";
}

const fandomHashtags = [
  "#AnimeFigures",
  "#KpopPhotocard",
  "#GundamPlamo",
  "#PokemonTCG",
];

export function AuthBranding({ mode }: AuthBrandingProps) {
  return (
    <section className="lg:col-span-5 flex flex-col space-y-6 pt-2" data-purpose="community-showcase">
      {/* Main Welcome Card */}
      <div className="bg-gradient-to-br from-white to-primary/5 dark:from-surface-container dark:to-surface-container-low border border-primary/15 dark:border-outline-variant/60 rounded-3xl p-6 sm:p-8 shadow-soft-card relative overflow-hidden">
        {/* Decorative Ambient Orbs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

        {mode === "register" ? (
          <>
            {/* Decorative Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-surface shadow-xs border border-primary/15 mb-5 relative z-10">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase text-primary">
                Cộng đồng Otaku &amp; Collectors
              </span>
            </div>

            {/* Header Text */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2 relative z-10">
              Bắt đầu hành trình Gom Goods cùng <span className="text-primary font-black">+50.000</span> Collector!
            </h1>

            {/* GomGoods Slogan with Special Font */}
            <div className="mb-4 relative z-10">
              <p className="font-slogan italic text-lg sm:text-xl font-bold tracking-wide text-primary dark:text-primary-fixed drop-shadow-xs">
                &ldquo;Món đúng gu, về đúng chủ&rdquo;
              </p>
              <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-transparent mt-1.5 rounded-full" />
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 relative z-10">
              Không gian mua bán, pass đồ, gom order uy tín số 1 dành riêng cho các tín đồ Anime, Manga, K-Pop, Trading Cards và Retro Toys.
            </p>

            {/* 3 Feature Points with Icons */}
            <div className="space-y-3.5 relative z-10">
              {/* Feature 1 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-surface-container-high/80 border border-primary/10 hover:bg-white dark:hover:bg-surface-container-high transition-all shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-amber-950/40 text-primary flex items-center justify-center shrink-0">
                  <Archive size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    Khám phá kho tàng đồ hiếm
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                    Từ photocard unoff/official, scale figure Nhật Bản, manga boxset đến retro games nguyên seal.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-surface-container-high/80 border border-primary/10 hover:bg-white dark:hover:bg-surface-container-high transition-all shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    Giao dịch an toàn &amp; Đấu giá minh bạch
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                    Hệ thống cọc bảo đảm, xác minh người bán, hoàn tiền 100% khi hàng không đúng mô tả.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 dark:bg-surface-container-high/80 border border-primary/10 hover:bg-white dark:hover:bg-surface-container-high transition-all shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Zap size={20} className="stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    Mở shop nhanh trong 1 phút
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                    Tự do pass đồ cũ, thanh lý góc sưu tầm cá nhân mà không tốn chi phí duy trì hàng tháng.
                  </p>
                </div>
              </div>
            </div>

            {/* Fandom Badges Grid */}
            <div className="mt-6 pt-5 border-t border-primary/15 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 relative z-10">
              {fandomHashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white dark:bg-surface rounded-lg border border-slate-200 dark:border-outline-variant/60 shadow-2xs hover:border-primary/40 transition cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Login Branding */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-surface shadow-xs border border-primary/15 mb-5 relative z-10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase text-primary">
                C2C Fandom Marketplace
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4 relative z-10">
              Chào mừng trở lại <br />
              <span className="text-primary">Fandom</span> của bạn!
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6 relative z-10">
              Săn photocard hiếm, mô hình anime chính hãng, đấu giá merchandise độc quyền với hàng chục ngàn collector đam mê khác.
            </p>

            {/* Mascot & Legit Check for Login */}
            <div className="relative my-6 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-3xl bg-surface/90 p-4 shadow-md flex items-center justify-center transform transition duration-300 group-hover:scale-105 border border-surface-variant">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOmwn7t5ttrz71Yy1wn9GPe5oo4wSnWW6cpkXzmX9UtxcyLJ-2cgCvdv7YXlyYw3GCd8F8YV7buTx0zz1A4AiQiQ0Mi5NdevnK2-BEIdidYaHdopoNZ8JIqYwAapkq5NWWITZU6cOoWUXw_6dkbtSv2JL1HK35Yq3JQ6rGvVCOQ-dpl2tsRGmNL2aBW9gc6R-M-Cv1Q3YWFHuGdxAkJ6VnZZdYH7a9fyUoHHSWL8vpVLIAAZfdhfoxSBdSLsW05ntqeA"
                    alt="Linh vật GomGoods"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
                <div className="absolute -bottom-3 -right-2 bg-slate-900 text-white text-xs px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 border border-white/20 font-semibold">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>100% Legit Check</span>
                </div>
              </div>
            </div>

            {/* Fandom Badges */}
            <div className="mt-4 pt-4 border-t border-primary/15 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 relative z-10">
              {fandomHashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white dark:bg-surface rounded-lg border border-slate-200 dark:border-outline-variant/60 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
