"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs, type ProfileTabKey } from "./ProfileTabs";
import { ProfileGomXuCard } from "./ProfileGomXuCard";
import { ProfileVoucherSection } from "./ProfileVoucherSection";
import { ProfileMyProducts } from "./ProfileMyProducts";
import { ProfileOrdersTab } from "./ProfileOrdersTab";
import { CollectionGrid } from "./CollectionGrid";
import { ReviewList } from "./ReviewList";
import { SettingsForm } from "./SettingsForm";
import { useGomXu } from "@/context/GomXuContext";
import type {
  UserProfile,
  UserListingItem,
  UserOrder,
  CollectionItem,
  ProfileReview,
} from "./profile-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface ProfileViewProps {
  user: UserProfile;
  listings: UserListingItem[];
  orders: UserOrder[];
  collections: CollectionItem[];
  reviews: ProfileReview[];
  dict?: Dictionary;
  lang?: string;
  initialTab?: string;
}

export function ProfileView({
  user,
  listings,
  orders,
  collections,
  reviews,
  dict,
  lang = "vi",
  initialTab,
}: ProfileViewProps) {
  const searchParams = useSearchParams();
  const resolveTab = (tabName?: string | null): ProfileTabKey => {
    if (tabName === "wishlist" || tabName === "collection" || tabName === "favorites") {
      return "collection";
    }
    if (tabName === "redeemedList" || tabName === "vouchers" || tabName === "voucher") {
      return "redeemedList";
    }
    if (tabName && ["overview", "orders", "reviews", "settings", "redeemedList"].includes(tabName)) {
      return tabName as ProfileTabKey;
    }
    return "overview";
  };
  const [activeTab, setActiveTab] = useState<ProfileTabKey>(() =>
    resolveTab(initialTab || searchParams?.get("tab"))
  );
  const [userGomXu, setUserGomXu] = useState(2800);
  const [claimedOrderIds, setClaimedOrderIds] = useState<string[]>([]);
  const { myVouchers } = useGomXu();
  const p = dict?.profile;

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab) {
      setActiveTab(resolveTab(tab));
    }
  }, [searchParams]);

  const handleClaimOrderXu = (orderId: string) => {
    setUserGomXu((prev) => prev + 200);
    setClaimedOrderIds((prev) => (prev.includes(orderId) ? prev : [...prev, orderId]));
  };

  return (
    <div className="w-full pb-16 pt-1 flex flex-col gap-4">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
        <Link
          href={`/${lang}`}
          className="hover:text-primary transition-colors"
        >
          {p?.breadcrumb_home || "Trang chủ"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
        <span className="text-foreground font-semibold">
          {p?.breadcrumb_profile || "Hồ sơ cá nhân"}
        </span>
      </nav>

      {/* 2. Profile Header Card */}
      <ProfileHeader
        user={user}
        dict={dict}
        lang={lang}
        onEditProfile={() => setActiveTab("settings")}
      />

      {/* 3. Navigation Tabs (Sticky) */}
      <ProfileTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        dict={dict}
        badgeCounts={{
          orders: orders.length,
          collection: collections.length,
          reviews: reviews.length,
          redeemed: myVouchers.length,
        }}
      />

      {/* 4. Tab Content Panels */}
      <div className="pt-2">
        {activeTab === "overview" && (
          <div className="flex flex-col gap-5">
            {/* GomXu Balance & Daily Streak */}
            <ProfileGomXuCard
              gomXu={userGomXu}
              setGomXu={setUserGomXu}
              initialGomXu={2800}
              dict={dict}
              onViewAllRedeemed={() => setActiveTab("redeemedList")}
            />

            {/* Products Grid */}
            <ProfileMyProducts
              initialProducts={listings}
              dict={dict}
              lang={lang}
            />
          </div>
        )}

        {activeTab === "redeemedList" && (
          <div className="flex flex-col gap-5">
            <ProfileVoucherSection
              gomXu={userGomXu}
              setGomXu={setUserGomXu}
              dict={dict}
              defaultSubTab="my-vouchers"
            />
          </div>
        )}

        {activeTab === "orders" && (
          <ProfileOrdersTab
            orders={orders}
            dict={dict}
            lang={lang}
            onClaimXu={handleClaimOrderXu}
            claimedOrderIds={claimedOrderIds}
          />
        )}

        {activeTab === "collection" && (
          <CollectionGrid collections={collections} dict={dict} />
        )}

        {activeTab === "reviews" && (
          <ReviewList reviews={reviews} dict={dict} />
        )}

        {activeTab === "settings" && (
          <SettingsForm user={user} dict={dict} />
        )}
      </div>
    </div>
  );
}
