import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";
import type { ChatPartner } from "./types";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface ChatHeaderProps {
  partner: ChatPartner;
  dict: Dictionary;
  lang?: Locale;
  onBack?: () => void;
  onToggleInfo?: () => void;
  isInfoOpen?: boolean;
}

export function ChatHeader({
  partner,
  dict,
  lang = "vi",
  onBack,
  onToggleInfo,
  isInfoOpen,
}: ChatHeaderProps) {
  const initial = partner.name ? partner.name.charAt(0).toUpperCase() : "?";
  const sellerSlug = encodeURIComponent(
    partner.name.toLowerCase().replace(/\s+/g, "-")
  );

  return (
    <div className="h-16 px-3.5 md:px-4 flex items-center justify-between border-b border-outline-variant bg-surface-container-low flex-shrink-0">
      <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
        {/* Mobile back button */}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
            title={dict.chat?.back_to_list || "Back"}
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {/* Avatar */}
        <Link
          href={`/${lang}/seller/${sellerSlug}`}
          className="relative w-10 h-10 flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
          title={dict.chat?.view_profile || "View profile"}
        >
          {partner.avatar ? (
            <Image
              src={partner.avatar}
              alt={partner.name}
              width={40}
              height={40}
              className="w-full h-full rounded-full object-cover border border-outline-variant"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-sm border border-outline-variant">
              {initial}
            </div>
          )}
          <span
            className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface-container-low ${
              partner.isOnline ? "bg-emerald-500" : "bg-outline"
            }`}
          />
        </Link>

        {/* Name & status */}
        <div className="min-w-0">
          <Link
            href={`/${lang}/seller/${sellerSlug}`}
            className="text-sm md:text-base font-bold text-on-surface truncate leading-tight hover:text-primary transition-colors block"
          >
            {partner.name}
          </Link>
          <div className="text-[11px] md:text-xs text-on-surface-variant mt-0.5">
            <span>
              {partner.isOnline
                ? dict.chat?.active_now || "Active now"
                : dict.chat?.offline || "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
        <Link
          href={`/${lang}/seller/${sellerSlug}`}
          className="px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full border border-secondary text-secondary text-xs font-semibold hover:bg-secondary hover:text-on-secondary transition-colors duration-150 active:scale-95 whitespace-nowrap"
        >
          {dict.chat?.view_profile || "Xem hồ sơ"}
        </Link>
        <button
          type="button"
          onClick={onToggleInfo}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
            isInfoOpen
              ? "bg-primary text-primary-foreground"
              : "text-on-surface-variant hover:bg-surface-container"
          }`}
          title="Thông tin cuộc trò chuyện"
          aria-label="Thông tin cuộc trò chuyện"
        >
          <Menu size={19} />
        </button>
      </div>
    </div>
  );
}
