export const DEFAULT_LOCALE = "vi" as const;
export type Locale = "vi" | "en";

/**
 * Helper to prefix path with locale
 */
export function withLocale(path: string, lang: string = DEFAULT_LOCALE): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!lang) return normalizedPath;
  return `/${lang}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export const ROUTES = {
  // Home
  home: (lang: string = DEFAULT_LOCALE) => withLocale("/", lang),

  // Authentication
  auth: {
    login: (lang: string = DEFAULT_LOCALE) => withLocale("/login", lang),
    register: (lang: string = DEFAULT_LOCALE) => withLocale("/register", lang),
    forgotPassword: (lang: string = DEFAULT_LOCALE) => withLocale("/forgot-password", lang),
  },

  // Marketplace & Catalog
  marketplace: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/marketplace", lang),
    category: (category: string, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/marketplace?category=${encodeURIComponent(category)}`, lang),
    search: (query: string, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/marketplace?q=${encodeURIComponent(query)}`, lang),
  },

  // Products
  products: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/product", lang),
    detail: (id: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/product/${id}`, lang),
  },

  // Auctions
  auctions: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/auction", lang),
    detail: (id: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/auction/${id}`, lang),
  },

  // Campaigns & Fandom Events
  campaigns: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/campaign", lang),
    detail: (id: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/campaign/${id}`, lang),
  },

  // Flash Deals
  deals: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/deal", lang),
    detail: (slug: string, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/deal/${slug}`, lang),
  },

  // Cart & Checkout
  cart: (lang: string = DEFAULT_LOCALE) => withLocale("/cart", lang),
  checkout: (lang: string = DEFAULT_LOCALE) => withLocale("/checkout", lang),

  // Orders
  orders: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/orders", lang),
    detail: (id: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/orders/${id}`, lang),
  },

  // Real-time Chat
  chat: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/chat", lang),
    conversation: (conversationId: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/chat?id=${conversationId}`, lang),
    withSeller: (sellerId: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/chat?seller=${sellerId}`, lang),
  },

  // Community Forum
  forum: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/forum", lang),
    detail: (id: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/forum/${id}`, lang),
    category: (categorySlug: string, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/forum/category/${categorySlug}`, lang),
  },

  // User Profile & Wishlist
  profile: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/profile", lang),
    tab: (tab: string, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/profile?tab=${encodeURIComponent(tab)}`, lang),
    wishlist: (lang: string = DEFAULT_LOCALE) => withLocale("/profile?tab=wishlist", lang),
    collection: (lang: string = DEFAULT_LOCALE) => withLocale("/profile?tab=wishlist", lang),
    orders: (lang: string = DEFAULT_LOCALE) => withLocale("/profile?tab=orders", lang),
    reviews: (lang: string = DEFAULT_LOCALE) => withLocale("/profile?tab=reviews", lang),
    settings: (lang: string = DEFAULT_LOCALE) => withLocale("/profile?tab=settings", lang),
  },

  // Seller Dashboard / Listing
  sell: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/sell", lang),
    create: (lang: string = DEFAULT_LOCALE) => withLocale("/sell/create", lang),
    edit: (id: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/sell/edit/${id}`, lang),
  },

  // Seller Public Profile
  seller: {
    detail: (id: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/seller/${id}`, lang),
  },

  // Stores
  stores: {
    detail: (id: string | number, lang: string = DEFAULT_LOCALE) =>
      withLocale(`/store/${id}`, lang),
  },

  // Admin Portal
  admin: {
    root: (lang: string = DEFAULT_LOCALE) => withLocale("/admin", lang),
    auctions: (lang: string = DEFAULT_LOCALE) => withLocale("/admin/auctions", lang),
    campaigns: (lang: string = DEFAULT_LOCALE) => withLocale("/admin/campaigns", lang),
    disputes: (lang: string = DEFAULT_LOCALE) => withLocale("/admin/disputes", lang),
    forum: (lang: string = DEFAULT_LOCALE) => withLocale("/admin/forum", lang),
    products: (lang: string = DEFAULT_LOCALE) => withLocale("/admin/products", lang),
    users: (lang: string = DEFAULT_LOCALE) => withLocale("/admin/users", lang),
  },

  // Static Raw Paths (useful when matching pathname without locale)
  raw: {
    home: "/",
    marketplace: "/marketplace",
    cart: "/cart",
    checkout: "/checkout",
    chat: "/chat",
    orders: "/orders",
    profile: "/profile",
    sell: "/sell",
    auction: "/auction",
    campaign: "/campaign",
    forum: "/forum",
  },
} as const;

export type AppRoutes = typeof ROUTES;
