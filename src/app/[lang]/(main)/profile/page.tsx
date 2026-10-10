import { Suspense } from "react";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import { ProfileView } from "@/components/profile/ProfileView";
import {
  MOCK_USER_PROFILE,
  MOCK_USER_LISTINGS,
  MOCK_USER_ORDERS,
  MOCK_USER_COLLECTIONS,
  MOCK_USER_REVIEWS,
} from "@/components/profile/profile-data";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === "vi";

  return {
    title: isVi
      ? `${MOCK_USER_PROFILE.username} | Hồ sơ cá nhân - GomGoods`
      : `${MOCK_USER_PROFILE.username} | User Profile - GomGoods`,
    description: isVi
      ? `Xem trang cá nhân của ${MOCK_USER_PROFILE.username}, danh sách sản phẩm pass đồ, bộ sưu tập và đánh giá uy tín trên GomGoods.`
      : `View ${MOCK_USER_PROFILE.username}'s profile, listings, collections, and feedback on GomGoods.`,
  };
}

export default async function ProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const resolvedSearchParams = await searchParams;
  const tab = typeof resolvedSearchParams?.tab === "string" ? resolvedSearchParams.tab : undefined;

  const dict = await getDictionary(lang as Locale);

  return (
    <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-muted-foreground">Đang tải...</div>}>
      <ProfileView
        user={MOCK_USER_PROFILE}
        listings={MOCK_USER_LISTINGS}
        orders={MOCK_USER_ORDERS}
        collections={MOCK_USER_COLLECTIONS}
        reviews={MOCK_USER_REVIEWS}
        dict={dict}
        lang={lang}
        initialTab={tab}
      />
    </Suspense>
  );
}
