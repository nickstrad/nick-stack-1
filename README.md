# Nick Stack Template

A production-ready Next.js web application template for rapidly scaffolding modern full-stack projects. This template provides a complete authentication system, database setup, and UI component library out of the box.

## Overview

This is a template repository designed to quickly bootstrap new web applications with a modern, type-safe tech stack. It includes:

- **Full-stack type safety** with tRPC connecting frontend and backend
- **Authentication** pre-configured with email and Google OAuth
- **Database layer** set up with Prisma ORM and PostgreSQL
- **UI components** from shadcn/ui built on Radix primitives
- **Form handling** with React Hook Form and Zod validation
- **State management** using TanStack React Query
- **Styling** with Tailwind CSS 4

Use this template to skip the initial project setup and jump straight into building your application features.

## Technology Stack

- **Framework**: Next.js 16.1 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **API Layer**: tRPC for end-to-end type safety
- **Authentication**: Better Auth with Email & Google OAuth
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack React Query
- **Form Handling**: React Hook Form + Zod
- **Development**: mprocs for running multiple processes

## Project Structure

```
.
├── Makefile                  # Database and dev commands
├── mprocs.yaml              # Multi-process development setup
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/         # Auth pages (login, signup)
│   │   ├── api/            # API routes (tRPC, auth)
│   │   └── clippers/       # Example feature pages
│   ├── components/
│   │   ├── app/            # App-specific components
│   │   └── ui/             # shadcn/ui components
│   ├── features/           # Feature modules
│   │   ├── auth/           # Authentication components
│   │   └── entity/         # Example CRUD feature
│   ├── lib/                # Utilities and configs
│   │   ├── auth.ts         # Better Auth configuration
│   │   ├── db.ts           # Prisma client
│   │   └── utils/          # Helper functions
│   └── trpc/               # tRPC configuration
│       ├── routers/        # API route definitions
│       └── client.tsx      # tRPC React client
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm package manager

### Installation

1. **Use this template** to create a new repository or clone it:

```bash
git clone <your-repo-url>
cd <your-project-name>
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables** (see Environment Variables section below)

4. **Initialize the database**:

```bash
make db/reset
```

This will create the database schema and run migrations.

### Development

Start the development server with all processes:

```bash
npm run dev:all
```

This uses mprocs to run the Next.js dev server and other development processes concurrently.

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following required variables:

```env
# Database
DATABASE_URL=""

# Auth
BETTER_AUTH_SECRET=""
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Next server config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Environment Variable Details

#### Database
- **DATABASE_URL**: PostgreSQL connection string in the format:
  ```
  postgresql://username:password@localhost:5432/database_name
  ```

#### Authentication
- **BETTER_AUTH_SECRET**: Secret key for session encryption. Generate with:
  ```bash
  openssl rand -base64 32
  ```
- **BETTER_AUTH_URL**: Base URL where your app is hosted (use `http://localhost:3000` for local development)
- **GOOGLE_CLIENT_ID**: OAuth 2.0 client ID from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **GOOGLE_CLIENT_SECRET**: OAuth 2.0 client secret from Google Cloud Console

**Setting up Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

#### Next.js
- **NEXT_PUBLIC_APP_URL**: Public-facing URL of your application (same as BETTER_AUTH_URL for most cases)

## Available Commands

- `npm run dev` - Start Next.js development server
- `npm run dev:all` - Start all development processes with mprocs
- `npm run build` - Build for production
- `npm start` - Start production server
- `make db/reset` - Reset database and run migrations
- `npx prisma studio` - Open Prisma Studio to view/edit database
- `npx prisma generate` - Regenerate Prisma client

## Features Included

### Authentication
- Email/password authentication
- Google OAuth integration
- Protected routes and API endpoints
- Session management
- User navigation component

### Database
- Prisma ORM with PostgreSQL
- Example models (User, Session, Account, Verification)
- Example CRUD feature in `src/features/entity`

### UI Components
Full shadcn/ui component library including buttons, forms, dialogs, tables, and more.

### API Layer
- tRPC setup with type-safe API routes
- React Query integration
- Example router in `src/trpc/routers/_app.ts`

## Customization

1. **Update the app name and branding** in `src/components/app/AppLogo.tsx`
2. **Modify the Prisma schema** in `prisma/schema.prisma` and run migrations
3. **Add new tRPC routers** in `src/trpc/routers/`
4. **Create new feature modules** in `src/features/`
5. **Add new pages** in `src/app/`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://better-auth.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
