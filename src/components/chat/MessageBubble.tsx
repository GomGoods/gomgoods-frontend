import Image from "next/image";
import type { ChatMessage } from "./types";

interface MessageBubbleProps {
  message: ChatMessage;
  partnerAvatar?: string;
  partnerName?: string;
  onImageClick?: (url: string) => void;
}

export function MessageBubble({
  message,
  partnerAvatar,
  partnerName,
  onImageClick,
}: MessageBubbleProps) {
  const isMe = message.sender === "me";

  return (
    <div
      className={`flex flex-col ${
        isMe ? "items-end self-end" : "items-start self-start"
      } max-w-[85%] md:max-w-[75%]`}
    >
      <div className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
        {/* Partner avatar for received messages */}
        {!isMe && (
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 border border-outline-variant bg-secondary-container">
            {partnerAvatar ? (
              <Image
                src={partnerAvatar}
                alt={partnerName || "Partner"}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-on-secondary-container text-xs font-bold">
                {partnerName?.charAt(0).toUpperCase() || "P"}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col">
          {/* Image content if any */}
          {message.imageUrl && (
            <div
              onClick={() => onImageClick?.(message.imageUrl!)}
              className={`p-1.5 rounded-2xl overflow-hidden border border-outline-variant shadow-xs cursor-pointer hover:opacity-95 transition-opacity mb-1 ${
                isMe
                  ? "bg-surface-container rounded-br-xs"
                  : "bg-surface-container-lowest rounded-bl-xs"
              }`}
            >
              <div className="relative w-48 sm:w-56 h-48 rounded-xl overflow-hidden">
                <Image
                  src={message.imageUrl}
                  alt="Attachment"
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Text content if any */}
          {message.text && (
            <div
              className={`px-3.5 py-2 md:px-4 md:py-2.5 rounded-2xl shadow-xs text-xs md:text-sm leading-relaxed border border-outline-variant/60 ${
                isMe
                  ? "bg-surface-container text-on-surface rounded-br-xs"
                  : "bg-surface-container-lowest text-on-surface rounded-bl-xs"
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
            </div>
          )}

          {/* Timestamp */}
          <span
            className={`text-[10px] text-on-surface-variant mt-1 ${
              isMe ? "text-right mr-1" : "text-left ml-1"
            }`}
          >
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
