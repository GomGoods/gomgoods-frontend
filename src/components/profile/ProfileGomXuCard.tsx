"use client";

import { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { Check, Calendar, Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { useGomXu } from "@/context/GomXuContext";

export function getGomXuImage(amount?: number): string {
  return "/GomXu.png";
}

const STREAK_REWARDS = [10, 10, 20, 30, 40, 50, 100];

interface StreakData {
  lastClaimDate: string | null;
  streak: number; // 0 to 7
}

interface ProfileGomXuCardProps {
  gomXu?: number;
  setGomXu?: React.Dispatch<React.SetStateAction<number>>;
  initialGomXu?: number;
  dict?: Dictionary;
  onViewAllRedeemed?: () => void;
}

export function ProfileGomXuCard({
  gomXu: externalGomXu,
  setGomXu: externalSetGomXu,
  dict,
  onViewAllRedeemed,
}: ProfileGomXuCardProps) {
  const { gomXu: contextGomXu, addGomXu } = useGomXu();
  const gomXu = externalGomXu !== undefined ? externalGomXu : contextGomXu;

  const [streakData, setStreakData] = useState<StreakData>({
    lastClaimDate: null,
    streak: 0,
  });
  const [mounted, setMounted] = useState(false);
  const [claimNotification, setClaimNotification] = useState<string | null>(null);

  // Helper: format date to YYYY-MM-DD
  const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const getYesterdayStr = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("gomxu-streak-data");
      if (saved) {
        const parsed: StreakData = JSON.parse(saved);
        const today = getTodayStr();
        const yesterday = getYesterdayStr();

        if (parsed.lastClaimDate === today) {
          // Already claimed today
          setStreakData(parsed);
        } else if (parsed.lastClaimDate === yesterday) {
          // Missed no days, streak intact
          setStreakData(parsed);
        } else {
          // Missed more than 1 day -> reset streak to 0
          setStreakData({ lastClaimDate: parsed.lastClaimDate, streak: 0 });
        }
      }
    } catch {
      // ignore JSON errors
    }
  }, []);

  const todayStr = mounted ? getTodayStr() : "";
  const isClaimedToday = mounted && streakData.lastClaimDate === todayStr;

  // Active day index to claim (0 to 6)
  // If claimed today: streak days have been claimed, so active index is (streak - 1)
  // If not claimed today: next day to claim is streak (if streak === 7, resets to 0)
  const currentDayIndex = isClaimedToday
    ? Math.max(0, streakData.streak - 1)
    : streakData.streak % 7;

  const nextReward = STREAK_REWARDS[currentDayIndex];

  const handleClaim = () => {
    if (isClaimedToday || !mounted) return;

    const newStreak = (streakData.streak % 7) + 1;
    const reward = STREAK_REWARDS[streakData.streak % 7];
    const today = getTodayStr();

    const newData: StreakData = {
      lastClaimDate: today,
      streak: newStreak,
    };

    setStreakData(newData);
    localStorage.setItem("gomxu-streak-data", JSON.stringify(newData));
    addGomXu(reward, `Điểm danh ngày ${newStreak}`);
    if (externalSetGomXu) {
      externalSetGomXu((prev) => prev + reward);
    }

    setClaimNotification(`Điểm danh thành công! Bạn nhận được +${reward} GomXu`);
    setTimeout(() => {
      setClaimNotification(null);
    }, 3500);
  };

  return (
    <section className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-4 relative">
      {/* Toast Notification */}
      {claimNotification && (
        <div className="bg-brand-green text-white px-3.5 py-2.5 rounded-lg shadow-sm flex items-center justify-between gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <Image
              src="/GomXu.png"
              alt="GomXu"
              width={18}
              height={18}
              className="object-contain"
            />
            <span>{claimNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setClaimNotification(null)}
            className="text-white/80 hover:text-white text-xs underline cursor-pointer"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Top Header: Compact Balance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center">
            <Image
              src="/GomXu.png"
              alt="GomXu"
              width={52}
              height={52}
              unoptimized
              className="object-contain drop-shadow-sm"
              priority
            />
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {gomXu.toLocaleString("vi-VN")}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                GomXu khả dụng
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Ví tích lũy xu thưởng của bạn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-foreground font-medium border border-border">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            Tổng nhận 260 xu/tuần
          </span>

          {onViewAllRedeemed && (
            <button
              type="button"
              onClick={onViewAllRedeemed}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all active:scale-95 shadow-2xs cursor-pointer"
            >
              <span>Đến đổi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Daily Streak Section - Integrated & Compact (no nested card) */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-blue" />
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              Điểm danh nhận xu mỗi ngày
            </h3>
          </div>
          <span className="text-xs text-muted-foreground">
            {streakData.streak > 0 ? (
              <>
                Chuỗi hiện tại: <strong className="text-brand-coral font-bold">{streakData.streak} ngày</strong> liên tiếp
              </>
            ) : (
              "Duy trì điểm danh 7 ngày để nhận thưởng lớn!"
            )}
          </span>
        </div>

        {/* 7 Mốc nhận GomXu nhỏ gọn, nối tiếp bởi mũi tên -> */}
        <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-1.5 md:gap-2 py-2 overflow-x-auto no-scrollbar w-full">
          {STREAK_REWARDS.map((reward, index) => {
            const isCompleted = isClaimedToday
              ? index < streakData.streak
              : index < streakData.streak % 7;
            const isToday = isClaimedToday
              ? index === streakData.streak - 1
              : index === streakData.streak % 7;
            const isDay7 = index === 6;
            const isReadyToClaim = isToday && !isClaimedToday;

            return (
              <Fragment key={index}>
                {/* Khung mốc nhỏ gọn */}
                <div
                  onClick={isReadyToClaim ? handleClaim : undefined}
                  className={`flex-1 min-w-[44px] max-w-[85px] sm:max-w-[100px] md:max-w-[110px] relative flex flex-col items-center justify-between py-2 px-1 sm:py-2.5 sm:px-1.5 rounded-xl border transition-all duration-200 text-center select-none ${
                    isReadyToClaim
                      ? "bg-amber-500/10 dark:bg-amber-500/15 border-amber-400 dark:border-amber-500 shadow-md ring-2 ring-amber-400/30 scale-[1.03] z-10 cursor-pointer hover:bg-amber-500/20"
                      : isCompleted
                      ? "bg-brand-green/10 dark:bg-brand-green/15 border-brand-green/30"
                      : isDay7
                      ? "bg-amber-500/5 dark:bg-amber-500/10 border-amber-300/40 dark:border-amber-700/40"
                      : "bg-muted/30 hover:bg-muted/50 border-border/70"
                  }`}
                >
                  {/* Tên mốc / ngày */}
                  <span
                    className={`text-[10px] sm:text-[11px] md:text-xs font-bold leading-tight ${
                      isReadyToClaim
                        ? "text-amber-600 dark:text-amber-400 font-black"
                        : isCompleted
                        ? "text-brand-green font-semibold"
                        : isDay7
                        ? "text-amber-600 dark:text-amber-400 font-bold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {isDay7 ? "Ngày 7 🎉" : `Ngày ${index + 1}`}
                  </span>

                  {/* Hình ảnh GomXu to rõ, chiếm trọng tâm khung */}
                  <div className="relative my-1 sm:my-1.5 flex items-center justify-center">
                    <Image
                      src="/GomXu.png"
                      alt={`GomXu ${reward}`}
                      width={64}
                      height={64}
                      unoptimized
                      className={`object-contain transition-transform duration-200 ${
                        isDay7
                          ? "w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 drop-shadow-md hover:scale-105"
                          : "w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 drop-shadow-sm"
                      } ${
                        isReadyToClaim
                          ? "animate-bounce-slow scale-110 drop-shadow-md"
                          : isCompleted
                          ? "opacity-95"
                          : "opacity-85"
                      }`}
                    />

                    {/* Dấu tích đã nhận hoàn thành */}
                    {isCompleted && (
                      <div className="absolute -bottom-1 -right-1 bg-brand-green text-white rounded-full p-0.5 sm:p-1 shadow-xs">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                      </div>
                    )}

                    {/* Badge 'Nhận' khi đến lượt hôm nay */}
                    {isReadyToClaim && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                        Nhận
                      </span>
                    )}
                  </div>

                  {/* Mức thưởng xu */}
                  <div className="flex items-center gap-0.5 leading-none">
                    <span
                      className={`text-[11px] sm:text-xs md:text-sm font-black ${
                        isReadyToClaim
                          ? "text-amber-600 dark:text-amber-400"
                          : isCompleted
                          ? "text-brand-green"
                          : isDay7
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-foreground"
                      }`}
                    >
                      +{reward}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold">xu</span>
                  </div>
                </div>

                {/* Mũi tên -> kết nối giữa các khung */}
                {index < STREAK_REWARDS.length - 1 && (
                  <ArrowRight
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0 transition-colors ${
                      isCompleted
                        ? "text-brand-green/70"
                        : "text-muted-foreground/35"
                    }`}
                  />
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Compact Action Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/60">
          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            Tự động reset lúc 00:00 hằng ngày
          </span>
          <button
            type="button"
            onClick={handleClaim}
            disabled={isClaimedToday || !mounted}
            className={`w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${isClaimedToday
                ? "bg-muted border border-border text-muted-foreground cursor-not-allowed"
                : "bg-brand-coral hover:bg-brand-coral-hover text-white active:scale-95 shadow-xs"
              }`}
          >
            {isClaimedToday ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-green stroke-[3]" />
                <span>Đã điểm danh hôm nay ({streakData.streak} ngày liên tiếp)</span>
              </>
            ) : (
              <>
                <Image
                  src="/GomXu.png"
                  alt="GomXu"
                  width={15}
                  height={15}
                  className="object-contain"
                />
                <span>Điểm danh nhận +{nextReward} GomXu</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
