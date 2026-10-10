import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { MainNav } from "./MainNav";
import { NotificationMenu } from "./NotificationMenu";
import { UserMenu } from "./UserMenu";
import { CartHeaderButton } from "./CartHeaderButton";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface HeaderProps {
  dict: Dictionary;
  lang: Locale;
}

export function Header({ dict, lang }: HeaderProps) {
  return (
    <header className="bg-surface border-b border-outline-variant shadow-sm w-full top-0 z-50 sticky">
      <div className="flex flex-col w-full px-3 md:px-5 lg:px-6 max-w-[1300px] mx-auto py-1.5 md:py-2">
        {/* Main row */}
        <div className="flex items-center justify-between w-full gap-2 md:gap-3">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex-shrink-0 flex items-center transition-transform hover:scale-[1.02]"
          >
            <Image
              src="/Logo_Gomgoods_clean.png"
              alt="GomGoods"
              width={200}
              height={102}
              priority
              className="h-9 sm:h-10 md:h-11 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-2 lg:mx-4">
            <SearchBar dict={dict} lang={lang} />
          </div>

          {/* Navigation (Desktop) */}
          <MainNav dict={dict} lang={lang} />

          {/* Trailing Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">

            {/* Notifications */}
            <NotificationMenu dict={dict} />

            {/* Cart */}
            <CartHeaderButton lang={lang} title={dict.header.cart} />

            {/* User */}
            <div className="ml-1">
              <UserMenu lang={lang} />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden w-full mt-2">
          <SearchBar dict={dict} lang={lang} />
        </div>
      </div>
    </header>
  );
}
