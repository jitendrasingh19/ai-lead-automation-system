This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Database Setup

**Important**: Before running the application, you must initialize the database with the required tables.

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions on:
- Creating the `leads` and `deals` tables
- Setting up database indexes
- Verifying the connection

Quick start:
```bash
# For Neon PostgreSQL (cloud), run init-db.sql via their SQL Editor
# For local PostgreSQL:
psql -U postgres -h localhost -d ai_lead_db -f init-db.sql
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features

- **Lead Management**: Track and manage leads with scoring and status
- **Deals Pipeline**: Manage sales opportunities through different stages
- **Dashboard**: View key performance indicators and metrics
- **Admin Interface**: 
  - `/admin/leads` - Leads management
  - `/admin/deals` - Deals and opportunities management
  - `/admin/login` - Admin authentication

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
