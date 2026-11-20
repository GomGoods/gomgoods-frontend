# GomGoods Frontend

Frontend for **GomGoods**, a C2C marketplace focused on anime, manga, games, idol merchandise, and other pop-culture collectibles.

The platform supports both individual sellers and store owners, with features for discovering products, managing listings, communicating with buyers, and handling transactions.

Built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **API:** REST, Socket.IO
- **Testing:** Vitest

## Features

The frontend includes:

- Product discovery, search, and filtering
- Personal listings and store management
- Shopping cart, checkout, and order tracking
- Buyer–seller messaging
- Community posts and discussions
- Community campaigns and achievements
- Product auctions
- Image uploads and management

Some features require the GomGoods backend and its supporting services.

## Getting Started

**Requirements:** Node.js 22.23.4 and npm.

Clone the repository and install dependencies:

```bash
git clone https://github.com/Alight09004/gomgoods-frontend.git
cd gomgoods-frontend
npm ci
```

Configure the environment variables using the project's environment example, if available.

Start the development server:

```bash
npm run dev
```

The application runs at [http://localhost:3001](http://localhost:3001) with the current development configuration.

## Project Structure

```text
src/
├── app/          # Pages, layouts, and routes
├── components/   # Reusable UI and feature components
├── services/     # Backend API integration
├── hooks/        # React hooks
├── lib/          # Shared utilities and clients
└── types/        # TypeScript types
```

## Development

Run the available project checks:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

For changes involving authenticated features, orders, or payments, use the isolated test environment rather than a development or production database.

## Repository

This repository contains the frontend application only. Backend services, database management, and payment processing are maintained separately.

## License

See [LICENSE](LICENSE) for the repository's licensing terms.
