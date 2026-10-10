"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, MessageCircle, PackageCheck, Tag } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface NotificationMenuProps {
  dict: Dictionary;
}

const notifications = [
  {
    id: "order",
    icon: PackageCheck,
    title: "Đơn hàng đang được giao",
    description: "Đơn #GG2408 đã được bàn giao cho đơn vị vận chuyển.",
    time: "5 phút trước",
  },
  {
    id: "voucher",
    icon: Tag,
    title: "Bạn có voucher mới",
    description: "Giảm 30.000đ cho đơn từ 299.000đ, dùng đến hết hôm nay.",
    time: "2 giờ trước",
  },
  {
    id: "message",
    icon: MessageCircle,
    title: "Tin nhắn từ OtakuShop VN",
    description: "Shop đã phản hồi câu hỏi về sản phẩm bạn đang quan tâm.",
    time: "Hôm qua",
  },
];

export function NotificationMenu({ dict }: NotificationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadIds, setUnreadIds] = useState(() => new Set(["order", "voucher"]));
  const menuRef = useRef<HTMLDivElement>(null);
  const hasUnread = unreadIds.size > 0;

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const markAsRead = (id: string) => {
    setUnreadIds((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        title={dict.header.notifications}
        aria-label={dict.header.notifications}
        aria-expanded={isOpen}
        aria-controls="header-notification-panel"
        onClick={() => setIsOpen((open) => !open)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors duration-150 hover:bg-surface-container-low active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Bell aria-hidden="true" size={20} strokeWidth={1.8} />
        {hasUnread && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-coral ring-2 ring-surface" />
        )}
      </button>

      {isOpen && (
        <div
          id="header-notification-panel"
          role="dialog"
          aria-label={dict.header.notifications}
          className="animate-in fade-in slide-in-from-top-2 absolute right-0 top-[calc(100%+10px)] z-50 w-[min(340px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_18px_48px_rgba(20,24,40,0.16)] duration-150"
        >
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3.5">
            <div>
              <h2 className="text-sm font-bold text-foreground">Thông báo</h2>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {hasUnread ? `${unreadIds.size} thông báo chưa đọc` : "Bạn đã xem tất cả"}
              </p>
            </div>
            {hasUnread && (
              <button
                type="button"
                onClick={() => setUnreadIds(new Set())}
                className="text-[11px] font-semibold text-brand-coral transition-colors hover:text-brand-coral-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Đánh dấu đã đọc
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto p-1.5">
            {notifications.map(({ id, icon: Icon, title, description, time }) => {
              const isUnread = unreadIds.has(id);

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => markAsRead(id)}
                  className="group flex w-full gap-3 rounded-xl px-2.5 py-3 text-left transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                    <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-xs font-bold leading-5 text-foreground">
                        {title}
                      </span>
                      {isUnread && (
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-coral" />
                      )}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                      {description}
                    </span>
                    <span className="mt-1.5 block text-[10px] font-medium text-muted-foreground/80">
                      {time}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="w-full border-t border-border/60 px-4 py-3 text-center text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
          >
            Xem tất cả thông báo
          </button>
        </div>
      )}
    </div>
  );
}
