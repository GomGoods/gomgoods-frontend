"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  Eye,
  Hash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  MOCK_ADMIN_FORUM_POSTS,
  FORUM_TAG_OPTIONS,
  type AdminForumPost,
  type ForumPostStatus,
} from "../mock-data/forum-mock";

export function ForumList() {
  const [posts, setPosts] = useState<AdminForumPost[]>(MOCK_ADMIN_FORUM_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<ForumPostStatus | "all">("all");
  const [onlyReported, setOnlyReported] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author.username.toLowerCase().includes(q) ||
          p.author.name.toLowerCase().includes(q)
      );
    }

    if (selectedTag !== "all") {
      result = result.filter((p) => p.hashtags.includes(selectedTag));
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (onlyReported) {
      result = result.filter((p) => p.reportsCount > 0);
    }

    return result;
  }, [posts, searchQuery, selectedTag, statusFilter, onlyReported]);

  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage]);

  const toggleHidePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, status: p.status === "hidden" ? "published" : "hidden" }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-sm font-bold text-on-surface">Quản trị Diễn đàn Fandom</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Kiểm duyệt bài thảo luận, bài cảnh báo scam (#CBGD) và bài giao lưu (#CNGD, #GTT)
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm kiếm bài viết, nội dung, tác giả..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary focus:bg-surface-container-lowest text-body-md text-on-surface transition outline-none"
            />
          </div>

          {/* Hashtag Filter */}
          <div>
            <select
              value={selectedTag}
              onChange={(e) => {
                setSelectedTag(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Hashtag"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả Hashtag</option>
              {FORUM_TAG_OPTIONS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag} {tag === "#CBGD" ? "(Cảnh báo giao dịch)" : tag === "#CNGD" ? "(Cảm ơn giao dịch)" : tag === "#GTT" ? "(Góc tìm tìm)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              aria-label="Trạng thái bài viết"
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-transparent focus:border-primary text-body-md text-on-surface transition outline-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đang hiển thị</option>
              <option value="hidden">Đã ẩn</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tag Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant/20">
          <span className="text-label-sm text-on-surface-variant mr-1">Lọc nhanh:</span>
          {FORUM_TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(selectedTag === tag ? "all" : tag);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-label-sm font-medium transition border ${
                selectedTag === tag
                  ? "bg-primary text-on-primary border-transparent"
                  : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:text-on-surface"
              }`}
            >
              {tag}
            </button>
          ))}
          <button
            onClick={() => {
              setOnlyReported(!onlyReported);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-lg text-label-sm font-medium transition border ml-auto flex items-center gap-1.5 ${
              onlyReported
                ? "bg-error-container text-error border-error-container"
                : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:text-on-surface"
            }`}
          >
            <AlertTriangle size={14} /> Có báo cáo vi phạm
          </button>
        </div>
      </div>

      {/* Forum Post Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-6">Bài viết</th>
                <th className="py-3.5 px-4">Tác giả</th>
                <th className="py-3.5 px-4">Tags</th>
                <th className="py-3.5 px-4 text-center">Tương tác</th>
                <th className="py-3.5 px-4 text-center">Báo cáo</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4">Ngày đăng</th>
                <th className="py-3.5 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-body-md text-on-surface">
              {paginatedPosts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-on-surface-variant">
                    Không tìm thấy bài viết nào phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-container-low/40 transition">
                    {/* Post Content */}
                    <td className="py-4 px-6">
                      <div className="min-w-0 max-w-sm">
                        <Link
                          href={`/vi/admin/forum/${post.id}`}
                          className="font-semibold text-on-surface hover:text-primary transition line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        <p className="text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
                          {post.content}
                        </p>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-body-sm font-medium text-on-surface">
                          @{post.author.username}
                        </span>
                      </div>
                    </td>

                    {/* Hashtags */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {post.hashtags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded text-label-sm font-medium ${
                              tag === "#CBGD"
                                ? "bg-error-container/40 text-error"
                                : tag === "#CNGD"
                                ? "bg-tertiary/15 text-tertiary"
                                : "bg-surface-container-high text-on-surface-variant"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Interactions */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-3 text-body-sm text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <MessageSquare size={14} /> {post.commentsCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={14} /> {post.reactionsCount}
                        </span>
                      </div>
                    </td>

                    {/* Reports count */}
                    <td className="py-4 px-4 text-center">
                      {post.reportsCount > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-bold bg-error-container text-error">
                          <AlertTriangle size={13} /> {post.reportsCount}
                        </span>
                      ) : (
                        <span className="text-label-sm text-on-surface-variant">0</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {post.status === "published" ? (
                        <span className="px-2.5 py-1 rounded-md text-label-sm font-medium bg-tertiary/15 text-tertiary">
                          Hiển thị
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-label-sm font-medium bg-surface-container-high text-on-surface-variant">
                          Đã ẩn
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-body-sm text-on-surface-variant">
                      {post.createdAt.split("T")[0]}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/vi/admin/forum/${post.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium bg-surface-container-low hover:bg-surface-container text-on-surface transition border border-outline-variant/30"
                        >
                          <Eye size={15} /> Chi tiết
                        </Link>
                        <button
                          onClick={() => toggleHidePost(post.id)}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-label-sm font-medium transition border ${
                            post.status === "hidden"
                              ? "bg-tertiary/15 text-tertiary border-tertiary/30 hover:bg-tertiary/25"
                              : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:text-on-surface"
                          }`}
                        >
                          {post.status === "hidden" ? "Hiện" : "Ẩn"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-outline-variant/20 bg-surface-container-low/30">
            <span className="text-body-sm text-on-surface-variant">
              Trang {currentPage} / {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-container-low transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
