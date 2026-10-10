"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Globe,
  MoreHorizontal,
  CheckCircle2,
  ShieldCheck,
  Send,
  MessageSquare,
  AlertOctagon,
  Copy,
  Check,
} from "lucide-react";
import type { ForumPost } from "./forum-data";
import { CommentList } from "./CommentList";
import { ReportPost } from "./ReportPost";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface ForumPostCardProps {
  post: ForumPost;
  onSelectTag?: (tag: string) => void;
  lang?: string;
  dict?: Dictionary;
}

export function ForumPostCard({
  post,
  onSelectTag,
  lang = "vi",
  dict,
}: ForumPostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `${window.location.origin}/${lang}/forum/${post.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Helper for badge color based on category
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "cbgd":
        return "bg-error-container text-error";
      case "pass":
        return "bg-tertiary-container text-on-tertiary-container";
      case "gtt":
        return "bg-secondary-container text-on-secondary-container";
      case "collection":
        return "bg-surface-variant text-primary";
      default:
        return "bg-surface-container-high text-on-surface";
    }
  };

  // Helper for author badge style
  const getAuthorBadge = () => {
    if (!post.author.badge) return null;
    if (post.author.badgeType === "verified") {
      return (
        <span className="bg-primary text-on-primary text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5 shadow-2xs">
          <CheckCircle2 size={10} />
          {post.author.badge}
        </span>
      );
    }
    if (post.author.badgeType === "secondary") {
      return (
        <span className="bg-secondary text-on-secondary text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5 shadow-2xs">
          {post.author.badge}
        </span>
      );
    }
    return (
      <span className="bg-surface-variant text-primary text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-0.5">
        {post.author.badge}
      </span>
    );
  };

  return (
    <article className="bg-surface-container-lowest rounded-2xl card-shadow overflow-hidden border border-outline-variant/70 transition-all hover:border-outline-variant">
      <div className="p-4 sm:p-5">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/80 relative flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="40px"
                unoptimized
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-label-compact text-xs sm:text-sm font-bold text-on-background">
                  {post.author.name}
                </span>
                {getAuthorBadge()}
              </div>
              <span className="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                {post.createdAt} • <Globe size={11} className="opacity-70" />
              </span>
            </div>
          </div>

          {/* More Action Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMoreMenu((prev) => !prev)}
              className="text-on-surface-variant hover:bg-surface-container-low p-1.5 rounded-full transition-colors"
              title="Tuỳ chọn"
            >
              <MoreHorizontal size={18} />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 top-8 w-44 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-20 py-1.5 flex flex-col text-xs">
                <button
                  type="button"
                  onClick={() => {
                    toggleSave();
                    setShowMoreMenu(false);
                  }}
                  className="px-3 py-2 text-left hover:bg-surface-container-low flex items-center gap-2 text-on-surface"
                >
                  <Bookmark
                    size={14}
                    className={isSaved ? "fill-primary text-primary" : ""}
                  />
                  <span>{isSaved ? "Bỏ lưu bài viết" : "Lưu bài viết"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleShare();
                    setShowMoreMenu(false);
                  }}
                  className="px-3 py-2 text-left hover:bg-surface-container-low flex items-center gap-2 text-on-surface"
                >
                  <Copy size={14} />
                  <span>Sao chép liên kết</span>
                </button>
                <div className="w-full h-px bg-outline-variant/50 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    setShowReportModal(true);
                    setShowMoreMenu(false);
                  }}
                  className="px-3 py-2 text-left hover:bg-error-container text-error flex items-center gap-2 font-medium"
                >
                  <AlertOctagon size={14} />
                  <span>Báo cáo bài viết</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Tag Badge */}
        <div className="mb-2.5">
          <span
            className={`inline-block font-label-badge text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide ${getCategoryBadgeClass(
              post.category
            )}`}
          >
            {post.categoryTag}
          </span>
        </div>

        {/* Post Text Content */}
        <div className="mb-3">
          <p className="font-body-md text-xs sm:text-sm text-on-background leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          {/* Price Range (if pass) */}
          {post.priceRange && (
            <p className="font-label-price text-sm sm:text-base font-bold text-primary mt-2 flex items-center gap-1.5">
              <span>{post.priceRange}</span>
              <span className="text-[10px] text-on-surface-variant font-normal">
                (Thương lượng)
              </span>
            </p>
          )}

          {/* Hashtags */}
          {post.hashtags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mt-2.5">
              {post.hashtags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag?.(tag)}
                  className="text-primary text-[11px] font-medium bg-surface-variant/70 hover:bg-surface-variant px-2 py-0.5 rounded-md transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      {post.images.length === 1 && (
        <div className="px-4 sm:px-5 mb-4">
          <div className="aspect-video bg-surface-container rounded-xl overflow-hidden relative border border-outline-variant/40 group">
            <Image
              src={post.images[0]}
              alt="Post image"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              unoptimized
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      )}

      {post.images.length === 2 && (
        <div className="grid grid-cols-2 gap-1.5 px-4 sm:px-5 mb-4">
          <div className="aspect-square bg-surface-container rounded-l-xl overflow-hidden relative border border-outline-variant/40 group">
            <Image
              src={post.images[0]}
              alt="Proof image 1"
              fill
              sizes="(max-width: 768px) 50vw, 350px"
              unoptimized
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div className="aspect-square bg-surface-container rounded-r-xl overflow-hidden relative border border-outline-variant/40 group">
            <Image
              src={post.images[1]}
              alt="Proof image 2"
              fill
              sizes="(max-width: 768px) 50vw, 350px"
              unoptimized
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      )}

      {post.images.length > 2 && (
        <div className="grid grid-cols-3 gap-1.5 px-4 sm:px-5 mb-4">
          {post.images.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="aspect-square bg-surface-container rounded-xl overflow-hidden relative border border-outline-variant/40 group"
            >
              <Image
                src={img}
                alt={`Post gallery ${i}`}
                fill
                sizes="(max-width: 768px) 33vw, 240px"
                unoptimized
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              {i === 2 && post.images.length > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-sm">
                  +{post.images.length - 3}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Interaction Bar */}
      <div className="px-4 sm:px-5 py-3 border-t border-outline-variant/60 flex items-center justify-between bg-surface-container-lowest">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Like */}
          <button
            type="button"
            onClick={toggleLike}
            className={`flex items-center gap-1.5 transition-colors group ${
              isLiked
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <Heart
              size={18}
              className={`transition-transform group-hover:scale-110 ${
                isLiked ? "fill-primary text-primary" : ""
              }`}
            />
            <span className="font-label-compact text-xs">{likesCount}</span>
          </button>

          {/* Comment */}
          <button
            type="button"
            onClick={() => setShowComments((prev) => !prev)}
            className="flex items-center gap-1.5 text-on-surface-variant hover:text-secondary transition-colors group"
          >
            <MessageCircle
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-label-compact text-xs">{commentsCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Action button if pass/resell */}
          {post.category === "pass" && (
            <Link
              href={`/${lang}/chat`}
              className="text-primary border border-primary font-label-compact text-xs px-3 py-1 rounded-full hover:bg-surface-variant transition-colors font-bold mr-1 flex items-center gap-1"
            >
              <Send size={12} />
              <span>{dict?.forum?.message_seller || "Nhắn tin"}</span>
            </Link>
          )}

          {/* Bookmark */}
          <button
            type="button"
            onClick={toggleSave}
            className={`p-1.5 rounded-full transition-colors ${
              isSaved
                ? "text-primary bg-primary/10"
                : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
            }`}
            title="Lưu bài"
          >
            <Bookmark
              size={17}
              className={isSaved ? "fill-primary text-primary" : ""}
            />
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low p-1.5 rounded-full transition-colors relative"
            title="Chia sẻ liên kết"
          >
            {isCopied ? (
              <Check size={17} className="text-emerald-600" />
            ) : (
              <Share2 size={17} />
            )}
          </button>
        </div>
      </div>

      {/* Inline Comments Section */}
      {showComments && (
        <div className="px-4 sm:px-5 pb-4 bg-surface-container-lowest">
          <CommentList
            comments={post.comments}
            onAddComment={() => setCommentsCount((prev) => prev + 1)}
            dict={dict}
          />
        </div>
      )}

      {/* Report Modal */}
      <ReportPost
        postId={post.id}
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        dict={dict}
      />
    </article>
  );
}
