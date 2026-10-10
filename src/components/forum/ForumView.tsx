"use client";

import { useState } from "react";
import { ForumSidebarLeft } from "./ForumSidebarLeft";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { ForumFeed } from "./ForumFeed";
import { ForumSidebarRight } from "./ForumSidebarRight";
import { CreatePost } from "./CreatePost";
import {
  initialPosts,
  type ForumCategory,
  type ForumPost,
} from "./forum-data";
import type { FilterTab } from "./ForumFilter";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ForumViewProps {
  dict?: Dictionary;
  lang?: string;
}

export function ForumView({ dict, lang = "vi" }: ForumViewProps) {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] =
    useState<ForumCategory>("all");
  const [activeTab, setActiveTab] = useState<FilterTab>("latest");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Handle Category selection from left sidebar
  const handleSelectCategory = (category: ForumCategory) => {
    setSelectedCategory(category);
    setSelectedTag(null);
    if (category === "cbgd") setActiveTab("cbgd");
    else if (category === "pass") setActiveTab("pass");
    else if (category === "all") setActiveTab("latest");
  };

  // Handle Tab Change from center feed
  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    if (tab === "cbgd") setSelectedCategory("cbgd");
    else if (tab === "pass") setSelectedCategory("pass");
    else if (tab === "latest" || tab === "hot" || tab === "safe" || tab === "review") {
      setSelectedCategory("all");
    }
  };

  // Handle Tag click
  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleClearTag = () => {
    setSelectedTag(null);
  };

  // Handle New Post Creation
  const handleCreatePost = (newPost: ForumPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Filtered posts logic
  const filteredPosts = posts.filter((post) => {
    // 1. Tag filter
    if (selectedTag) {
      const matchTag = post.hashtags.some((t) =>
        t.toLowerCase().includes(selectedTag.toLowerCase())
      );
      if (!matchTag) return false;
    }

    // 2. Category filter
    if (selectedCategory !== "all" && post.category !== selectedCategory) {
      return false;
    }

    // 3. Tab filter
    if (activeTab === "hot") return post.isHot;
    if (activeTab === "safe") return post.isSafe;
    if (activeTab === "cbgd") return post.category === "cbgd";
    if (activeTab === "pass") return post.category === "pass";

    return true;
  });

  return (
    <RequireAuth pageName="Diễn đàn">
    <div className="w-full flex flex-col md:flex-row gap-6 relative">
      {/* Left Column: Topics & Community Corner */}
      <ForumSidebarLeft
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        dict={dict}
      />

      {/* Center Column: Feed */}
      <ForumFeed
        posts={filteredPosts}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        selectedTag={selectedTag}
        onClearTag={handleClearTag}
        onSelectTag={handleSelectTag}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        lang={lang}
        dict={dict}
      />

      {/* Right Column: Trending & Leaderboard */}
      <ForumSidebarRight
        onSearchTag={handleSelectTag}
        dict={dict}
      />

      {/* Create Post Modal */}
      <CreatePost
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
        dict={dict}
      />
    </div>
    </RequireAuth>
  );
}
