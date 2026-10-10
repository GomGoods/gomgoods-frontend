"use client";

import {
  AlertTriangle,
  BadgePercent,
  Tag,
  Sparkles,
  Users,
  ShieldCheck,
  Hash,
} from "lucide-react";
import type { ForumCategory, ForumTopic } from "./forum-data";
import { sampleTopics } from "./forum-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ForumSidebarLeftProps {
  selectedCategory: ForumCategory;
  onSelectCategory: (category: ForumCategory) => void;
  dict?: Dictionary;
}

export function ForumSidebarLeft({
  selectedCategory,
  onSelectCategory,
  dict,
}: ForumSidebarLeftProps) {
  const getTopicIcon = (type: ForumTopic["iconType"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle size={18} className="text-error" />;
      case "price":
        return <BadgePercent size={18} className="text-secondary" />;
      case "tag":
        return <Tag size={18} className="text-tertiary" />;
      case "collection":
        return <Sparkles size={18} className="text-primary" />;
      default:
        return <Hash size={18} className="text-primary" />;
    }
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 order-2 md:order-1 hidden md:flex flex-col gap-5 sticky top-20 h-max">
      {/* Hot Topics Box */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 card-shadow border border-outline-variant/60">
        <div className="flex items-center justify-between border-b border-surface-variant pb-3 mb-3">
          <h2 className="font-title-md text-base font-bold text-on-surface flex items-center gap-2">
            <Hash size={18} className="text-primary" />
            <span>{dict?.forum?.hot_topics || "Chủ Đề Hot"}</span>
          </h2>
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
            }`}
          >
            {dict?.forum?.filter_all || "Tất cả"}
          </button>
        </div>

        <ul className="flex flex-col gap-1.5">
          {sampleTopics.map((topic) => {
            const isActive = selectedCategory === topic.category;
            return (
              <li key={topic.tag}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(topic.category)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all group ${
                    isActive
                      ? "bg-surface-container ring-1 ring-primary/40 shadow-sm"
                      : "hover:bg-surface-container-low"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0 transition-transform group-hover:scale-105 ${topic.iconBg}`}
                  >
                    {getTopicIcon(topic.iconType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-label-compact text-xs font-bold transition-colors truncate ${
                          isActive
                            ? "text-primary"
                            : "text-on-background group-hover:text-primary"
                        }`}
                      >
                        {topic.tag}
                      </span>
                      <span className="text-[10px] text-on-surface-variant/70 font-mono">
                        {topic.postCount}
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] text-on-surface-variant line-clamp-1 block">
                      {topic.name}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Community Corner Box */}
      <div className="bg-surface-container-highest/80 backdrop-blur-sm rounded-2xl p-5 card-shadow border border-outline-variant/60 text-center flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
          <Users size={24} />
        </div>
        <div>
          <h3 className="font-title-md text-sm font-bold text-on-background mb-1">
            {dict?.forum?.community_corner || "Góc Cộng Đồng"}
          </h3>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            {dict?.forum?.subtitle ||
              "Nơi chia sẻ đam mê, kinh nghiệm mua bán và cảnh báo rủi ro."}
          </p>
        </div>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary text-on-primary text-xs py-2.5 px-4 rounded-xl font-bold hover:bg-primary-container transition-all shadow-sm active:scale-95 text-center flex items-center justify-center gap-1.5"
        >
          <Users size={14} />
          <span>{dict?.forum?.join_group || "Tham gia Group"}</span>
        </a>

        <div className="w-full pt-3 border-t border-outline-variant/40 flex items-center justify-center gap-1.5 text-[11px] text-on-surface-variant">
          <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0" />
          <span>Bảo vệ quyền lợi thành viên 100%</span>
        </div>
      </div>
    </aside>
  );
}
