"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Minus,
  Send,
  Sparkles,
  HelpCircle,
  RotateCcw,
  ShieldCheck,
  Package,
  Gavel,
  Coins,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

const QUICK_TOPICS = [
  {
    icon: Package,
    label: "Tra cứu đơn hàng",
    prompt: "Làm sao để tôi kiểm tra tình trạng vận chuyển của đơn hàng?",
    reply:
      "Để kiểm tra đơn hàng, bạn vào mục 'Đơn hàng' trên thanh điều hướng hoặc trang cá nhân. Tại đó, bạn có thể xem mã vận đơn, tiến trình giao hàng theo thời gian thực và nhận GomXu khi đơn hoàn tất! 📦",
  },
  {
    icon: Gavel,
    label: "Quy trình đấu giá",
    prompt: "Quy định tham gia đấu giá và cọc như thế nào?",
    reply:
      "Các phiên đấu giá tại GomGoods yêu cầu bước giá tối thiểu và cọc bảo đảm để tránh bid ảo. Sau khi thắng phiên, bạn có 24h để hoàn tất thanh toán. Tiền cọc sẽ được hoàn trả 100% nếu bạn không thắng phiên! 🔨",
  },
  {
    icon: Coins,
    label: "Nạp & dùng GomXu",
    prompt: "GomXu dùng để làm gì và kiếm thêm bằng cách nào?",
    reply:
      "GomXu dùng để đổi voucher giảm giá, vé tham gia sự kiện Fandom và trừ thẳng vào đơn hàng. Bạn có thể kiếm GomXu bằng cách: điểm danh hàng ngày, hoàn tất đơn hàng (+200 xu) hoặc đăng bán sản phẩm! ✨",
  },
  {
    icon: ShieldCheck,
    label: "Chính sách bảo vệ",
    prompt: "Chính sách bảo vệ người mua và xử lý khiếu nại?",
    reply:
      "GomGoods bảo đảm 100% giao dịch: tiền người mua được giữ an toàn tại hệ thống cho đến khi bạn nhận đúng hàng và bấm xác nhận. Nếu hàng lỗi/giả, bạn có thể yêu cầu trả hàng - hoàn tiền ngay lập tức! 🛡️",
  },
  {
    icon: MessageSquare,
    label: "Gặp tư vấn viên",
    prompt: "Tôi muốn kết nối với nhân viên hỗ trợ trực tiếp.",
    reply:
      "Chuyên viên chăm sóc khách hàng GomGoods đã nhận được yêu cầu của bạn. Nhân viên tư vấn sẽ phản hồi trong giây lát! Bạn vui lòng để lại chi tiết vấn đề nhé. 👩‍💼",
  },
];

