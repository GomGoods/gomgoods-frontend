"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Reply } from "lucide-react";
import type { ForumComment } from "./forum-data";

interface CommentItemProps {
  comment: ForumComment;
  onReply?: (authorName: string) => void;
}

export function CommentItem({ comment, onReply }: CommentItemProps) {
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex items-start gap-3 text-xs group">
      <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/60 flex-shrink-0 relative">
        <Image
          src={comment.author.avatar}
          alt={comment.author.name}
          fill
          sizes="32px"
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-surface-container-low rounded-2xl px-3.5 py-2.5 inline-block max-w-full">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-on-background text-xs">
              {comment.author.name}
            </span>
            {comment.author.badge && (
              <span className="bg-primary/10 text-primary text-[9px] px-1.5 py-0.5 rounded font-bold">
                {comment.author.badge}
              </span>
            )}
            <span className="text-[10px] text-on-surface-variant/70">
              {comment.createdAt}
            </span>
          </div>
          <p className="text-on-surface text-xs leading-relaxed break-words whitespace-pre-line">
            {comment.content}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-1 ml-2 text-[11px] text-on-surface-variant">
          <button
            type="button"
            onClick={toggleLike}
            className={`flex items-center gap-1 hover:text-primary transition-colors ${
              isLiked ? "text-primary font-bold" : ""
            }`}
          >
            <Heart
              size={12}
              className={isLiked ? "fill-primary text-primary" : ""}
            />
            <span>{likes > 0 ? likes : "Thích"}</span>
          </button>
          <button
            type="button"
            onClick={() => onReply?.(comment.author.name)}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Reply size={12} />
            <span>Trả lời</span>
          </button>
        </div>
      </div>
    </div>
  );
}
