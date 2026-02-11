# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Liftoff is a gamified habit-tracking PWA targeting the Tunisian market. It's a full-stack Next.js 16 application with PostgreSQL, AI coaching, offline support, and multi-language support (French, Arabic, Tunisian dialect). All application code lives in `liftoff/`.

## Commands

All commands must be run from the `liftoff/` directory:

```bash
npm ci                   # Install dependencies (use this, not npm install)
npm run dev              # Dev server on port 3000
npm run build            # Production build
npm run lint             # ESLint
npm test                 # Vitest test suite
npm run test:coverage    # Tests with V8 coverage
npx vitest run test/example.test.ts  # Run a single test file
npm run db:generate      # Generate Drizzle migration from schema changes
npm run db:migrate       # Apply pending migrations
npm run db:push          # Push schema directly (no migration file)
npm run db:studio        # Drizzle Studio web UI
npm run db:seed          # Seed database (tsx src/db/seed.ts)
```

CI runs lint, typecheck (`tsc`), build, and tests on PRs to main/develop.

## Architecture

**App Router structure** — Route groups organize the app:
- `(auth)/` — Login, register, email verification (public)
- `(onboarding)/` — Multi-step onboarding flow (authenticated, pre-onboarding)
- `(dashboard)/` — All protected app pages (authenticated, post-onboarding)
- `api/` — REST endpoints for all features

**Middleware** (`src/middleware.ts`) enforces auth gating: unauthenticated users redirect to login, authenticated users skip auth pages, incomplete onboarding redirects to onboarding flow.

**Service layer** (`src/services/`) — 30+ domain services (habit, badge, xp, streak, workout-log, meal-template, proactive-coach, etc.) contain all business logic and database operations. Components call services; services call the database.

**Database** — PostgreSQL with Drizzle ORM. Schema is in `src/db/schema.ts` (large file, 88KB+). Connection uses a singleton pattern via `getDb()` in `src/db/index.ts` with connection pooling (max 20).

**Gamification system** — XP/leveling, badges with tiers (bronze→diamond), streaks, ranking/leaderboard, "flames" currency, boosts, and challenges. Global state managed via `XPContext` and `RankContext` React contexts, wrapped by `DashboardProviders`.

**AI Coach** — Vercel AI SDK with streaming, supports OpenAI and Google Generative AI providers. Chat interface at `/coach`, plus proactive suggestions and food scanning. Rate-limited per minute and daily.

**Offline-first** — Serwist service worker (`src/lib/offline/sw.ts`) with Dexie for client-side IndexedDB. Sync mechanism pushes offline changes when connectivity returns.

**i18n** — next-intl with French (default), Arabic, and Tunisian dialect. RTL support built in. Translations in `liftoff/messages/`. Locale detection: cookie → Accept-Language header → French.

**UI** — Tailwind CSS v4 + Radix UI primitives + shadcn/ui patterns. Shared primitives in `components/ui/`, feature components in `components/{feature}/`.

## Conventions

- **TypeScript strict mode** is on. Keep types explicit at API/service boundaries.
- **Import alias**: `@/*` maps to `src/*` (e.g., `@/lib/utils`, `@/services/habit`).
- **Naming**: PascalCase for components (`WorkoutEditorModal.tsx`), `use*` for hooks (`useRank.ts`), kebab-case for services/utils (`workout-log.ts`).
- **Style**: 2-space indentation, semicolons required.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, with optional scope like `feat(ai): ...`).
- **Tests**: Named `*.test.ts` in `liftoff/test/`. Vitest + Testing Library + jsdom.
- **Server vs Client**: Server components by default; add `"use client"` only when needed.

## Environment

Required env vars: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`. OAuth needs Google/Facebook credentials. AI features need `GOOGLE_GENERATIVE_AI_API_KEY` or OpenAI keys. See `.env.example`.

Deployed on Vercel (region: cdg1/Paris).
