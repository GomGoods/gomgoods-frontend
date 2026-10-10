"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductBentoGalleryProps {
  images: {
    main: string;
    detail1: string;
    detail2: string;
    extraCount?: number;
  };
  title: string;
  badges?: { text: string; variant: "primary" | "secondary" }[];
}

export function ProductBentoGallery({
  images,
  title,
  badges,
}: ProductBentoGalleryProps) {
  const [currentMain, setCurrentMain] = useState(images.main);

  const handleSelectImage = (img: string) => {
    setCurrentMain(img);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 h-[380px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden shadow-sm">
      {/* Large Featured Image (3 cols on md+, 2 rows) */}
      <div className="col-span-4 md:col-span-3 row-span-2 relative bg-surface-container overflow-hidden group">
        <Image
          src={currentMain}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 65vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges on main image */}
        {badges && badges.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {badges.map((b, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider shadow-sm ${
                  b.variant === "primary"
                    ? "bg-primary text-on-primary"
                    : "bg-secondary-container text-on-secondary-container"
                }`}
              >
                {b.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Detail Image 1 (Top right) */}
      <div
        onClick={() => handleSelectImage(images.detail1)}
        className="hidden md:block col-span-1 row-span-1 bg-surface-container relative overflow-hidden group cursor-pointer"
      >
        <Image
          src={images.detail1}
          alt={`${title} Detail 1`}
          fill
          unoptimized
          sizes="20vw"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Detail Image 2 with Overlay (Bottom right) */}
      <div
        onClick={() => handleSelectImage(images.detail2)}
        className="hidden md:block col-span-1 row-span-1 bg-surface-container relative overflow-hidden group cursor-pointer"
      >
        <Image
          src={images.detail2}
          alt={`${title} Detail 2`}
          fill
          unoptimized
          sizes="20vw"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay '+5 ảnh' */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/25 transition-colors">
          <span className="text-white font-bold text-base sm:text-lg tracking-wide drop-shadow-sm">
            +{images.extraCount || 5} ảnh
          </span>
        </div>
      </div>
    </div>
  );
}
