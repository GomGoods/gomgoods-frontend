"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Camera, TrendingUp, Sparkles, X } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface SearchBarProps {
  dict: Dictionary;
  lang?: string;
  className?: string;
}

const trendingSearches = [
  "Nendoroid Hatsune Miku",
  "Pokemon TCG Scarlet & Violet",
  "Gấu bông Anya Spy x Family",
  "Card bo góc Blackpink",
  "Manga Jujutsu Kaisen",
  "Gundam RG 1/144",
];

export function SearchBar({ dict, lang = "vi", className = "" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setIsOpen(false);
    router.push(`/${lang}/marketplace?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    handleSearch(item);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="relative w-full flex items-center"
      >
        <Search
          className="absolute left-3.5 text-on-surface-variant pointer-events-none z-10"
          size={18}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Tìm kiếm figure, card Pokemon, manga, album idol, gundam..."
          className="w-full h-10.5 pl-10 pr-16 rounded-full border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 text-body-md transition-all placeholder:text-on-surface-variant/75 outline-none shadow-sm"
        />

        {/* Clear query button if typed */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-10 w-6 h-6 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        )}

        {/* Camera visual search button */}
        <button
          type="button"
          title={dict.search.camera_tooltip}
          className="absolute right-2 w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors cursor-pointer"
        >
          <Camera size={18} />
        </button>
      </form>

      {/* Suggestions Dropdown when focused */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-surface border border-outline-variant/60 rounded-2xl shadow-xl z-50 p-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary px-2 pt-1">
            <TrendingUp size={14} />
            <span>Gợi ý tìm kiếm phổ biến</span>
          </div>
          <div className="flex flex-wrap gap-1.5 px-1 py-1">
            {trendingSearches.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSelect(item)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-xs font-medium text-on-surface transition-colors cursor-pointer"
              >
                <Sparkles size={11} className="opacity-70" />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
