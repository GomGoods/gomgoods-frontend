import { useState, useRef, type KeyboardEvent } from "react";
import { PlusCircle, Image as ImageIcon, Smile, Send } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface MessageInputProps {
  onSendMessage: (text: string, imageUrl?: string) => void;
  dict: Dictionary;
}

export function MessageInput({ onSendMessage, dict }: MessageInputProps) {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Auto grow textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  const handleQuickAttachImage = () => {
    // Demo quick sample attachment
    onSendMessage(
      "",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkWudtxcTF0O_vwe_24Zle__JKcbhGkNZwhbXu0tzskyxgDrjOFuO7DApdtyzJeQUWQnlVEGoSMsbJHL-6wY5wm44Bo98JIvtzoOA0Q2-9K_uJhKf1LkIyvf-8QYd2n8XKc1dsqe_AfptmUItYBRx7F5Vae4oU6K_b-glVja4QvN_KhOYJUMQ3GUZtYfCaDC3FEBq7UkmW-N5NoYxU4eWj4ztU0VL8pzKng3EPrrn__4Lv4RmF_nzv"
    );
  };

  return (
    <div className="p-2.5 md:p-3 bg-surface-container-low border-t border-outline-variant flex items-end gap-1.5 md:gap-2 flex-shrink-0">
      {/* Attachment buttons */}
      <button
        type="button"
        className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors flex-shrink-0"
        title="Attach file"
      >
        <PlusCircle size={20} />
      </button>

      <button
        type="button"
        onClick={handleQuickAttachImage}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors flex-shrink-0"
        title="Attach image"
      >
        <ImageIcon size={20} />
      </button>

      {/* Textarea container */}
      <div className="flex-1 bg-surface-container-lowest rounded-2xl border border-outline-variant flex items-end overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={dict.chat?.type_message || "Type a message..."}
          rows={1}
          className="w-full bg-transparent border-none focus:ring-0 resize-none py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm text-on-surface placeholder:text-on-surface-variant/70 max-h-28 min-h-[40px] outline-none"
        />
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors flex-shrink-0 self-end mb-0.5"
          title="Emoji"
        >
          <Smile size={18} />
        </button>
      </div>

      {/* Send button */}
      <button
        type="button"
        onClick={handleSend}
        disabled={!inputText.trim()}
        className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-150 shadow-xs flex-shrink-0 ${
          inputText.trim()
            ? "bg-primary text-on-primary hover:bg-primary-container active:scale-95 cursor-pointer"
            : "bg-surface-container text-on-surface-variant/50 cursor-not-allowed"
        }`}
        title="Send"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
