"use client";

import { useState } from "react";
import { Hash, X, Plus, AlertCircle, Sparkles } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface HashtagInputProps {
  hashtags: string[];
  onHashtagsChange: (tags: string[]) => void;
  fandom?: string;
  category?: string;
  dict: Dictionary;
  error?: string;
}

export function HashtagInput({
  hashtags,
  onHashtagsChange,
  fandom,
  dict,
  error,
}: HashtagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const t = dict.sell;

  // Base popular suggestions
  const basePopularTags = [
    "#pass",
    "#passmerch",
    "#chinhhang",
    "#checkdf",
    "#trunggianGomGoods",
    "#fullbox",
  ];

  // Dynamic suggestion based on fandom input
  const fandomTag = fandom?.trim()
    ? `#${fandom.trim().replace(/\s+/g, "")}`
    : null;

  const popularTags = fandomTag && !basePopularTags.includes(fandomTag)
    ? [fandomTag, ...basePopularTags]
    : basePopularTags;

  const addTag = (rawTag: string) => {
    let clean = rawTag.trim();
    if (!clean) return;
    if (!clean.startsWith("#")) {
      clean = `#${clean}`;
    }
    // Remove invalid characters/spaces in tag
    clean = clean.replace(/[\s,]+/g, "");

    if (clean.length > 1 && !hashtags.includes(clean)) {
      onHashtagsChange([...hashtags, clean]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && hashtags.length > 0) {
      onHashtagsChange(hashtags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onHashtagsChange(hashtags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1.5">
          <Hash className="w-4 h-4 text-primary" />
          <span>{t.hashtags_title}</span>
          <span className="text-primary font-bold">*</span>
          <span className="text-[11px] font-normal text-on-surface-variant ml-1">
            (Ít nhất 1 tag)
          </span>
        </label>
        {hashtags.length > 0 && (
          <span className="text-xs text-on-surface-variant font-medium">
            Đã thêm {hashtags.length} tag
          </span>
        )}
      </div>

      {/* Selected tags & input container */}
      <div
        className={`min-h-[46px] p-2 rounded-lg border bg-surface flex flex-wrap items-center gap-2 transition-all ${
          error
            ? "border-error ring-1 ring-error"
            : "border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
        }`}
      >
        {hashtags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="w-3.5 h-3.5 rounded-full hover:bg-primary/20 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) addTag(inputValue);
          }}
          placeholder={hashtags.length === 0 ? t.hashtags_placeholder : "Thêm tag..."}
          className="flex-1 min-w-[140px] text-xs sm:text-sm bg-transparent border-none outline-none p-1 text-on-surface placeholder:text-on-surface-variant/60"
        />
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-error font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Popular suggestions */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] font-medium text-on-surface-variant flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-primary" />
          {t.hashtags_popular}
        </span>
        {popularTags.map((tag) => {
          const isAdded = hashtags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              disabled={isAdded}
              onClick={() => addTag(tag)}
              className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                isAdded
                  ? "bg-surface-container-high text-on-surface-variant/50 line-through cursor-not-allowed"
                  : "bg-surface-container hover:bg-primary/10 hover:text-primary text-on-surface-variant border border-outline-variant/60"
              }`}
            >
              <Plus className="w-2.5 h-2.5" />
              <span>{tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
