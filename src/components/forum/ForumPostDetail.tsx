"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { ForumPostCard } from "./ForumPostCard";
import { ForumSidebarRight } from "./ForumSidebarRight";
import { initialPosts, type ForumPost } from "./forum-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ForumPostDetailProps {
  postId: string;
  dict?: Dictionary;
  lang?: string;
}

export function ForumPostDetail({
  postId,
  dict,
  lang = "vi",
}: ForumPostDetailProps) {
  const post =
    initialPosts.find((p) => p.id === postId) || initialPosts[0];

  return (
    <RequireAuth pageName="Diễn đàn">
    <div className="flex flex-col gap-5 max-w-5xl mx-auto">
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant">
          <Link href={`/${lang}`} className="hover:text-primary transition-colors">
            {dict?.nav?.home || "Trang chủ"}
          </Link>
          <ChevronRight size={13} />
          <Link href={`/${lang}/forum`} className="hover:text-primary transition-colors">
            {dict?.nav?.forum || "Diễn đàn"}
          </Link>
          <ChevronRight size={13} />
          <span className="text-on-background font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">
            {post.categoryTag}
          </span>
        </nav>

        <Link
          href={`/${lang}/forum`}
          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Quay lại diễn đàn</span>
        </Link>
      </div>

      {/* Main post layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <ForumPostCard post={post} lang={lang} dict={dict} />
        </div>
        <div className="w-full lg:w-72">
          <ForumSidebarRight dict={dict} />
        </div>
      </div>
    </div>
    </RequireAuth>
  );
}
