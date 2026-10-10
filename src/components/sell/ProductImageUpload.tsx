"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X, Star, UploadCloud, AlertCircle } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProductImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  dict: Dictionary;
  error?: string;
}

export function ProductImageUpload({
  images,
  onImagesChange,
  dict,
  error,
}: ProductImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const t = dict.sell;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    const remainingSlots = 10 - images.length;
    if (remainingSlots <= 0) {
      setUploadError(t.max_files_exceeded);
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    const newImageUrls: string[] = [];

    filesToProcess.forEach((file) => {
      // Create local object URLs for instant preview
      const url = URL.createObjectURL(file);
      newImageUrls.push(url);
    });

    onImagesChange([...images, ...newImageUrls]);

    if (files.length > remainingSlots) {
      setUploadError(t.max_files_exceeded);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (indexToRemove: number) => {
    onImagesChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <ImagePlus className="w-4 h-4" />
          </div>
          <span>{t.images_title}</span>
          <span className="text-xs font-normal text-on-surface-variant">
            ({images.length}/10)
          </span>
        </h2>
        {images.length > 0 && (
          <span className="text-xs text-primary font-medium">
            * {t.cover_badge}: ảnh đầu tiên
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerBrowse}
        className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[150px] ${
          isDragging
            ? "border-primary bg-primary/10 scale-[0.99]"
            : "border-outline-variant bg-surface hover:border-primary hover:bg-surface-container-low"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-surface-container-highest text-primary flex items-center justify-center mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-sm md:text-base font-semibold text-on-surface mb-1">
          {t.drag_drop_title}
        </p>
        <p className="text-xs text-on-surface-variant">{t.drag_drop_desc}</p>
      </div>

      {/* Error Notices */}
      {(uploadError || error) && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-error font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError || error}</span>
        </div>
      )}

      {/* Previews Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-4">
          {images.map((imgUrl, index) => (
            <div
              key={imgUrl + index}
              className="group relative aspect-square rounded-lg overflow-hidden border border-outline-variant bg-surface-container shadow-xs hover:shadow-md transition-all"
            >
              <Image
                src={imgUrl}
                alt={`Upload preview ${index + 1}`}
                fill
                unoptimized
                className="object-cover"
              />

              {/* Cover Badge */}
              {index === 0 && (
                <div className="absolute top-1.5 left-1.5 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{t.cover_badge}</span>
                </div>
              )}

              {/* Remove Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-error text-white rounded-full flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Xóa ảnh"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Add more button */}
          {images.length < 10 && (
            <button
              type="button"
              onClick={triggerBrowse}
              className="aspect-square rounded-lg border-2 border-dashed border-outline-variant hover:border-primary hover:bg-surface-container-low flex flex-col items-center justify-center gap-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <ImagePlus className="w-5 h-5" />
              <span className="text-[11px] font-medium">+ Thêm</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
