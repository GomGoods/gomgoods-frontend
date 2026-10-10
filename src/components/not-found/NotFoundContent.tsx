"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Compass,
  ArrowLeft,
  HelpCircle,
  Radio,
} from "lucide-react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface NotFoundContentProps {
  dict: Dictionary;
  lang: Locale;
}

export function NotFoundContent({ dict, lang }: NotFoundContentProps) {
  const router = useRouter();
  const t = dict.not_found;

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${lang}`);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-10 md:py-16 px-4 flex flex-col items-center text-center">
      {/* Inline styles for keyframe float and beacon animations */}
      <style jsx global>{`
        @keyframes notFoundFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(-1deg);
          }
        }
        .animate-notfound-float {
          animation: notFoundFloat 4s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative ambient background blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Radar Beacon Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-label-md font-semibold mb-6 shadow-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
        </span>
        <Radio className="w-3.5 h-3.5" />
        <span>{t.radar_badge}</span>
      </div>

      {/* 2. 404 Illustration with Float Animation */}
      <div className="relative w-64 h-64 md:w-84 md:h-84 mb-6 flex items-center justify-center">
        <div className="animate-notfound-float relative w-full h-full">
          <Image
            src="/404notfound-Photoroom.png"
            alt="404 Not Found"
            fill
            sizes="(max-width: 768px) 256px, 336px"
            className="object-contain drop-shadow-2xl select-none pointer-events-none"
            priority
          />
        </div>
        {/* Soft shadow oval beneath floating element */}
        <div className="absolute -bottom-2 w-44 md:w-60 h-4 bg-on-surface/10 rounded-[100%] blur-md pointer-events-none" />
      </div>

      {/* 3. Heading & Subtitle */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
        {t.heading}
      </h1>
      <p className="text-body-md md:text-body-lg text-on-surface-variant max-w-lg mx-auto mb-8 leading-relaxed">
        {t.description}
      </p>

      {/* 4. Action Buttons Group */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full max-w-xl mb-10">
        {/* Primary CTA: Back to Home */}
        <Link
          href={`/${lang}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-label-lg shadow-md hover:opacity-95 hover:shadow-lg active:scale-95 transition-all"
        >
          <Home className="w-5 h-5" />
          <span>{t.btn_home}</span>
        </Link>

        {/* Secondary CTA: Explore Marketplace */}
        <Link
          href={`/${lang}/marketplace`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold text-label-lg border border-outline-variant hover:border-outline shadow-sm active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5 text-primary" />
          <span>{t.btn_explore}</span>
        </Link>

        {/* Tertiary CTA: Go Back */}
        <button
          type="button"
          onClick={handleGoBack}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface font-medium text-label-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.btn_back}</span>
        </button>
      </div>

      {/* 5. Help / Feedback Link */}
      <div className="inline-flex items-center gap-2 text-body-sm text-on-surface-variant">
        <HelpCircle className="w-4 h-4 text-outline" />
        <span>{t.help_text}</span>
        <Link
          href={`/${lang}/support`}
          className="font-medium text-primary hover:underline"
        >
          {t.help_link}
        </Link>
      </div>
    </div>
  );
}
