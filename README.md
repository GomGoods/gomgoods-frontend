# GomGoods
GomGoods is a C2C marketplace for Pop-Culture & ACG goods, designed for users to discover, buy, sell, collect, and trade products within a community-driven marketplace.

The platform supports both individual users selling personal items and dedicated store sellers, with features inspired by platforms such as Xianyu and Mercari.

## ✨ Features
- 🛍️ **Marketplace** — Browse, search, filter, and discover Pop-Culture & ACG products.
- 🛒 **Shopping** — Cart, checkout, payment, order management, and shipment tracking.
- 🏪 **Store & Seller** — View seller/store profiles, reputation, listings, and reviews.
- 📦 **Personal Selling** — Users can list and sell their own items.
- 🔨 **Auction** — Create and participate in product auctions.
- 💬 **Chat** — Communicate directly between buyers and sellers.
- ⭐ **Collection & Reviews** — Save products and review completed transactions.
- 🗣️ **Forum** — Community discussions, transaction warnings, recommendations, and reports.
- 🎁 **Campaigns** — Participate in community campaigns and contributions.
- 🛡️ **Dispute & Support** — Report transaction issues and receive support.
- 🤖 **AI Support** — Assist users with common questions and transaction-related support.

## 🛠️ Tech Stack
| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |

## 🎨 Design
GomGoods focuses on a **compact, information-rich marketplace experience** inspired by existing C2C platforms while maintaining its own Pop-Culture & ACG identity.

The interface prioritizes:
- Easy product discovery
- Clear seller information and reputation
- Efficient search and filtering
- Compact marketplace layouts
- Community interaction
- Consistent and reusable UI components

## 👥 Account Types
GomGoods distinguishes between two types of selling entities:
- **User** — A registered user who can purchase products and sell personal items.
- **Store Seller** — A dedicated seller/store account operating as a storefront on the marketplace.

This distinction allows GomGoods to support both casual peer-to-peer selling and more established sellers.

## 🧩 Frontend Architecture
The frontend follows a feature-oriented architecture based on Next.js App Router.
The main responsibilities are separated between:
- **Pages & Routes** — Application screens and navigation.
- **Components** — Reusable UI and feature-specific components.
- **Services** — Communication with backend APIs.
- **Hooks** — Reusable React logic.
- **Types** — Shared TypeScript definitions.
- **Utilities** — Common helper functions and application logic.
The frontend is designed to work independently from the backend through a defined API layer.

## 🌿 Git Workflow
Development follows a feature-branch workflow:
```text
main
 └── feature/...