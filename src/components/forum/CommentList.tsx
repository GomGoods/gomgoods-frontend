"use client";

import { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";
import { CommentItem } from "./CommentItem";
import type { ForumComment } from "./forum-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface CommentListProps {
  comments: ForumComment[];
  onAddComment?: (content: string) => void;
  dict?: Dictionary;
}

export function CommentList({
  comments: initialComments,
  onAddComment,
  dict,
}: CommentListProps) {
  const [comments, setComments] = useState<ForumComment[]>(initialComments);
  const [inputVal, setInputVal] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newComment: ForumComment = {
      id: `c-${Date.now()}`,
      author: {
        name: "Bạn (User)",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        badge: "Thành viên",
      },
      content: inputVal.trim(),
      createdAt: "Vừa xong",
      likes: 0,
    };

    setComments((prev) => [...prev, newComment]);
    onAddComment?.(inputVal.trim());
    setInputVal("");
  };

  const handleReply = (authorName: string) => {
    setInputVal(`@${authorName} `);
  };

  return (
    <div className="pt-3 border-t border-outline-variant/60 flex flex-col gap-3">
      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto pr-1">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs text-on-surface-variant text-center py-2 italic">
          Chưa có bình luận nào. Hãy là người đầu tiên để lại ý kiến!
        </p>
      )}

      {/* Input Box */}
      <form onSubmit={handleSend} className="flex items-center gap-2 mt-1">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/60 flex-shrink-0 relative hidden sm:block">
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
            alt="My avatar"
            fill
            sizes="32px"
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="relative flex-1">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={dict?.forum?.write_comment || "Viết bình luận của bạn..."}
            className="w-full h-9 pl-3.5 pr-10 rounded-full border border-outline-variant bg-surface text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center disabled:opacity-40 hover:bg-primary-container transition-all active:scale-90"
          >
            <Send size={13} />
          </button>
        </div>
      </form>
    </div>
  );
}
