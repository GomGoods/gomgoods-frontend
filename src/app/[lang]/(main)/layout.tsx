import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideToolbar } from "@/components/layout/SideToolbar";
import { AuthModalProvider } from "@/components/auth/AuthModalContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { CartProvider } from "@/context/CartContext";
import { GomXuProvider } from "@/context/GomXuContext";

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <AuthModalProvider>
      <GomXuProvider>
        <CartProvider>
          <Header dict={dict} lang={lang as Locale} />
          <main className="flex-1 w-full max-w-[1300px] mx-auto px-3 md:px-5 lg:px-6 py-4">
            {children}
          </main>
          <SideToolbar dict={dict} />
          <Footer dict={dict} />
          <AuthModal />
        </CartProvider>
      </GomXuProvider>
    </AuthModalProvider>
  );
}
