"use client";

import { useState } from "react";
import { AuctionGallery } from "./AuctionGallery";
import { AuctionInfo } from "./AuctionInfo";
import { AuctionStatus } from "./AuctionStatus";
import { BidForm } from "./BidForm";
import { BidHistory } from "./BidHistory";
import type { AuctionDetailItem, BidHistoryItem } from "./auction-data";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface AuctionDetailViewProps {
  item: AuctionDetailItem;
  dict: Dictionary;
  lang?: string;
}

export function AuctionDetailView({
  item,
  dict,
  lang = "vi",
}: AuctionDetailViewProps) {
  const [currentPrice, setCurrentPrice] = useState(item.currentPrice);
  const [history, setHistory] = useState<BidHistoryItem[]>(item.bidHistory);
  const [status, setStatus] = useState<"live" | "upcoming" | "ended">(item.status);

  const handlePlaceBid = (amount: number) => {
    if (status === "ended" || amount <= currentPrice) return false;

    setCurrentPrice(amount);

    const newBid: BidHistoryItem = {
      id: `bid-${Date.now()}`,
      bidderName: "Bạn (Collector)",
      avatarText: "Bạn",
      amount,
      timeAgo: "Vừa xong",
      isYou: true,
    };

    setHistory((prev) => [newBid, ...prev]);
    return true;
  };

  const currentWinner = history.length > 0 ? history[0].bidderName : undefined;

  return (
    <div className="w-full pb-12 pt-2">
      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Images & Product / Seller Info (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <AuctionGallery
            images={item.images}
            title={item.title}
            editionBadge={item.editionBadge}
          />

          <AuctionInfo
            description={item.description}
            attributes={item.attributes}
            seller={item.seller}
            dict={dict}
            lang={lang}
          />
        </div>

        {/* Right Column: Bidding Action & History (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
          {/* Main Action Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-sm flex flex-col gap-6 relative overflow-hidden">
            {/* Background accent glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            {/* Status, Countdown & Price */}
            <AuctionStatus
              code={item.code}
              title={item.title}
              status={status}
              currentPrice={currentPrice}
              startingPrice={item.startingPrice}
              minIncrement={item.minIncrement}
              initialTimeLeftSeconds={item.timeLeftSeconds}
              dict={dict}
              lang={lang}
              onTimeUp={() => setStatus("ended")}
            />

            {/* Bid Form */}
            <BidForm
              currentPrice={currentPrice}
              minIncrement={item.minIncrement}
              onPlaceBid={handlePlaceBid}
              dict={dict}
              isEnded={status === "ended"}
              winnerName={currentWinner}
            />
          </div>

          {/* Bid History */}
          <BidHistory history={history} dict={dict} />
        </div>
      </div>
    </div>
  );
}
