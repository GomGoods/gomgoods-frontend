import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Info, X } from "lucide-react";
import type { ChatMessage } from "./types";
import { MessageBubble } from "./MessageBubble";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface MessageListProps {
  messages: ChatMessage[];
  partnerAvatar?: string;
  partnerName?: string;
  dict: Dictionary;
}

export function MessageList({
  messages,
  partnerAvatar,
  partnerName,
  dict,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-3.5 md:p-4 flex flex-col gap-3.5 md:gap-4 bg-background"
    >
      {/* Date divider */}
      <div className="flex justify-center my-1">
        <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] md:text-xs font-medium shadow-2xs">
          {dict.chat?.today || "Today"}, 9:30 AM
        </span>
      </div>

      {/* Messages */}
      {messages.map((msg) => {
        if (msg.sender === "system") {
          return (
            <div
              key={msg.id}
              className="self-center bg-surface-container border border-outline-variant/80 rounded-xl px-3.5 py-2 flex items-center gap-2 shadow-2xs max-w-[90%] md:max-w-[80%]"
            >
              <Info size={16} className="text-tertiary flex-shrink-0" />
              <span className="text-xs md:text-sm text-on-surface font-medium">
                {msg.text || dict.chat?.system_started}
              </span>
            </div>
          );
        }

        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            partnerAvatar={partnerAvatar}
            partnerName={partnerName}
            onImageClick={(url) => setLightboxImage(url)}
          />
        );
      })}

      {/* Image Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 text-white bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[85vh] w-full h-[60vh] rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src={lightboxImage}
              alt="Expanded preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
