import { Construction } from "lucide-react";

interface AdminPlaceholderProps {
  title: string;
  description?: string;
}

export function AdminPlaceholder({ title, description }: AdminPlaceholderProps) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-4">
        <Construction size={32} className="text-on-surface-variant/50" />
      </div>
      <h1 className="text-headline-lg text-on-surface tracking-tight">{title}</h1>
      {description && (
        <p className="text-body-md text-on-surface-variant mt-2 max-w-md">
          {description}
        </p>
      )}
      <span className="mt-4 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-semibold">
        Đang phát triển
      </span>
    </div>
  );
}
