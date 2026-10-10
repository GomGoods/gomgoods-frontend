"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  Eye,
  Trash2,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import {
  MOCK_ADMIN_FORUM_POSTS,
  type AdminForumPost,
} from "../mock-data/forum-mock";

export function ForumDetail({ id }: { id: string }) {
  const [post, setPost] = useState<AdminForumPost>(() => {
    return MOCK_ADMIN_FORUM_POSTS.find((p) => p.id === id) || MOCK_ADMIN_FORUM_POSTS[0];
  });

  const toggleHide = () => {
    setPost((prev) => ({
      ...prev,
      status: prev.status === "hidden" ? "published" : "hidden",
    }));
  };

  const resolveReports = () => {
    setPost((prev) => ({
      ...prev,
      reportsCount: 0,
      reports: prev.reports.map((r) => ({ ...r, status: "resolved" })),
    }));
  };

  const toggleHideComment = (commentId: string) => {
    setPost((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c.id === commentId ? { ...c, isHidden: !c.isHidden } : c
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top back button */}
      <div className="flex items-center gap-3">
        <Link
          href="/vi/admin/forum"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-label-md transition"
        >
          <ArrowLeft size={16} /> Quay lại diễn đàn
        </Link>
        <span className="text-on-surface-variant text-body-sm">
          Mã bài viết: <span className="font-mono text-on-surface">{post.id}</span>
        </span>
      </div>

      {/* Main Header Card */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {post.status === "published" ? (
              <span className="px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-tertiary/15 text-tertiary">
                Hiển thị công khai
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-label-sm font-medium bg-surface-container-high text-on-surface-variant">
                Đã ẩn bởi quản trị viên
              </span>
            )}
            {post.hashtags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded text-label-sm font-medium ${
                  tag === "#CBGD" ? "bg-error-container/40 text-error font-semibold" : "bg-primary-container/40 text-on-primary-container"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-headline-md font-bold text-on-surface mt-2.5">{post.title}</h1>
          <div className="flex items-center gap-4 text-body-sm text-on-surface-variant mt-2">
            <span>Đăng lúc: {new Date(post.createdAt).toLocaleString("vi-VN")}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><ThumbsUp size={14} /> {post.reactionsCount} lượt thích</span>
            <span>•</span>
            <span className="flex items-center gap-1"><MessageSquare size={14} /> {post.commentsCount} bình luận</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 self-end md:self-center">
          {post.reports.length > 0 && post.reports.some((r) => r.status === "pending") && (
            <button
              onClick={resolveReports}
              className="px-4 py-2 rounded-xl text-label-md font-medium bg-tertiary text-on-tertiary hover:opacity-90 transition shadow-sm"
            >
              Giải quyết báo cáo
            </button>
          )}
          <button
            onClick={toggleHide}
            className={`px-4 py-2 rounded-xl text-label-md font-medium transition border ${
              post.status === "hidden"
                ? "bg-tertiary/15 text-tertiary border-tertiary/30 hover:bg-tertiary/25"
                : "bg-error-container/20 text-error border-error-container hover:bg-error-container/40"
            }`}
          >
            {post.status === "hidden" ? "Hiện lại bài viết" : "Ẩn bài viết"}
          </button>
        </div>
      </div>

      {/* Grid: Left 2 Cols (Content + Comments), Right 1 Col (Author & Reports) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Post Content */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Nội dung bài đăng</h2>
            <div className="text-body-md text-on-surface whitespace-pre-line leading-relaxed">
              {post.content}
            </div>

            {post.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-outline-variant/20">
                {post.images.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30">
                    <img src={img} alt="Post attachment" className="w-full h-48 object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comments Moderation */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md font-bold text-on-surface">Danh sách bình luận</h2>
              <span className="text-label-sm text-on-surface-variant">{post.comments.length} bình luận</span>
            </div>

            {post.comments.length === 0 ? (
              <p className="text-body-md text-on-surface-variant py-6 text-center">Chưa có bình luận nào trên bài viết này.</p>
            ) : (
              <div className="space-y-3">
                {post.comments.map((com) => (
                  <div
                    key={com.id}
                    className={`p-4 rounded-xl border transition space-y-2 ${
                      com.isHidden
                        ? "bg-surface-container-low/40 border-dashed border-outline-variant/50 opacity-60"
                        : "bg-surface-container-low/20 border-outline-variant/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={com.authorAvatar} alt={com.author} className="w-7 h-7 rounded-full object-cover" />
                        <span className="font-semibold text-on-surface text-body-sm">{com.author}</span>
                        <span className="text-label-sm text-on-surface-variant">{com.createdAt}</span>
                      </div>
                      <button
                        onClick={() => toggleHideComment(com.id)}
                        className="text-label-sm px-2.5 py-1 rounded-lg border border-outline-variant/40 hover:bg-surface-container text-on-surface transition"
                      >
                        {com.isHidden ? "Bỏ ẩn" : "Ẩn bình luận"}
                      </button>
                    </div>
                    <p className="text-body-md text-on-surface">{com.content}</p>
                    {com.isHidden && (
                      <span className="text-label-sm text-error block">Bình luận này đã bị ẩn với người xem.</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Author & Reports */}
        <div className="space-y-6">
          {/* Author Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <h2 className="text-title-md font-bold text-on-surface">Tác giả bài viết</h2>
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border border-outline-variant/40"
              />
              <div>
                <h3 className="font-bold text-on-surface text-body-lg">{post.author.name}</h3>
                <p className="text-label-sm text-on-surface-variant">@{post.author.username}</p>
              </div>
            </div>
            <Link
              href={`/vi/admin/users/${post.author.id}`}
              className="block text-center w-full py-2 rounded-xl text-label-md font-medium border border-outline-variant/40 bg-surface-container-low hover:bg-surface-container text-on-surface transition"
            >
              Xem hồ sơ tác giả
            </Link>
          </div>

          {/* Reports Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-title-md font-bold text-on-surface">Báo cáo từ cộng đồng</h2>
              <span className={`text-label-sm px-2 py-0.5 rounded-full font-medium ${
                post.reports.length > 0 ? "bg-error-container text-error" : "bg-tertiary/15 text-tertiary"
              }`}>
                {post.reports.length} báo cáo
              </span>
            </div>

            {post.reports.length === 0 ? (
              <p className="text-body-sm text-on-surface-variant">Bài viết không có báo cáo vi phạm.</p>
            ) : (
              <div className="space-y-3">
                {post.reports.map((r) => (
                  <div key={r.id} className="p-3 rounded-xl border border-error-container/40 bg-error-container/10 text-body-sm space-y-1">
                    <p className="font-semibold text-error">{r.reason}</p>
                    <p className="text-label-sm text-on-surface-variant">Báo cáo bởi {r.reporter} • {r.createdAt}</p>
                    <span className="text-label-sm px-2 py-0.5 rounded bg-surface-container-lowest font-medium text-on-surface">
                      {r.status === "pending" ? "Chờ xử lý" : "Đã xử lý"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
