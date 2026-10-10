"use client";

import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProductDescriptionProps {
  description: {
    intro: string;
    bulletsTitle?: string;
    bullets?: string[];
    shippingNote?: string;
    tags?: string[];
  };
  dict: Dictionary;
}

export function ProductDescription({
  description,
  dict,
}: ProductDescriptionProps) {
  return (
    <div className="bg-surface rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/40 flex flex-col gap-4">
      <h2 className="text-lg sm:text-xl font-bold text-on-background">
        {dict.product_detail?.details_title || "Chi tiết sản phẩm"}
      </h2>

      <div className="text-sm sm:text-base text-on-surface-variant space-y-3 leading-relaxed">
        <p>{description.intro}</p>

        {description.bullets && description.bullets.length > 0 && (
          <div>
            {description.bulletsTitle && (
              <p className="font-bold text-on-background mt-2 mb-1.5">
                {description.bulletsTitle}
              </p>
            )}
            <ul className="list-disc pl-5 space-y-1">
              {description.bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {description.shippingNote && (
          <p className="pt-2 text-xs sm:text-sm text-on-surface-variant/90 italic">
            {description.shippingNote}
          </p>
        )}
      </div>

      {/* Hashtag chips */}
      {description.tags && description.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/30">
          {description.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-surface-container-high hover:bg-surface-variant transition-colors rounded-full text-xs font-semibold text-on-surface-variant cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
