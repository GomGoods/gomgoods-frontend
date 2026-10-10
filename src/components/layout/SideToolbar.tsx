"use client";

import { useState, useEffect } from "react";
import {
  PlusCircle,
  MessageCircle,
  Ticket,
  Package,
  Heart,
  HelpCircle,
  Info,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { ThemeToggle } from "./ThemeToggle";

interface SideToolbarProps {
  dict: Dictionary;
}

const mainActions = [
  { key: "sell" as const, icon: PlusCircle, href: (lang: string) => `/${lang}/sell` },
  { key: "messages" as const, icon: MessageCircle, href: (lang: string) => `/${lang}/chat` },
  { key: "voucher" as const, icon: Ticket, href: (lang: string) => `/${lang}/profile?tab=redeemedList` },
  { key: "orders" as const, icon: Package, href: (lang: string) => `/${lang}/profile?tab=orders` },
  { key: "favorites" as const, icon: Heart, href: (lang: string) => `/${lang}/profile?tab=wishlist` },
];

const footerActions = [
  { key: "help" as const, icon: HelpCircle },
  { key: "about" as const, icon: Info },
];

export function SideToolbar({ dict }: SideToolbarProps) {
  const params = useParams();
  const lang = (params?.lang as Locale) || "vi";
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="fixed right-2 top-1/2 z-40 hidden w-[68px] -translate-y-1/2 flex-col items-center rounded-[14px] border border-outline-variant bg-surface-container-highest px-1 py-2 shadow-xs md:flex">
      {/* Main Actions */}
      {mainActions.map(({ key, icon: Icon, href }) => (
        <Link
          key={key}
          href={href(lang)}
          title={dict.toolbar[key]}
          className="flex min-h-[46px] w-full flex-col items-center justify-center gap-1 rounded-lg px-1 text-on-surface-variant transition-colors hover:bg-secondary-container hover:text-on-secondary-container focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
        >
          <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
          <span className="max-w-full truncate text-[10px] font-medium leading-none">
            {dict.toolbar[key]}
          </span>
        </Link>
      ))}

      {/* Separator */}
      <div className="my-1 h-px w-10 bg-outline-variant" />

      {/* Footer Actions */}
      {footerActions.map(({ key, icon: Icon }) => (
        <button
          key={key}
          type="button"
          title={dict.toolbar[key]}
          className="flex min-h-[46px] w-full flex-col items-center justify-center gap-1 rounded-lg px-1 text-on-surface-variant transition-colors hover:bg-secondary-container hover:text-on-secondary-container focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
        >
          <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
          <span className="max-w-full truncate text-[10px] font-medium leading-none">
            {dict.toolbar[key]}
          </span>
        </button>
      ))}

      {/* Theme Toggle (Dark/Light) */}
      <ThemeToggle showLabel />

      {/* Scroll to Top - Only shown after scrolling down */}
      {showScrollTop && (
        <button
          type="button"
          title={dict.toolbar.scroll_top}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="animate-in fade-in flex min-h-[46px] w-full flex-col items-center justify-center gap-1 rounded-lg px-1 text-on-surface-variant transition-colors duration-200 hover:bg-secondary-container hover:text-on-secondary-container focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
        >
          <ArrowUp aria-hidden="true" size={21} strokeWidth={1.8} />
          <span className="max-w-full truncate text-[10px] font-medium leading-none">
            {dict.toolbar.scroll_top}
          </span>
        </button>
      )}
    </aside>
  );
}
