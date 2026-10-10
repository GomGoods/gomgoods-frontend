"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Pin,
  Send,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import type { SellerFeedPost, SellerProfileData } from "./seller-data";

interface SellerFeedTabProps {
  seller: SellerProfileData;
}

export function SellerFeedTab({ seller }: SellerFeedTabProps) {
  const [posts, setPosts] = useState<SellerFeedPost[]>(seller.feedPosts || []);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [localComments, setLocalComments] = useState<
    Record<string, { author: string; text: string; timeAgo: string }[]>
  >({
    "feed-1": [
      {
        author: "WibuLord99",
        text: "Đã cọc bé Miku 15th rồi shop ơi, hóng đơn giao hỏa tốc trong ngày!",
        timeAgo: "1 giờ trước",
      },
      {
        author: "OtakuHaven (Chủ shop)",
        text: "Cảm ơn bạn nhiều nhé, đơn của bạn shop đã bọc 3 lớp chống sốc và bàn giao bên vận chuyển rồi ạ! ❤️",
        timeAgo: "45 phút trước",
      },
    ],
  });

  const handleToggleLike = (postId: string) => {
    const isCurrentlyLiked = !!likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isCurrentlyLiked }));
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likesCount: isCurrentlyLiked ? p.likesCount - 1 : p.likesCount + 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) return;

    setLocalComments((prev) => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        {
          author: "Bạn",
          text,
          timeAgo: "Vừa xong",
        },
      ],
    }));

    // Increment count
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p
      )
    );

    // Clear input
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-5">
      {/* Feed Posts List */}
      <div className="flex flex-col gap-5">
        {posts.map((post) => {
          const isLiked = !!likedPosts[post.id];
          const postComments = localComments[post.id] || [];

          return (
            <article
              key={post.id}
              className="bg-surface rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-xs flex flex-col gap-4 transition-shadow hover:shadow-sm"
            >
              {/* Header: Author + Time + Tag + Pinned */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-400/80 p-0.5 bg-surface flex-shrink-0">
                    <Image
                      src={seller.avatar}
                      alt={seller.name}
                      fill
                      unoptimized
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-sm text-on-background">
                        {seller.name}
                      </span>
                      {seller.isStore ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-primary/10 text-primary rounded">
                          Store
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-400/20 text-amber-600 dark:text-amber-400 rounded">
                          Pro
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      {post.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.tag && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-surface-container-high text-primary border border-outline-variant/30">
                      {post.tag}
                    </span>
                  )}
                  {post.isPinned && (
                    <span
                      title="Bài viết được ghim"
                      className="p-1 rounded-full bg-primary/10 text-primary"
                    >
                      <Pin className="w-3.5 h-3.5 fill-current" />
                    </span>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="text-sm text-on-surface leading-relaxed whitespace-pre-line">
                {post.content}
              </div>

              {/* Photos Gallery */}
              {post.images && post.images.length > 0 && (
                <div
                  className={`grid gap-2 sm:gap-2.5 rounded-xl overflow-hidden ${
                    post.images.length === 1
                      ? "grid-cols-1 max-h-[380px]"
                      : post.images.length === 2
                      ? "grid-cols-2 max-h-[260px]"
                      : "grid-cols-3 max-h-[220px]"
                  }`}
                >
                  {post.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-full h-44 sm:h-56 bg-surface-container-low overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={img}
                        alt={`Ảnh đính kèm ${idx + 1}`}
                        fill
                        unoptimized
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Interactions Bar: Like / Comment / Share */}
              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs sm:text-sm text-on-surface-variant font-semibold">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full transition-colors cursor-pointer active:scale-95 ${
                      isLiked
                        ? "text-primary bg-primary/10 font-bold"
                        : "hover:bg-surface-container hover:text-on-background"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-primary text-primary" : ""
                      }`}
                    />
                    <span>{post.likesCount} Thích</span>
                  </button>

                  {/* Comments count */}
                  <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-full hover:bg-surface-container hover:text-on-background cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentsCount} Bình luận</span>
                  </div>
                </div>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={() => alert("Đã sao chép liên kết bài viết bảng tin!")}
                  className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-full hover:bg-surface-container hover:text-on-background transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Chia sẻ</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="flex flex-col gap-2.5 pt-2 bg-surface-container-low/50 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-4 sm:p-5 rounded-b-2xl border-t border-outline-variant/20">
                {postComments.map((comment, cIdx) => (
                  <div
                    key={cIdx}
                    className="flex flex-col gap-0.5 bg-surface p-2.5 sm:p-3 rounded-xl border border-outline-variant/30 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-background">
                        {comment.author}
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        {comment.timeAgo}
                      </span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                ))}

                {/* Comment Input */}
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(post.id);
                      }
                    }}
                    placeholder="Bình luận hoặc hỏi shop về bài viết này..."
                    className="flex-1 bg-surface h-9 px-3.5 rounded-xl border border-outline-variant/50 text-xs text-on-background placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(post.id)}
                    className="h-9 px-3.5 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center gap-1 hover:bg-primary/90 transition-colors cursor-pointer active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
