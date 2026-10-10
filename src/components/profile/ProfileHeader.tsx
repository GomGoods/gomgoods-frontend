"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  ThumbsUp,
  MapPin,
  Calendar,
  MessageCircle,
  UserCheck,
  UserPlus,
  PlusCircle,
  Camera,
  Share2,
  Star,
  Handshake,
  Users,
} from "lucide-react";
import type { UserProfile } from "./profile-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProfileHeaderProps {
  user: UserProfile;
  dict?: Dictionary;
  lang?: string;
  onEditProfile?: () => void;
}

export function ProfileHeader({
  user,
  dict,
  lang = "vi",
  onEditProfile,
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1200);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }
  };

  const p = dict?.profile;

  return (
    <section className="bg-card border border-border rounded-xl p-5 sm:p-6 shadow-xs relative transition-all">
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
        {/* Avatar */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border shadow-xs relative bg-muted">
            <Image
              src={user.avatar}
              alt={user.username}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80px, 96px"
              priority
            />
          </div>
          {/* Avatar edit camera trigger */}
          <button
            type="button"
            onClick={onEditProfile}
            title="Đổi ảnh đại diện"
            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              {user.username}
            </h1>

            {/* Badges & Rating */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border border-brand-yellow/40 bg-brand-yellow/10 text-foreground">
                <Star className="w-3 h-3 fill-brand-yellow text-brand-yellow" />
                <span>{user.stats.sellerReputation || 5.0}/5 Uy tín</span>
              </span>
              {user.isProSeller ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border border-border bg-muted/60 text-foreground">
                  <BadgeCheck className="w-3 h-3 text-primary" />
                  {p?.badge_pro_seller || "Pro Seller"}
                </span>
              ) : user.isReputableBuyer ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border border-border bg-muted/60 text-foreground">
                  <ThumbsUp className="w-3 h-3 text-brand-green" />
                  {p?.badge_reputable_buyer || "Uy tín"}
                </span>
              ) : null}
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-3 max-w-2xl leading-relaxed">
            {user.bio}
          </p>

          {/* Meta Details & Stats - Single compact row */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground/70" />
              {user.location}
            </span>
            <span>•</span>
            <span>{p?.joined_prefix || "Tham gia"} {user.joinedDate}</span>
            <span>•</span>
            <span className="text-foreground font-medium">
              <strong>{user.stats.completedDeals}</strong> đơn thành công
            </span>
            <span>•</span>
            <span className="text-foreground font-medium">
              <strong>{followersCount >= 1000 ? `${(followersCount / 1000).toFixed(1)}k` : followersCount}</strong> người theo dõi
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full sm:w-auto flex sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0">
          <button
            type="button"
            onClick={handleFollowToggle}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-xs active:scale-95 cursor-pointer ${
              isFollowing
                ? "bg-muted text-foreground hover:bg-muted/80 border border-border"
                : "bg-primary text-primary-foreground hover:bg-brand-blue-hover"
            }`}
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-4 h-4" />
                {p?.btn_following || "Đang theo dõi"}
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                {p?.btn_follow || "Theo dõi"}
              </>
            )}
          </button>

          <Link
            href={`/${lang}/chat`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm border border-border bg-background hover:bg-muted text-foreground transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-primary" />
            {p?.btn_chat || "Nhắn tin"}
          </Link>
        </div>
      </div>
    </section>
  );
}
