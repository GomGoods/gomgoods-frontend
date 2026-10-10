import { Search, ShieldCheck } from "lucide-react";
import type { Conversation } from "./types";
import { ConversationItem } from "./ConversationItem";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  dict: Dictionary;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  dict,
}: ConversationListProps) {
  return (
    <div className="w-full md:w-80 lg:w-96 flex flex-col bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex-shrink-0 h-full">
      {/* Header & Search */}
      <div className="p-3.5 border-b border-outline-variant bg-surface-container-low flex-shrink-0">
        <h2 className="text-base font-bold text-on-surface tracking-tight">
          {dict.chat?.title || "Messages"}
        </h2>
        <div className="mt-2.5 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={dict.chat?.search_placeholder || "Tìm kiếm đoạn chat..."}
            type="text"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface border border-outline-variant text-xs md:text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>

        {/* Compact Safety Tips under Search Bar */}
        <div
          className="mt-2 px-2.5 py-1.5 rounded-lg bg-surface border border-outline-variant/60 flex items-center gap-1.5 text-[11px] text-on-surface-variant overflow-hidden relative select-none"
          title="Mẹo an toàn: Giao dịch qua GomGoods để nhận dịch vụ tốt nhất & bảo hiểm đơn hàng 100%"
        >
          <ShieldCheck size={14} className="text-primary shrink-0 z-10 bg-surface pr-0.5" />
          <div className="overflow-hidden relative flex-1 whitespace-nowrap">
            <div className="animate-marquee-pingpong hover:[animation-play-state:paused] cursor-default">
              <strong className="text-on-surface font-semibold">Mẹo an toàn:</strong> Giao dịch qua GomGoods để nhận dịch vụ tốt nhất &amp; bảo hiểm an toàn 100%
            </div>
          </div>
          {/* Subtle fade gradient at right edge */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-surface to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Conversations Scroll Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/40">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant text-xs md:text-sm">
            {dict.chat?.no_conversations || "No conversations found."}
          </div>
        ) : (
          conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={conv.id === selectedId}
              onSelect={() => onSelect(conv.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
