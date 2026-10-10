"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { initialConversations } from "./chat-mock-data";
import type { Conversation, ChatMessage } from "./types";
import { ConversationList } from "./ConversationList";
import { ChatHeader } from "./ChatHeader";
import { ProductContextBar } from "./ProductContextBar";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatSidebar } from "./ChatSidebar";
import { getProductDetailById } from "@/components/product/product-detail-data";

interface ChatWorkspaceProps {
  dict: Dictionary;
  lang: Locale;
}

export function ChatWorkspace({ dict, lang }: ChatWorkspaceProps) {
  const searchParams = useSearchParams();
  const paramProductId = searchParams?.get("productId");
  const paramSeller = searchParams?.get("seller");
  const paramId = searchParams?.get("id");

  // Ensure browser window starts at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // Initialize conversations directly with product from URL params if present
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (!paramProductId) return initialConversations;
    try {
      const prod = getProductDetailById(paramProductId);
      const newConvId = `conv-prod-${paramProductId}`;

      const newConv: Conversation = {
        id: newConvId,
        partner: {
          id: `seller-${prod.seller.name.toLowerCase().replace(/\s+/g, "-")}`,
          name: prod.seller.name,
          avatar: prod.seller.avatar,
          isOnline: prod.seller.isOnline ?? true,
          role: "Người bán",
        },
        lastMessage: `Quan tâm đến sản phẩm "${prod.title}"`,
        lastMessageTime: "Vừa xong",
        unreadCount: 0,
        product: {
          id: String(prod.id),
          title: prod.title,
          price: prod.price,
          image: prod.images.main,
          condition: prod.specs.condition,
          url: `/${lang}/product/${prod.id}`,
        },
        sellerProfile: {
          name: prod.seller.name,
          avatar: prod.seller.avatar,
          rating: prod.seller.rating || 4.9,
          reviewCount: prod.seller.soldCount || 120,
          joinedYear: prod.seller.memberSince || "2023",
          responseRate: "98%",
          salesCount: `${prod.seller.soldCount || 50}+`,
          isVerified: prod.seller.isGoldSeller ?? true,
        },
        messages: [
          {
            id: `msg-${Date.now()}-sys`,
            sender: "system",
            text: `Bạn đã bắt đầu cuộc trò chuyện với ${prod.seller.name} về sản phẩm này.`,
            timestamp: "Vừa xong",
          },
          {
            id: `msg-${Date.now()}-first`,
            sender: "me",
            text: `Chào shop! Mình quan tâm đến "${prod.title}" (${prod.price}). Sản phẩm này còn sẵn hàng không shop?`,
            timestamp: "Vừa xong",
          },
          {
            id: `msg-${Date.now()}-reply`,
            sender: "partner",
            text: `Chào bạn! Sản phẩm "${prod.title}" bên mình vẫn còn sẵn hàng nha. Hàng chuẩn chính hãng đúng như hình ảnh và mô tả. Bạn cần tư vấn thêm hay muốn đặt hàng ngay cứ nhắn mình nhé!`,
            timestamp: "Vừa xong",
          },
        ],
      };

      return [newConv, ...initialConversations];
    } catch {
      return initialConversations;
    }
  });

  const [selectedId, setSelectedId] = useState<string>(() => {
    if (paramProductId) {
      return `conv-prod-${paramProductId}`;
    }
    if (paramId) {
      return paramId;
    }
    return initialConversations[0]?.id || "";
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("chat");
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);

  // Handle URL change (productId, seller, id)
  useEffect(() => {
    if (paramProductId) {
      const convId = `conv-prod-${paramProductId}`;
      try {
        const prod = getProductDetailById(paramProductId);
        const timeNow = "Vừa xong";

        const newConv: Conversation = {
          id: convId,
          partner: {
            id: `seller-${prod.seller.name.toLowerCase().replace(/\s+/g, "-")}`,
            name: prod.seller.name,
            avatar: prod.seller.avatar,
            isOnline: prod.seller.isOnline ?? true,
            role: "Người bán",
          },
          lastMessage: `Quan tâm đến sản phẩm "${prod.title}"`,
          lastMessageTime: timeNow,
          unreadCount: 0,
          product: {
            id: String(prod.id),
            title: prod.title,
            price: prod.price,
            image: prod.images.main,
            condition: prod.specs.condition,
            url: `/${lang}/product/${prod.id}`,
          },
          sellerProfile: {
            name: prod.seller.name,
            avatar: prod.seller.avatar,
            rating: prod.seller.rating || 4.9,
            reviewCount: prod.seller.soldCount || 120,
            joinedYear: prod.seller.memberSince || "2023",
            responseRate: "98%",
            salesCount: `${prod.seller.soldCount || 50}+`,
            isVerified: prod.seller.isGoldSeller ?? true,
          },
          messages: [
            {
              id: `msg-${Date.now()}-sys`,
              sender: "system",
              text: `Bạn đã bắt đầu cuộc trò chuyện với ${prod.seller.name} về sản phẩm này.`,
              timestamp: timeNow,
            },
            {
              id: `msg-${Date.now()}-first`,
              sender: "me",
              text: `Chào shop! Mình quan tâm đến "${prod.title}" (${prod.price}). Sản phẩm này còn sẵn hàng không shop?`,
              timestamp: timeNow,
            },
            {
              id: `msg-${Date.now()}-reply`,
              sender: "partner",
              text: `Chào bạn! Sản phẩm "${prod.title}" bên mình vẫn còn sẵn hàng nha. Hàng chuẩn chính hãng đúng như hình ảnh và mô tả. Bạn cần tư vấn thêm hay muốn đặt hàng ngay cứ nhắn mình nhé!`,
              timestamp: timeNow,
            },
          ],
        };

        setConversations((prev) => {
          if (prev.some((c) => c.id === convId)) return prev;
          return [newConv, ...prev];
        });
      } catch (err) {
        console.error("Error creating chat conversation:", err);
      }

      setSelectedId(convId);
      setMobileView("chat");
    } else if (paramSeller) {
      const decoded = decodeURIComponent(paramSeller).toLowerCase();
      const match = conversations.find(
        (c) =>
          c.partner.name.toLowerCase() === decoded ||
          c.sellerProfile?.name.toLowerCase() === decoded
      );
      if (match) {
        setSelectedId(match.id);
        setMobileView("chat");
      }
    } else if (paramId) {
      if (conversations.some((c) => c.id === paramId)) {
        setSelectedId(paramId);
        setMobileView("chat");
      }
    }
  }, [paramProductId, paramSeller, paramId, lang]);

  // Filtered conversations based on search
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter(
      (c) =>
        c.partner.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q) ||
        c.product?.title.toLowerCase().includes(q)
    );
  }, [conversations, searchQuery]);

  // Selected conversation
  const activeConversation = useMemo(() => {
    return (
      conversations.find((c) => c.id === selectedId) || conversations[0]
    );
  }, [conversations, selectedId]);

  // Handle select conversation
  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    setMobileView("chat");

    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Handle sending a new message
  const handleSendMessage = (text: string, imageUrl?: string) => {
    if (!activeConversation) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: text || undefined,
      imageUrl: imageUrl || undefined,
      timestamp: timeStr,
    };

    const targetConvId = activeConversation.id;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === targetConvId) {
          return {
            ...conv,
            lastMessage: text || (imageUrl ? "[Hình ảnh]" : ""),
            lastMessageTime: timeStr,
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
    );

    // Auto simulated seller response after 1.2s to make the chat feel responsive and alive
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const replies = [
        "Dạ vâng shop nhận được tin nhắn rồi ạ! Món này bên mình bọc bubble wrap kỹ càng khi gửi bạn yên tâm nhé.",
        "Cảm ơn bạn! Nếu bạn muốn chốt đơn thì có thể bấm nút 'Mua ngay' trên thanh thông tin sản phẩm phía trên nha.",
        "Dạ đúng rồi ạ, hàng chuẩn chính hãng 100%, bạn có cần shop gửi thêm ảnh chi tiết không?",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        sender: "partner",
        text: randomReply,
        timestamp: replyTime,
      };

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === targetConvId) {
            return {
              ...conv,
              lastMessage: randomReply,
              lastMessageTime: replyTime,
              messages: [...conv.messages, replyMsg],
            };
          }
          return conv;
        })
      );
    }, 1200);
  };

  return (
    <div className="w-full flex h-[calc(100vh-140px)] min-h-[580px] max-h-[850px] gap-3 md:gap-4 overflow-hidden">
      {/* 1. Left Column: Conversation List */}
      <div
        className={`${
          mobileView === "list" ? "flex flex-1" : "hidden"
        } md:flex md:flex-initial h-full`}
      >
        <ConversationList
          conversations={filteredConversations}
          selectedId={activeConversation?.id || ""}
          onSelect={handleSelectConversation}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dict={dict}
        />
      </div>

      {/* 2. Center Column: Active Chat Thread */}
      {activeConversation ? (
        <div
          className={`${
            mobileView === "chat" ? "flex" : "hidden"
          } md:flex flex-1 flex-col bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden h-full`}
        >
          {/* Header */}
          <ChatHeader
            partner={activeConversation.partner}
            dict={dict}
            lang={lang}
            onBack={() => setMobileView("list")}
            onToggleInfo={() => setShowInfoPanel((prev) => !prev)}
            isInfoOpen={showInfoPanel}
          />

          {/* Product Context Bar (if attached to chat) */}
          {activeConversation.product && (
            <ProductContextBar
              product={activeConversation.product}
              dict={dict}
              lang={lang}
            />
          )}

          {/* Messages Scroll Area */}
          <MessageList
            messages={activeConversation.messages}
            partnerAvatar={activeConversation.partner.avatar}
            partnerName={activeConversation.partner.name}
            dict={dict}
          />

          {/* Input Bar */}
          <MessageInput onSendMessage={handleSendMessage} dict={dict} />
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center bg-surface-container-lowest rounded-xl border border-outline-variant text-on-surface-variant text-sm">
          {dict.chat?.no_conversations || "Chọn một cuộc trò chuyện để bắt đầu."}
        </div>
      )}

      {/* 3. Expandable Right Info Drawer (Toggled by 3-bars button, default hidden) */}
      {showInfoPanel && activeConversation?.sellerProfile && (
        <div className="h-full flex-shrink-0 animate-in fade-in slide-in-from-right-4 duration-200">
          <ChatSidebar
            sellerProfile={activeConversation.sellerProfile}
            dict={dict}
            lang={lang}
            onClose={() => setShowInfoPanel(false)}
          />
        </div>
      )}
    </div>
  );
}
