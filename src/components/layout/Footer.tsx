import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  const footerLinks = [
    { key: "policies" as const, href: "#" },
    { key: "help_center" as const, href: "#" },
    { key: "about" as const, href: "#" },
    { key: "seller_guide" as const, href: "#" },
    { key: "contact" as const, href: "#" },
  ];

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant w-full py-8 mt-auto">
      <div className="max-w-[1300px] mx-auto px-3 md:px-5 lg:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center transition-transform hover:scale-[1.02]">
            <Image
              src="/Logo_Gomgoods_clean.png"
              alt="GomGoods"
              width={220}
              height={112}
              className="h-11 md:h-12 w-auto object-contain"
            />
          </Link>
          <span className="text-body-sm text-on-surface-variant">
            {dict.footer.copyright}
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-label-lg text-on-surface-variant">
          {footerLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="hover:text-primary hover:underline transition-opacity opacity-80 hover:opacity-100"
            >
              {dict.footer[key]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
