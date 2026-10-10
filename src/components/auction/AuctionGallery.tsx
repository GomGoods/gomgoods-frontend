"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2, Check } from "lucide-react";

interface AuctionGalleryProps {
  images: string[];
  title: string;
  editionBadge?: string;
}

export function AuctionGallery({
  images,
  title,
  editionBadge,
}: AuctionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeImage = images[activeIndex] || images[0];

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Main Image Showcase */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-low shadow-md group border border-outline-variant/50">
        <Image
          src={activeImage}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top-right floating actions */}
        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Favorite"
            className="p-2.5 sm:p-3 rounded-full bg-surface/90 backdrop-blur-md text-on-surface hover:text-primary shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite
                  ? "fill-primary text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Share"
            className="p-2.5 sm:p-3 rounded-full bg-surface/90 backdrop-blur-md text-on-surface hover:text-primary shadow-md transition-all active:scale-95 relative cursor-pointer"
          >
            {copied ? (
              <Check className="w-5 h-5 text-emerald-500" />
            ) : (
              <Share2 className="w-5 h-5 text-on-surface-variant hover:text-primary" />
            )}
            {copied && (
              <span className="absolute -left-16 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-semibold rounded-md shadow-sm whitespace-nowrap">
                Đã sao chép!
              </span>
            )}
          </button>
        </div>

        {/* Bottom edition badge */}
        {editionBadge && (
          <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-on-surface text-xs font-semibold shadow-md border border-outline-variant/40">
            {editionBadge}
          </div>
        )}
      </div>

      {/* Thumbnails list */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden bg-surface-container-low transition-all duration-200 cursor-pointer ${
                isActive
                  ? "ring-2 ring-primary ring-offset-2 scale-[1.02] shadow-sm"
                  : "opacity-75 hover:opacity-100 hover:scale-[1.01] border border-outline-variant/40"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumb ${idx + 1}`}
                fill
                unoptimized
                sizes="120px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