export function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Xin chào! 👋 Mình là Hỗ trợ viên GomGoods. Mình có thể hỗ trợ gì cho bạn hôm nay?",
      time: "Vừa xong",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chipsContainerRef = useRef<HTMLDivElement>(null);

  const scrollChips = (direction: "left" | "right") => {
    if (chipsContainerRef.current) {
      chipsContainerRef.current.scrollBy({
        left: direction === "left" ? -140 : 140,
        behavior: "smooth",
      });
    }
  };

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Auto dismiss tooltip after 10s if not clicked
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: content,
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsTyping(true);

    // Find smart reply or generic reply
    setTimeout(() => {
      let replyText =
        "Cảm ơn bạn đã liên hệ! GomGoods Support đã ghi nhận thông tin. Đội ngũ hỗ trợ sẽ kiểm tra và phản hồi giải pháp tối ưu cho bạn ngay bây giờ nhé! ✨";

      const matchedTopic = QUICK_TOPICS.find(
        (t) =>
          content.toLowerCase().includes(t.label.toLowerCase()) ||
          t.prompt.toLowerCase() === content.toLowerCase()
      );

      if (matchedTopic) {
        replyText = matchedTopic.reply;
      } else if (
        content.toLowerCase().includes("đơn hàng") ||
        content.toLowerCase().includes("vận chuyển") ||
        content.toLowerCase().includes("ship")
      ) {
        replyText =
          "Để kiểm tra đơn hàng hoặc theo dõi vận chuyển, bạn hãy vào mục 'Đơn hàng' trong tài khoản để cập nhật mã vận đơn và tình trạng giao hàng mới nhất nhé! 📦";
      } else if (
        content.toLowerCase().includes("đấu giá") ||
        content.toLowerCase().includes("bid") ||
        content.toLowerCase().includes("cọc")
      ) {
        replyText =
          "Về phiên đấu giá: Bạn có thể đặt giá hợp lệ theo bước giá quy định. Khi trúng đấu giá, bạn có 24 giờ để thanh toán trước khi đơn được giao đến bạn! 🔨";
      } else if (
        content.toLowerCase().includes("xu") ||
        content.toLowerCase().includes("gomxu")
      ) {
        replyText =
          "GomXu có thể tích lũy qua điểm danh hàng ngày hoặc nhận 200 GomXu mỗi khi bạn hoàn thành nhận hàng. GomXu được dùng để giảm giá trực tiếp cho đơn tiếp theo! 🪙";
      } else if (
        content.toLowerCase().includes("lừa đảo") ||
        content.toLowerCase().includes("khiếu nại") ||
        content.toLowerCase().includes("tố cáo")
      ) {
        replyText =
          "GomGoods có cơ chế bảo vệ giao dịch và nút 'Tố cáo' tại trang thông tin người bán. Ban Quản Trị sẽ phong tỏa tiền thanh toán nếu có tranh chấp và hoàn 100% nếu phát hiện gian lận! 🛡️";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        time: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 850);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Xin chào! 👋 Mình là Hỗ trợ viên GomGoods. Mình có thể hỗ trợ gì cho bạn hôm nay?",
        time: "Vừa xong",
      },
    ]);
  };

  return (
    <>
      {/* 1. Floating Support Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Cửa sổ hỗ trợ trực tuyến GomGoods"
          className="fixed bottom-24 right-4 sm:right-18 md:right-20 z-50 w-[350px] sm:w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-7rem)] bg-card border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary via-primary-container to-secondary p-3.5 sm:p-4 text-white flex items-center justify-between shadow-xs shrink-0 select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/20 border-2 border-white/40 shrink-0 shadow-xs">
                <Image
                  src="/Support_img.png"
                  alt="GomGoods Support"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight truncate">
                    GomGoods Supporter
                  </h3>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
                <p className="text-[11px] text-white/85 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Trực tuyến 24/7 • Phản hồi ngay</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                type="button"
                onClick={handleResetChat}
                title="Làm mới cuộc trò chuyện"
                className="w-7 h-7 rounded-lg hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Thu nhỏ"
                className="w-7 h-7 rounded-lg hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Đóng chat"
                className="w-7 h-7 rounded-lg hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-muted/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-end gap-1.5 max-w-[85%]">
                  {msg.sender === "bot" && (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-primary/20 shrink-0 border border-primary/30 mb-0.5">
                      <Image
                        src="/Support_img.png"
                        alt="Bot"
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-xs font-medium"
                        : "bg-card text-foreground border border-border/80 rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground/75 mt-0.5 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs py-1">
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-primary/20 shrink-0 border border-primary/30">
                  <Image
                    src="/Support_img.png"
                    alt="Bot"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <div className="bg-card border border-border/80 rounded-2xl rounded-bl-xs px-3 py-2 flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions / Chips */}
          <div className="px-3 pt-2 pb-1.5 bg-card border-t border-border/60">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-primary" />
                <span>Chủ đề thường gặp</span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollChips("left")}
                  className="w-5 h-5 rounded-full bg-surface-container-high hover:bg-primary/20 text-on-surface hover:text-primary flex items-center justify-center transition-colors cursor-pointer border border-outline-variant/60 active:scale-90"
                  title="Cuộn sang trái"
                  aria-label="Cuộn sang trái"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollChips("right")}
                  className="w-5 h-5 rounded-full bg-surface-container-high hover:bg-primary/20 text-on-surface hover:text-primary flex items-center justify-center transition-colors cursor-pointer border border-outline-variant/60 active:scale-90"
                  title="Cuộn sang phải"
                  aria-label="Cuộn sang phải"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div
              ref={chipsContainerRef}
              className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide scroll-smooth"
            >
              {QUICK_TOPICS.map((topic, i) => {
                const IconComponent = topic.icon;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendMessage(topic.prompt)}
                    className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-container-high hover:bg-primary/10 hover:text-primary hover:border-primary/40 border border-outline-variant text-on-surface transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <IconComponent className="w-3 h-3 text-primary" />
                    <span>{topic.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 sm:p-3 bg-card border-t border-border flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập câu hỏi cần hỗ trợ..."
              className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-3.5 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
              title="Gửi tin nhắn"
            >
              <Send className="w-4 h-4 -translate-x-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* 2. Floating Supporter Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5">
        {/* Helper Speech Bubble Tooltip */}
        {!isOpen && showTooltip && (
          <div className="hidden sm:flex items-center gap-2 bg-card border border-border text-foreground px-3.5 py-2 rounded-2xl shadow-xl animate-in fade-in slide-in-from-right-3 duration-300">
            <span className="text-xs font-semibold">
              Cần hỗ trợ? Chat với chúng mình nhé!
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-muted-foreground hover:text-foreground text-xs p-0.5 cursor-pointer"
              title="Đóng gợi ý"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Supporter Avatar Floating Icon */}
        <button
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowTooltip(false);
          }}
          aria-label="Mở khung chat hỗ trợ GomGoods"
          className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-primary/10 border-2 border-primary shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
          title="Hỗ trợ trực tuyến GomGoods"
        >
          {/* Supporter Image */}
          <div className="relative w-full h-full">
            <Image
              src="/Support_img.png"
              alt="GomGoods Supporter"
              fill
              sizes="64px"
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Active Status Badge */}
          <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900" />
          </span>

          {/* Open state badge overlay when chat is active */}
          {isOpen && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white">
              <X className="w-6 h-6 stroke-[2.5]" />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
