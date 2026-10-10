"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Gavel,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import { useAuthModal } from "@/components/auth/AuthModalContext";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/dictionaries";

/** Routes that require authentication */
const protectedRoutes = new Set(["/campaign", "/forum"]);

const navItems = [
  { key: "home" as const, icon: Home, href: "/" },
  { key: "explore" as const, icon: Compass, href: "/marketplace" },
  { key: "auction" as const, icon: Gavel, href: "/auction" },
  { key: "campaign" as const, icon: Megaphone, href: "/campaign" },
  { key: "forum" as const, icon: MessageSquare, href: "/forum" },
];

interface MainNavProps {
  dict: Dictionary;
  lang: Locale;
}

export function MainNav({ dict, lang }: MainNavProps) {
  const pathname = usePathname();
  const { isLoggedIn, openModal } = useAuthModal();

  return (
    <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
      {navItems.map(({ key, icon: Icon, href }) => {
        const localizedHref = `/${lang}${href === "/" ? "" : href}`;
        const isActive =
          href === "/"
            ? pathname === `/${lang}` || pathname === `/${lang}/`
            : pathname.startsWith(`/${lang}${href}`);
        const isProtected = protectedRoutes.has(href);
        const needsAuth = isProtected && !isLoggedIn;

        // If route is protected and user is not logged in, intercept click
        if (needsAuth) {
          return (
            <button
              key={key}
              type="button"
              onClick={() => openModal("login")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors duration-150 cursor-pointer text-on-surface-variant hover:text-primary hover:bg-surface-container-low`}
            >
              <Icon size={16} strokeWidth={2} />
              <span>{dict.nav[key]}</span>
            </button>
          );
        }

        return (
          <Link
            key={key}
            href={localizedHref}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors duration-150 ${
              isActive
                ? "text-primary bg-primary-fixed/30 font-bold"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
            }`}
          >
            <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
            <span>{dict.nav[key]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
