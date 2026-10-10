import Image from "next/image";
import type { Conversation } from "./types";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
}: ConversationItemProps) {
  const { partner, lastMessage, lastMessageTime, unreadCount } = conversation;
  const initial = partner.name ? partner.name.charAt(0).toUpperCase() : "?";

  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors duration-150 select-none ${
        isActive
          ? "bg-surface-container border-l-4 border-primary hover:bg-surface-container-high"
          : "border-b border-outline-variant hover:bg-surface-container-low"
      }`}
    >
      {/* Avatar with online status */}
      <div className="relative w-12 h-12 flex-shrink-0">
        {partner.avatar ? (
          <Image
            src={partner.avatar}
            alt={partner.name}
            width={48}
            height={48}
            className="w-full h-full rounded-full object-cover border border-outline-variant"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-base border border-outline-variant">
            {initial}
          </div>
        )}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
            isActive ? "border-surface-container" : "border-surface-container-lowest"
          } ${partner.isOnline ? "bg-emerald-500" : "bg-outline"}`}
          title={partner.isOnline ? "Online" : "Offline"}
        />
      </div>

      {/* Info & snippet */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <span
            className={`text-sm truncate ${
              unreadCount > 0 ? "font-bold text-on-surface" : "font-semibold text-on-surface"
            }`}
          >
            {partner.name}
          </span>
          <span
            className={`text-[11px] flex-shrink-0 ml-1 ${
              unreadCount > 0
                ? "text-primary font-bold"
                : "text-on-surface-variant font-medium"
            }`}
          >
            {lastMessageTime}
          </span>
        </div>
        <p
          className={`text-xs truncate ${
            unreadCount > 0
              ? "text-on-surface font-semibold"
              : "text-on-surface-variant"
          }`}
        >
          {lastMessage}
        </p>
      </div>

      {/* Unread badge */}
      {unreadCount > 0 && (
        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-on-primary text-[11px] font-bold flex-shrink-0 shadow-sm animate-in zoom-in-75 duration-200">
          {unreadCount > 9 ? "9+" : unreadCount}
        </div>
      )}
    </div>
  );
}
