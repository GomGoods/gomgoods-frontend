"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PromoBannerProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  image?: string;
  href?: string;
  ctaText?: string;
}

export function PromoBanner({
  title = "Xả kho Blindbox Popmart - Giảm đến 30%",
  subtitle = "Sưu tầm ngay các bé Skullpanda, Molly, Dimoo với giá siêu hời từ các seller uy tín.",
  badge = "HOT DEAL",
  image = "https://lh3.googleusercontent.com/aida-public/AB6AXuB-j0Pew16g4-E_mRpSf9KigQSsarMXbiIAtIhJIiiuamxvzTXNViFfT4sRDFUSSjzRlpcyqxePrm-2nGJRWNMkFYqREfZpnBX1HFkYV89nUp9R4ZJee16oJPndTyktmmFjSkmaAT32cm3HTnblQbYNl7rdgUDfkVvBdkYJXgoHcNHzR1dke7d7wqJ8lgTzWAVufWC2t5gkxVr-9g-Y3I-D-5KqKx7MvOSJD4KSeePvC4kUKXNepDNy",
  href = "#",
  ctaText = "Khám phá ngay",
}: PromoBannerProps) {
  return (
    <div className="col-span-2 md:col-span-2 lg:col-span-2 bg-inverse-surface text-inverse-on-surface rounded-xl overflow-hidden border border-outline-variant/60 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-200 flex relative group cursor-pointer h-full min-h-[220px]">
      {/* Pattern background overlay */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] mix-blend-overlay pointer-events-none" />

      {/* Text column */}
      <div className="w-1/2 p-4 sm:p-6 flex flex-col justify-center relative z-10">
        <span className="text-[11px] font-bold text-tertiary-fixed-dim bg-tertiary/40 border border-tertiary-fixed-dim/30 px-2 py-0.5 rounded-md w-fit mb-2 uppercase tracking-wider">
          {badge}
        </span>
        <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1.5 sm:mb-2 leading-snug text-inverse-on-surface">
          {title}
        </h3>
        <p className="text-xs sm:text-body-sm opacity-80 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {subtitle}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 bg-primary text-on-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-label-compact font-bold w-fit hover:bg-primary-container transition-all active:scale-95 shadow-md"
        >
          <span>{ctaText}</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Image column */}
      <div className="w-1/2 relative overflow-hidden">
        <img
          alt="Promo banner"
          className="absolute inset-0 w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-500"
          src={image}
        />
        {/* Soft edge blend gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface via-inverse-surface/75 to-transparent" />
      </div>
    </div>
  );
}
