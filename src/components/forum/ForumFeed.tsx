"use client";

import { Plus, X, Search, Sparkles } from "lucide-react";
import { ForumFilter, type FilterTab } from "./ForumFilter";
import { ForumPostCard } from "./ForumPostCard";
import type { ForumPost, ForumCategory } from "./forum-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ForumFeedProps {
  posts: ForumPost[];
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  selectedTag: string | null;
  onClearTag: () => void;
  onSelectTag: (tag: string) => void;
  onOpenCreateModal: () => void;
  lang?: string;
  dict?: Dictionary;
}

export function ForumFeed({
  posts,
  activeTab,
  onTabChange,
  selectedTag,
  onClearTag,
  onSelectTag,
  onOpenCreateModal,
  lang = "vi",
  dict,
}: ForumFeedProps) {
  return (
    <div className="flex-1 order-1 md:order-2 flex flex-col gap-4 min-w-0">
      {/* Post Composer Header */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 card-shadow border border-outline-variant/60 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-lg sm:text-xl md:text-2xl font-black text-on-background tracking-tight">
            {dict?.forum?.title || "Cộng đồng Fandom"}
          </h1>
          <p className="font-body-sm text-xs text-on-surface-variant hidden sm:block mt-0.5">
            {dict?.forum?.subtitle ||
              "Nơi chia sẻ đam mê, kinh nghiệm mua bán và cảnh báo rủi ro."}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="bg-primary text-on-primary font-label-compact text-xs sm:text-sm py-2 px-3.5 sm:px-5 rounded-full font-bold flex items-center gap-1.5 hover:bg-primary-container transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <Plus size={16} />
          <span>{dict?.forum?.create_post || "Đăng bài mới"}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <ForumFilter
        activeTab={activeTab}
        onTabChange={onTabChange}
        dict={dict}
      />

      {/* Active tag banner if filtered */}
      {selectedTag && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-primary font-semibold">
            <span>Đang lọc theo:</span>
            <span className="bg-primary text-on-primary px-2 py-0.5 rounded-full text-[11px] font-bold">
              {selectedTag}
            </span>
          </div>
          <button
            type="button"
            onClick={onClearTag}
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-[11px]"
          >
            <X size={13} />
            <span>Xóa lọc</span>
          </button>
        </div>
      )}

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <ForumPostCard
              key={post.id}
              post={post}
              onSelectTag={onSelectTag}
              lang={lang}
              dict={dict}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl p-10 card-shadow border border-outline-variant/60 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
            <Search size={22} />
          </div>
          <h3 className="font-bold text-sm text-on-background">
            {dict?.forum?.empty_feed || "Chưa có bài viết nào trong mục này"}
          </h3>
          <p className="text-xs text-on-surface-variant max-w-sm">
            {dict?.forum?.empty_feed_desc ||
              "Hãy là người đầu tiên đăng bài hoặc chọn chủ đề khác nhé!"}
          </p>
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="mt-2 text-xs bg-primary text-on-primary font-bold px-4 py-2 rounded-xl hover:bg-primary-container transition-all"
          >
            Đăng bài ngay
          </button>
        </div>
      )}
    </div>
  );
}
