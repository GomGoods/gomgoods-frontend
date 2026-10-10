"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Flame,
  Sparkles,
} from "lucide-react";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  gradient: string;
  tag: string;
  link: string;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    title: "Color Fiesta 2026",
    subtitle: "Lễ hội sắc màu — Nơi hội tụ của họa sĩ.",
    cta: "Tham gia ngay",
    gradient: "from-slate-950/95 via-slate-900/80 to-transparent",
    tag: "Sự kiện hot",
    link: "/campaign",
  },
  {
    id: 2,
    title: "Gom Deal Fandom Cực Chất",
    subtitle: "Săn scale figure Nhật, photocard hiếm & TCG đấu giá mỗi ngày.",
    cta: "Khám phá ngay",
    gradient: "from-slate-950/95 via-slate-900/85 to-transparent",
    tag: "Bộ sưu tập mới",
    link: "/deal/kho-do-suu-tam",
  },
  {
    id: 3,
    title: "Đấu Giá & Pass Đồ An Toàn",
    subtitle: "Hệ thống cọc bảo đảm 100%, bảo vệ quyền lợi collector trọn vẹn.",
    cta: "Tham gia deal",
    gradient: "from-slate-950/95 via-slate-900/85 to-transparent",
    tag: "Cộng đồng uy tín",
    link: "/auction",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || "vi";

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-advance slides every 5 seconds (pauses when hovering)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const current = slides[currentIndex];

  return (
    <div className="bg-card rounded-2xl border border-border/70 shadow-xs p-3 sm:p-4">
    <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
      {/* 1. Left: Banner Carousel (Kéo dài ngang - 6 cols) */}
      <div
        className="lg:col-span-6 rounded-xl overflow-hidden shadow-xs relative flex items-center bg-muted group min-h-[250px] sm:min-h-[300px] lg:min-h-[380px] aspect-[16/9] sm:aspect-[1640/760] lg:aspect-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Banner Carousel"
      >
        {/* Banner background with enriched colored gradient */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/color-fiesta.jpg"
            alt="Color Fiesta 2026"
            fill
            sizes="(max-width: 1024px) 100vw, 720px"
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${current.gradient} w-full sm:w-4/5 md:w-3/4 transition-colors duration-500`}
          />
        </div>

        {/* Left Arrow Button (<) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Ảnh trước"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/70 active:bg-black/85 text-white backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ChevronLeft size={18} className="stroke-[2.5] -translate-x-0.5" />
        </button>

        {/* Right Arrow Button (>) */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Ảnh tiếp theo"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/70 active:bg-black/85 text-white backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <ChevronRight size={18} className="stroke-[2.5] translate-x-0.5" />
        </button>

        {/* Content overlay */}
        <div className="relative z-10 px-12 sm:px-14 md:px-16 py-4 sm:py-6 max-w-lg transition-all duration-300">
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2 shadow-xs">
            {current.tag}
          </div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-1.5 tracking-tight drop-shadow-md max-w-[280px] sm:max-w-[320px]">
            {current.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mb-3 sm:mb-4 font-medium drop-shadow-sm max-w-[210px] sm:max-w-[240px] leading-relaxed">
            {current.subtitle}
          </p>
          <Link
            href={`/${lang}${current.link}`}
            className="inline-block bg-white text-slate-900 font-bold px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg shadow-sm hover:bg-slate-100 active:scale-95 transition-all cursor-pointer text-xs sm:text-sm"
          >
            {current.cta}
          </Link>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Chuyển tới slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-5 bg-white shadow-xs"
                  : "w-1.5 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Middle: Thẻ Chiến Dịch Campaign (Tông Green Brand tươi sáng) */}
      <Link
        href={`/${lang}/campaign`}
        aria-label="Xem chiến dịch Đại Hội Săn Figure"
        className="lg:col-span-2 rounded-xl bg-brand-green text-white p-3.5 sm:p-4 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200 group/camp border border-brand-green/80 cursor-pointer min-h-[220px] lg:min-h-[380px]"
      >
        {/* Background Watermark */}
        <span className="absolute -top-1 left-2 text-white/20 font-black text-2xl sm:text-3xl tracking-widest pointer-events-none select-none italic">
          CAMPAIGN
        </span>

        {/* Top: Badge & Title */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider mb-2">
            <Flame size={11} className="fill-white text-white" />
            <span>Chiến dịch</span>
          </div>

          <h3 className="font-bold text-sm sm:text-base text-white leading-snug drop-shadow-xs group-hover/camp:text-white/95">
            Đại Hội Săn Figure
          </h3>
          <p className="text-[11px] text-white/90 mt-0.5 font-medium line-clamp-2 leading-tight">
            Đấu giá 0đ phí duy trì &amp; bảo đảm 100%
          </p>
        </div>

        {/* Middle: Campaign Feature Image */}
        <div className="relative w-full aspect-[4/3] my-2 sm:my-3 rounded-lg overflow-hidden bg-white/20 p-1 shadow-inner group-hover/camp:scale-103 transition-transform duration-200">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx-EKCsfuShMcUmSdW-l_2ggcmY7wa1yEWpnbOGNFjzaU-PPg1-JafBaflr6M-0vKryiT0DrwZoeSPRAAIv03DP-gXIwh8ewk84MOtoMHsXVLJWMqIs0jUnOyxgpvhE4HvWmiiKqQnH_tevBN9fxAZn6CJm9K5tU9vGAH0P55k6IeaWyJtgujCU9d5e9mt-0IGpiPI8i3dz1wlt_Easb1vs3_FzapKIwkyPLT7Lw3H3qEtGnPHruXZ"
            alt="Mô hình Nendoroid Hatsune Miku"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-bold text-amber-300">
            Hot Deal
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="w-full py-2 px-3 rounded-lg bg-white text-brand-green font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs group-hover/camp:bg-white/95 transition-all">
          <span>Khám phá ngay</span>
          <ArrowRight size={13} className="stroke-[2.5] group-hover/camp:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      {/* 3. Right: 2 Thẻ Deal chuẩn theo mẫu (4 cols) */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-3 sm:gap-3.5">
        {/* Card 1: Kho Đồ Sưu Tầm (Tông Vàng Brand) */}
        <div
          role="region"
          aria-label="Deal Kho Đồ Sưu Tầm"
          className="flex-1 bg-brand-yellow rounded-xl p-3 sm:p-3.5 relative overflow-hidden flex items-center justify-between gap-2 shadow-xs hover:shadow-sm transition-all duration-200 group/card border border-brand-yellow-hover/60 text-brand-dark"
        >
          {/* Background Watermark */}
          <span className="absolute -top-1 left-3 text-white/35 font-black text-2xl sm:text-3xl tracking-widest pointer-events-none select-none italic">
            COLLECTION
          </span>

          {/* Left: Info & Mascot clickable to Deal Category Page */}
          <Link
            href={`/${lang}/deal/kho-do-suu-tam`}
            className="flex flex-col justify-between h-full z-10 min-w-0 pr-1 flex-1 cursor-pointer group/title"
          >
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight truncate group-hover/title:underline">
                  Kho Đồ Sưu Tầm
                </h3>
                <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 group-hover/card:bg-primary transition-colors">
                  <ArrowRight size={10} className="stroke-[3]" />
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-800/85 font-medium leading-tight truncate">
                Pass đồ xịn giá siêu hời
              </p>
            </div>

            {/* Category Card 1 Mascot */}
            <div className="relative mt-2 filter drop-shadow-xs group-hover/card:scale-103 transition-transform">
              <Image
                src="/Category_Card_1.png"
                alt="Kho Đồ Sưu Tầm"
                width={120}
                height={120}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 object-contain"
              />
            </div>
          </Link>

          {/* Right Product Preview Box */}
          <div className="bg-white/95 dark:bg-slate-800/90 rounded-lg p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 shrink-0 shadow-xs border border-white/60 dark:border-slate-700/80 z-20 backdrop-blur-xs">
            {/* Product 1: Manga Boxset -> /product/4 */}
            <Link
              href={`/${lang}/product/4`}
              title="Xem chi tiết: Manga Boxset"
              className="flex flex-col items-center hover:scale-105 active:scale-95 transition-all cursor-pointer group/prod1"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-muted relative shadow-2xs group-hover/prod1:ring-2 group-hover/prod1:ring-amber-400 transition-all">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYG6MPWGz5vKH1KbkYwanhfyvdylwwduQFXmPLko2XIAPzFyhjzdTpLmBG1HflzxZA-uEal6hhlKyIEfsv0z3YTF6vSCrpjLeYAQsoWBruZKwzr2VZ2lk7o3-TgZzxE747cVeZBb7ch4EA-M_VHkT0LQGdA7gJrymlhUu8a4wInmZaHeRIGFksXPlbnuAC4YQyHK2wjfKT6gF_4fMeXvr52Ut466EKlYsCnWAG7buAL2PWoMrVtC4y"
                  alt="Manga Boxset"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-1 flex items-baseline justify-center">
                <span className="text-[10px] text-foreground font-bold">₫</span>
                <span className="text-xs sm:text-sm text-foreground font-bold ml-0.5">
                  178.000
                </span>
              </div>
            </Link>

            {/* Product 2: Pokemon TCG Pack -> /product/2 */}
            <Link
              href={`/${lang}/product/2`}
              title="Xem chi tiết: Pokemon TCG Pack"
              className="flex flex-col items-center hover:scale-105 active:scale-95 transition-all cursor-pointer group/prod2"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-muted relative shadow-2xs group-hover/prod2:ring-2 group-hover/prod2:ring-amber-400 transition-all">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYpuyTtVVcBisS0nbmHa19Cflx6W344r1lUq7olditp4q_HDLdc02atXauC0YsDc7UYIoPeU9jxBYLcqgNs-Dw-tFYHSMAJn7scTT3u49mBEi4lJ7H6sOpZmXzYEhGpHRKumHete4hED1tsarvvaSPD1zo7-eXV9v0SSAdw36SEt3MT-faskbAFWdwPNyIWs4CD2vgIfLmxdGzVvuIQ324Jh4lrTNQS5LQrkgbyJR4lA6q74BBPFvN"
                  alt="Pokemon TCG Pack"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-1 flex items-baseline justify-center">
                <span className="text-[10px] text-foreground font-bold">₫</span>
                <span className="text-xs sm:text-sm text-foreground font-bold ml-0.5">
                  118.000
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Card 2: Mô Hình & ACG (Tông Blue Brand) */}
        <div
          role="region"
          aria-label="Deal Mô Hình & ACG"
          className="flex-1 bg-brand-blue text-white rounded-xl p-3 sm:p-3.5 relative overflow-hidden flex items-center justify-between gap-2 shadow-xs hover:shadow-sm transition-all duration-200 group/card border border-brand-blue/80"
        >
          {/* Background Watermark */}
          <span className="absolute -top-1 left-3 text-white/20 font-black text-2xl sm:text-3xl tracking-widest pointer-events-none select-none italic">
            FIGURE
          </span>

          {/* Left: Info & Mascot clickable to Deal Category Page */}
          <Link
            href={`/${lang}/deal/mo-hinh-acg`}
            className="flex flex-col justify-between h-full z-10 min-w-0 pr-1 flex-1 cursor-pointer group/title"
          >
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="font-bold text-sm sm:text-base text-white tracking-tight truncate group-hover/title:underline">
                  Mô Hình &amp; ACG
                </h3>
                <div className="w-4 h-4 rounded-full bg-white text-brand-blue flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight size={10} className="stroke-[3]" />
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 font-medium leading-tight truncate">
                Hàng hot săn ngay giá tốt
              </p>
            </div>

            {/* Category Card 2 Mascot */}
            <div className="relative mt-2 filter drop-shadow-xs group-hover/card:scale-103 transition-transform">
              <Image
                src="/Category_Card_2.png"
                alt="Mô Hình & ACG"
                width={140}
                height={100}
                className="w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-22 object-contain"
              />
            </div>
          </Link>

          {/* Right Product Preview Box */}
          <div className="bg-white/95 dark:bg-slate-800/90 rounded-lg p-2 sm:p-2.5 flex items-center gap-2 sm:gap-2.5 shrink-0 shadow-xs border border-white/60 dark:border-slate-700/80 z-20 backdrop-blur-xs">
            {/* Product 1: Nendoroid Hatsune Miku -> /product/1 */}
            <Link
              href={`/${lang}/product/1`}
              title="Xem chi tiết: Nendoroid Hatsune Miku"
              className="flex flex-col items-center hover:scale-105 active:scale-95 transition-all cursor-pointer group/prod1"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-muted relative shadow-2xs group-hover/prod1:ring-2 group-hover/prod1:ring-primary transition-all">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx-EKCsfuShMcUmSdW-l_2ggcmY7wa1yEWpnbOGNFjzaU-PPg1-JafBaflr6M-0vKryiT0DrwZoeSPRAAIv03DP-gXIwh8ewk84MOtoMHsXVLJWMqIs0jUnOyxgpvhE4HvWmiiKqQnH_tevBN9fxAZn6CJm9K5tU9vGAH0P55k6IeaWyJtgujCU9d5e9mt-0IGpiPI8i3dz1wlt_Easb1vs3_FzapKIwkyPLT7Lw3H3qEtGnPHruXZ"
                  alt="Nendoroid Hatsune Miku"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-1 flex items-baseline justify-center">
                <span className="text-[10px] text-foreground font-bold">₫</span>
                <span className="text-xs sm:text-sm text-foreground font-bold ml-0.5">
                  607.000
                </span>
              </div>
            </Link>

            {/* Product 2: Gấu bông Anya Spy x Family -> /product/3 */}
            <Link
              href={`/${lang}/product/3`}
              title="Xem chi tiết: Gấu bông Anya Spy x Family"
              className="flex flex-col items-center hover:scale-105 active:scale-95 transition-all cursor-pointer group/prod2"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-muted relative shadow-2xs group-hover/prod2:ring-2 group-hover/prod2:ring-primary transition-all">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAadvzWNkZAAXGaR-ZXsFEMSnDiLexDoI5FzPZN7lOxKFOXFREGzZ2E0nJksYIiFNHnr_2yLKtbRGMKAK8ELn8z4CGFMTWP-ldxRz8iqnb_X7SAP4Tn7Qr0hQX8yoejtEKLytW_OINQWWbIV20cNWcW4QaJHvX302TMUGUtxZTxUR6ZhxJF8hyG4KBWRmzMufh5ZTcWMCVSFSCJ46YvxM_ak0VpMFGMdWvlGWjlb3JGEwCHr5_QAAAC"
                  alt="Gấu bông Anya Spy x Family"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-1 flex items-baseline justify-center">
                <span className="text-[10px] text-foreground font-bold">₫</span>
                <span className="text-xs sm:text-sm text-foreground font-bold ml-0.5">
                  200.000
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
