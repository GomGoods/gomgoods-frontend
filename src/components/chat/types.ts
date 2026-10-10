export interface ChatPartner {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  role?: string;
}

export interface SellerProfileSummary {
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  joinedYear: string;
  responseRate: string;
  salesCount: string;
  isVerified?: boolean;
}

export interface ProductContext {
  id: string;
  title: string;
  price: string;
  image: string;
  condition?: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: "me" | "partner" | "system";
  text?: string;
  timestamp: string;
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  partner: ChatPartner;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  product?: ProductContext;
  sellerProfile?: SellerProfileSummary;
  messages: ChatMessage[];
}
