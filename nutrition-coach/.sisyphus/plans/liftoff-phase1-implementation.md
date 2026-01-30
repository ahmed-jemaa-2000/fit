# Liftoff Phase 1 (MVP) - Implementation Plan
## 10-Week Production-Ready Build (Weeks 1-10)

**Version**: 1.0  
**Date**: January 30, 2025  
**Status**: Ready for Execution  
**Target**: Production-ready MVP with core habit tracking + gamification

---

## TL;DR

> **Objective**: Build a production-ready habit tracking SaaS with gamification for the Tunisian market
>
> **Timeline**: 10 weeks (Weeks 1-10)
> **Team**: 2-3 developers, 1 designer
> **Stack**: Next.js 15 + TypeScript + Drizzle ORM + PostgreSQL + Tailwind CSS
>
> **Deliverables**:
> - Full authentication system (Email + Google + Facebook OAuth)
> - Habit CRUD with completion tracking
> - Gamification engine (XP, Levels, 5 Badges, Streaks)
> - Mobile-first dashboard with progress widgets
> - 5-step onboarding flow with French i18n
> - CI/CD pipeline with automated testing
>
> **Estimated Effort**: Large (10 weeks, 40+ tasks)
> **Parallel Execution**: YES - 5 waves with 3-4 parallel tracks each
> **Critical Path**: Project Setup → Database → Auth → Habit API → XP Engine → Dashboard → Onboarding

---

## Context

### Original Request
Create a detailed, actionable implementation plan for Phase 1 (MVP) of the Liftoff SaaS project covering:
- Weeks 1-2: Foundation (Next.js 15, TypeScript, Tailwind, Drizzle, Auth, CI/CD)
- Weeks 3-4: Habits Core (CRUD API, completion tracking, basic UI, reminders)
- Weeks 5-6: Gamification v1 (XP engine, levels, badges, streaks)
- Weeks 7-8: Dashboard & UI (mobile-first, progress widgets, bottom nav)
- Weeks 9-10: Onboarding (5-step flow, goal selection, tutorial)

### Project Status
- **Current State**: Greenfield project (empty directory)
- **Existing Assets**: Comprehensive architecture plan at `.sisyphus/plans/liftoff-architecture-plan.md`
- **Target Market**: Tunisia (French primary language, mobile-first)

### Critical Requirements (Non-Negotiable)
1. Production-ready code (no placeholders)
2. TypeScript strict mode
3. Mobile-first responsive design
4. French language support (i18n)
5. Database indexes for performance
6. API validation with Zod
7. Error handling throughout

### Gap Analysis Summary (From Metis Review)

**Auto-Resolved (Applied Defaults)**:
- Hosting platform: Vercel (optimal for Next.js 15)
- Database: PostgreSQL on Neon or Supabase
- OAuth providers: Google + Facebook + Email (3 max)
- Test coverage: 70% API, 50% components
- Level cap: 100 (with prestige system in Phase 2)
- Badge count: Exactly 5 (locked)
- Day boundary: Midnight Tunisia time (UTC+1) + 2-hour grace period

**Explicit Exclusions (Phase 1 Scope Lock)**:
- ❌ NO AI features (deferred to Phase 2)
- ❌ NO push notification delivery (infrastructure only)
- ❌ NO social features (friends, sharing, leaderboards)
- ❌ NO payment integration
- ❌ NO email notifications (except password reset)
- ❌ NO Arabic/Derja language support (French only)
- ❌ NO offline support/PWA advanced features
- ❌ NO data export
- ❌ NO admin panel
- ❌ NO A/B testing framework
- ❌ NO anti-cheat system (deferred to Phase 2)
- ❌ NO streak freeze/recovery (premium feature, deferred)

**Decisions Needed** (see Section: Open Questions):
1. Database hosting provider (Neon vs Supabase)
2. Analytics platform (PostHog vs Amplitude)
3. Exact 5 badge definitions

---

## Work Objectives

### Core Objective
Build a production-ready habit tracking application with gamification that delivers immediate value to users while establishing a solid technical foundation for future phases.

### Concrete Deliverables

#### By End of Week 2 (Foundation):
- [ ] Next.js 15 project with TypeScript strict mode
- [ ] Drizzle ORM configured with PostgreSQL
- [ ] Complete database schema with all core tables
- [ ] NextAuth.js v5 with Google + Facebook + Email providers
- [ ] CI/CD pipeline (GitHub Actions → Vercel)
- [ ] Base design system with Tailwind CSS
- [ ] i18n setup with French as primary language

#### By End of Week 4 (Habits Core):
- [ ] Habit CRUD REST API (Create, Read, Update, Delete)
- [ ] Completion tracking with idempotency
- [ ] Daily/weekly frequency support
- [ ] Reminder system infrastructure
- [ ] Habit UI components (list, detail, form)
- [ ] Basic habit templates (10 pre-defined)

#### By End of Week 6 (Gamification v1):
- [ ] XP calculation engine with formula: `100 * level^1.5`
- [ ] Level progression system (1-100)
- [ ] 5 badge system with specific unlock criteria
- [ ] Streak tracking (daily reset, at-risk detection)
- [ ] XP transaction audit log
- [ ] Gamification UI components (XP bar, level badge, streak card)

#### By End of Week 8 (Dashboard & UI):
- [ ] Mobile-first dashboard layout
- [ ] Progress widgets (XP bar, streak card, weekly ring)
- [ ] Bottom navigation (mobile)
- [ ] Responsive design polish
- [ ] Loading states and error boundaries
- [ ] Performance optimization (Lighthouse >90)

#### By End of Week 10 (Onboarding):
- [ ] 5-step onboarding flow
- [ ] Goal selection UI (6 categories, max 3 selections)
- [ ] Progressive tutorial system
- [ ] First experience optimization
- [ ] Onboarding analytics tracking

### Definition of Done (Phase 1)
- [ ] All features functional in production environment
- [ ] Test coverage: 70% API routes, 50% components
- [ ] Lighthouse score: >90 mobile, >95 desktop
- [ ] All API routes have Zod validation
- [ ] All database queries have proper indexes
- [ ] French i18n complete (all UI strings)
- [ ] Zero critical security vulnerabilities
- [ ] CI/CD pipeline passing all checks
- [ ] Documentation complete (API, deployment, troubleshooting)

### Must Have (Non-Negotiable)
1. User authentication with 3 providers (Google, Facebook, Email)
2. Habit CRUD with completion tracking
3. XP system with level progression
4. Streak tracking with daily reset
5. Mobile-first responsive design
6. French language support
7. Database indexes for performance
8. API validation with Zod
9. Error handling throughout
10. CI/CD pipeline

### Must NOT Have (Guardrails)
1. NO AI features (chatbot, recommendations)
2. NO push notification delivery (setup only)
3. NO social features (friends, leaderboards)
4. NO payment integration
5. NO email marketing
6. NO Arabic/Derja support (French only)
7. NO offline mode
8. NO data export
9. NO anti-cheat system
10. NO streak freeze/recovery
11. NO more than 5 badges
12. NO custom habit icons (pre-defined set only)
13. NO complex recurrence patterns (daily/weekly only)
14. NO A/B testing
15. NO admin panel

---

## Verification Strategy

### Test Infrastructure Decision
- **Infrastructure exists**: NO (greenfield project)
- **User wants tests**: YES (TDD for critical paths)
- **Framework**: bun test (built-in, fast, TypeScript-native)
- **QA approach**: TDD for API and gamification, manual verification for UI

### Test Setup Task (Task 1.12)
- [ ] 0. Setup Test Infrastructure
  - Install: `bun add -d @types/bun`
  - Config: Create `test/setup.ts` with test utilities
  - Verify: `bun test --help` → shows help
  - Example: Create `src/__tests__/example.test.ts`
  - Verify: `bun test` → 1 test passes

### TDD Workflow (Critical Tasks)
Each critical task follows RED-GREEN-REFACTOR:

**Task Structure:**
1. **RED**: Write failing test first
   - Test file: `[path].test.ts`
   - Test command: `bun test [file]`
   - Expected: FAIL (test exists, implementation doesn't)
2. **GREEN**: Implement minimum code to pass
   - Command: `bun test [file]`
   - Expected: PASS
3. **REFACTOR**: Clean up while keeping green
   - Command: `bun test [file]`
   - Expected: PASS (still)

### Automated Verification (Per Deliverable Type)

**For API/Backend changes** (using Bun test):
```typescript
// Example test structure
import { describe, it, expect } from "bun:test";

describe("Habit API", () => {
  it("should create a habit with valid data", async () => {
    const response = await fetch("/api/habits", {
      method: "POST",
      body: JSON.stringify({ name: "Test", category: "fitness" })
    });
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.name).toBe("Test");
  });
});
```

**For Frontend/UI changes** (using Playwright via skill):
```typescript
// Agent executes via playwright browser automation:
1. Navigate to: http://localhost:3000/dashboard
2. Wait for: selector "[data-testid='habit-list']" to be visible
3. Click: "[data-testid='complete-habit-1']"
4. Wait for: selector "[data-testid='xp-toast']" to be visible
5. Assert: text "+20 XP" appears
6. Screenshot: .sisyphus/evidence/task-X-completion.png
```

**For Database changes** (using Drizzle ORM):
```typescript
// Verify migration applied
const result = await db.execute(sql`SELECT * FROM habits LIMIT 1`);
expect(result.rows).toBeDefined();
```

---

## Execution Strategy

### Parallel Execution Waves

```
WAVE 1: Foundation (Weeks 1-2) - START IMMEDIATELY
├── Track A: Infrastructure (unspecified-high)
│   ├── Task 1.1: Project setup & repository
│   ├── Task 1.2: Database schema implementation
│   ├── Task 1.3: Authentication system
│   ├── Task 1.4: CI/CD pipeline
│   └── Task 1.12: Test infrastructure
├── Track B: Design System (visual-engineering)
│   ├── Task 1.5: Design tokens & color system
│   ├── Task 1.6: Base component library (shadcn/ui)
│   ├── Task 1.7: Mobile-first layouts
│   └── Task 1.8: Animation system (Framer Motion)
└── Track C: Core Backend (unspecified-high)
    ├── Task 1.9: API structure & middleware
    ├── Task 1.10: User service
    ├── Task 1.11: Error handling & logging
    └── Task 1.13: i18n setup (French)

WAVE 2: Core Features (Weeks 3-4)
├── Track A: Habit System (unspecified-high)
│   ├── Task 2.1: Habit CRUD API
│   ├── Task 2.2: Completion tracking
│   ├── Task 2.3: Reminder system infrastructure
│   └── Task 2.4: Habit UI components
├── Track B: Gamification v1 (unspecified-high)
│   ├── Task 2.5: XP calculation engine
│   ├── Task 2.6: Level progression system
│   ├── Task 2.7: 5 Badge system
│   └── Task 2.8: Streak tracking
└── Track C: Dashboard Foundation (visual-engineering)
    ├── Task 2.9: Dashboard layout shell
    └── Task 2.10: Navigation components

WAVE 3: Dashboard & Polish (Weeks 5-6)
├── Track A: Gamification UI (visual-engineering)
│   ├── Task 3.1: XP progress bar component
│   ├── Task 3.2: Level badge component
│   ├── Task 3.3: Streak card component
│   └── Task 3.4: Weekly progress ring
├── Track B: Dashboard Widgets (visual-engineering)
│   ├── Task 3.5: Habit checklist widget
│   ├── Task 3.6: Today summary widget
│   └── Task 3.7: Weekly stats widget
└── Track C: Mobile Optimization (visual-engineering)
    ├── Task 3.8: Bottom navigation
    ├── Task 3.9: Touch targets optimization
    └── Task 3.10: Responsive polish

WAVE 4: Onboarding (Weeks 7-8)
├── Track A: Onboarding Flow (visual-engineering)
│   ├── Task 4.1: Welcome screen
│   ├── Task 4.2: Language selection
│   ├── Task 4.3: Goal selection UI
│   └── Task 4.4: Account creation step
├── Track B: Tutorial System (visual-engineering)
│   ├── Task 4.5: Progressive tutorial components
│   ├── Task 4.6: Contextual help tooltips
│   └── Task 4.7: First experience optimization
└── Track C: Polish & Performance (unspecified-high)
    ├── Task 4.8: Loading states
    ├── Task 4.9: Error boundaries
    └── Task 4.10: Performance optimization

WAVE 5: Testing & Launch Prep (Weeks 9-10)
├── Track A: Testing (unspecified-high)
│   ├── Task 5.1: API integration tests
│   ├── Task 5.2: Component unit tests
│   ├── Task 5.3: E2E tests (critical paths)
│   └── Task 5.4: Performance testing
├── Track B: Documentation (quick)
│   ├── Task 5.5: API documentation
│   ├── Task 5.6: Deployment guide
│   └── Task 5.7: Troubleshooting guide
└── Track C: Launch Prep (unspecified-high)
    ├── Task 5.8: Production environment setup
    ├── Task 5.9: Monitoring & alerting
    └── Task 5.10: Beta launch checklist
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1.2 Database | 1.1 | 1.3, 2.1, 2.5 | 1.5, 1.9 |
| 1.3 Auth | 1.2 | 2.1, 2.9, 3.1 | 1.6, 1.10 |
| 1.12 Test Infra | 1.1 | All test tasks | 1.2, 1.5 |
| 2.1 Habit API | 1.3 | 2.2, 2.4 | 2.5, 2.9 |
| 2.5 XP Engine | 1.2 | 2.6, 2.8 | 2.1, 2.9 |
| 2.9 Dashboard | 1.3, 2.1 | 3.5, 3.6, 3.7 | 2.2, 2.6 |
| 3.1 XP Bar | 2.5, 2.6 | 3.5 | 3.2, 3.3 |
| 4.1 Onboarding | 2.9 | 4.5 | 4.2, 4.3 |
| 5.1 API Tests | 2.1, 2.5 | 5.8 | 5.2, 5.5 |

### Critical Path

```
Task 1.1 (Project Setup) [2 days]
    ↓
Task 1.2 (Database Schema) [3 days]
    ↓
Task 1.3 (Authentication) [3 days]
    ↓
Task 2.1 (Habit API) [4 days] ←→ Task 2.5 (XP Engine) [3 days]
    ↓                       ↓
Task 2.2 (Completion) → Task 2.8 (Streaks) [3 days]
    ↓
Task 2.9 (Dashboard) [4 days]
    ↓
Task 3.5 (Habit Widget) [2 days]
    ↓
Task 4.1 (Onboarding) [5 days]
    ↓
Task 5.1 (API Tests) [3 days]
    ↓
Task 5.8 (Production Deploy) [2 days]
    ↓
LAUNCH
```

**Critical Path Duration**: 34 days (with parallel work, total 10 weeks / 50 days)

### Agent Dispatch Summary

| Wave | Tasks | Recommended Category | Skills |
|------|-------|---------------------|--------|
| 1A | 1.1-1.4, 1.12 | unspecified-high | typescript-programmer, git-master |
| 1B | 1.5-1.8 | visual-engineering | frontend-ui-ux, typescript-programmer |
| 1C | 1.9-1.11, 1.13 | unspecified-high | typescript-programmer |
| 2A | 2.1-2.4 | unspecified-high | typescript-programmer |
| 2B | 2.5-2.8 | unspecified-high | typescript-programmer, data-scientist |
| 2C | 2.9-2.10 | visual-engineering | frontend-ui-ux |
| 3A-C | 3.1-3.10 | visual-engineering | frontend-ui-ux |
| 4A-C | 4.1-4.10 | visual-engineering | frontend-ui-ux |
| 5A | 5.1-5.4 | unspecified-high | typescript-programmer |
| 5B-C | 5.5-5.10 | quick / unspecified-high | typescript-programmer, git-master |

---

## TODOs

### WAVE 1: Foundation (Weeks 1-2)

---

#### Task 1.1: Project Setup & Repository
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer, git-master

**What to do**:
1. Initialize Next.js 15 project with TypeScript
2. Configure strict TypeScript mode
3. Set up project structure (see File Structure section)
4. Initialize Git repository with conventional commits
5. Set up branch protection rules (main branch)
6. Create `.gitignore` with Node.js + Next.js + OS patterns
7. Set up pre-commit hooks (lint-staged + husky)
8. Create initial README with setup instructions

**Must NOT do**:
- Do NOT add any business logic yet
- Do NOT configure external services (DB, auth)
- Do NOT add placeholder components

**Parallelization**:
- **Can Run In Parallel**: YES (Wave 1 starter)
- **Blocks**: 1.2, 1.5, 1.9, 1.12
- **Blocked By**: None

**References**:
- Next.js 15 docs: `https://nextjs.org/docs/app/building-your-application`
- TypeScript strict mode: `https://www.typescriptlang.org/tsconfig/#strict`
- Conventional commits: `https://www.conventionalcommits.org/`

**Acceptance Criteria**:
- [ ] `bun dev` starts development server on port 3000
- [ ] `bun build` completes without errors
- [ ] TypeScript strict mode enabled in `tsconfig.json`
- [ ] Git repo initialized with at least 1 commit
- [ ] README includes setup instructions
- [ ] `.gitignore` ignores node_modules, .env, .next

**Commit**: YES
- Message: `chore: initialize Next.js 15 project with TypeScript strict mode`
- Files: All initial project files

---

#### Task 1.2: Database Schema Implementation
**Duration**: 3 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Install Drizzle ORM and PostgreSQL driver
2. Set up database connection configuration
3. Create Drizzle schema files for all core tables:
   - `users` table (with gamification fields)
   - `accounts` table (OAuth)
   - `sessions` table
   - `habits` table
   - `habit_completions` table
   - `xp_transactions` table
   - `badges` table
   - `user_badges` table
   - `streak_history` table
4. Create migration files using Drizzle Kit
5. Set up database indexes for performance
6. Create seed data for development
7. Set up database connection pooling

**Must NOT do**:
- Do NOT create tables for Phase 2 features (AI, social, billing)
- Do NOT add soft delete columns (use hard delete for MVP)
- Do NOT create views or stored procedures

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.5, 1.9)
- **Blocks**: 1.3, 2.1, 2.5
- **Blocked By**: 1.1

**References**:
- Drizzle ORM docs: `https://orm.drizzle.team/docs/overview`
- PostgreSQL indexes: `https://www.postgresql.org/docs/current/indexes-types.html`
- Architecture plan schema: `.sisyphus/plans/liftoff-architecture-plan.md` Section G

**Acceptance Criteria**:
- [ ] `bun db:migrate` applies all migrations successfully
- [ ] `bun db:seed` populates development data
- [ ] All tables from schema exist in database
- [ ] Indexes created for: user_id, email, habit_id, completion_date
- [ ] Connection pooling configured (min: 5, max: 20)
- [ ] Test query returns results in <50ms

**Commit**: YES
- Message: `feat(db): implement core database schema with Drizzle ORM`
- Files: `src/db/schema.ts`, `src/db/migrations/*`, `src/db/seed.ts`

---

#### Task 1.3: Authentication System
**Duration**: 3 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Install NextAuth.js v5 (Auth.js)
2. Configure NextAuth with 3 providers:
   - Google OAuth
   - Facebook OAuth
   - Email/Password (Credentials)
3. Set up JWT session strategy
4. Create auth middleware for protected routes
5. Implement registration page
6. Implement login page
7. Implement password reset flow (magic link)
8. Create auth hooks (`useAuth`, `useSession`)
9. Add auth error handling

**Must NOT do**:
- Do NOT implement 2FA
- Do NOT implement email verification (defer to Phase 2)
- Do NOT add social login beyond Google/Facebook

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.6, 1.10)
- **Blocks**: 2.1, 2.9, 3.1, 4.1
- **Blocked By**: 1.2

**References**:
- NextAuth v5 docs: `https://authjs.dev/getting-started/installation`
- Google OAuth setup: `https://developers.google.com/identity/protocols/oauth2`
- Facebook Login: `https://developers.facebook.com/docs/facebook-login/web`

**Acceptance Criteria**:
- [ ] User can register with email/password
- [ ] User can login with email/password
- [ ] User can login with Google OAuth
- [ ] User can login with Facebook OAuth
- [ ] Protected routes redirect to login
- [ ] JWT token contains userId and subscription status
- [ ] Password reset email sends magic link
- [ ] Auth error messages display in French

**Commit**: YES
- Message: `feat(auth): implement NextAuth.js v5 with Google, Facebook, and email providers`
- Files: `src/lib/auth.ts`, `src/app/(auth)/**/*`, `src/middleware.ts`

---

#### Task 1.4: CI/CD Pipeline
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: git-master

**What to do**:
1. Create GitHub Actions workflow for CI:
   - Lint check (ESLint)
   - Type check (TypeScript)
   - Test run (bun test)
   - Build verification
2. Create GitHub Actions workflow for CD:
   - Deploy to Vercel on push to main
   - Preview deployments for PRs
3. Set up Vercel project configuration
4. Configure environment variables in Vercel
5. Set up branch protection rules
6. Create deployment documentation

**Must NOT do**:
- Do NOT set up staging environment yet (use preview deploys)
- Do NOT add complex deployment gates

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.7, 1.11)
- **Blocks**: None (ongoing)
- **Blocked By**: 1.1

**References**:
- Vercel deployment: `https://vercel.com/docs/concepts/deployments/overview`
- GitHub Actions: `https://docs.github.com/en/actions`

**Acceptance Criteria**:
- [ ] Push to main triggers deployment to production
- [ ] PR creates preview deployment
- [ ] CI checks must pass before merge
- [ ] Build fails if TypeScript errors exist
- [ ] Build fails if tests fail
- [ ] Deployment completes in <5 minutes

**Commit**: YES
- Message: `ci: setup GitHub Actions CI/CD pipeline with Vercel deployment`
- Files: `.github/workflows/ci.yml`, `.github/workflows/cd.yml`, `vercel.json`

---

#### Task 1.5: Design Tokens & Color System
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Set up Tailwind CSS configuration
2. Define color palette in CSS variables:
   - Primary: #E07A5F (Terracotta)
   - Secondary: #81B29A (Sage)
   - Accent: #F2CC8F (Sand)
   - Background: #F4F1DE (Cream)
   - Surface: #FFFFFF (White)
   - Text Primary: #3D405B (Slate)
   - Text Secondary: #6B7280 (Gray)
   - Error: #E07A5F
   - Success: #81B29A
3. Define typography scale (DM Sans, Outfit)
4. Define spacing scale
5. Define border radius scale
6. Define shadow scale
7. Create CSS variable file
8. Set up dark mode structure (disabled for Phase 1)

**Must NOT do**:
- Do NOT create custom components yet
- Do NOT implement dark mode (structure only)
- Do NOT add animations yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.2, 1.9)
- **Blocks**: 1.6, 1.7, 2.4
- **Blocked By**: 1.1

**References**:
- Tailwind config: `https://tailwindcss.com/docs/configuration`
- Architecture plan colors: `.sisyphus/plans/liftoff-architecture-plan.md` Section B.1

**Acceptance Criteria**:
- [ ] All colors accessible via `var(--color-*)` in CSS
- [ ] Tailwind config extends with custom colors
- [ ] Typography classes work (text-heading-1, text-body, etc.)
- [ ] Spacing scale defined (4px base)
- [ ] Color contrast meets WCAG 2.1 AA standards

**Commit**: YES
- Message: `feat(ui): implement design tokens and color system`
- Files: `tailwind.config.ts`, `src/styles/globals.css`, `src/styles/tokens.css`

---

#### Task 1.6: Base Component Library (shadcn/ui)
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux, typescript-programmer

**What to do**:
1. Initialize shadcn/ui in project
2. Install required components:
   - Button
   - Card
   - Input
   - Label
   - Select
   - Dialog
   - Toast
   - Avatar
   - Badge
   - Progress
   - Checkbox
   - RadioGroup
   - Slider
   - Switch
   - Tabs
3. Customize components with design tokens
4. Create component stories (if using Storybook)
5. Document component usage

**Must NOT do**:
- Do NOT create custom components beyond shadcn
- Do NOT add business logic to components
- Do NOT create habit-specific components yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.3, 1.10)
- **Blocks**: 2.4, 3.1-3.10
- **Blocked By**: 1.5

**References**:
- shadcn/ui: `https://ui.shadcn.com/docs/installation`
- Component docs: `https://ui.shadcn.com/docs/components/button`

**Acceptance Criteria**:
- [ ] All listed components installed and working
- [ ] Components use design token colors
- [ ] Button variants: default, secondary, destructive, outline, ghost
- [ ] Input states: default, focus, error, disabled
- [ ] Toast notifications work
- [ ] Components are TypeScript-typed

**Commit**: YES
- Message: `feat(ui): setup shadcn/ui component library with custom theme`
- Files: `src/components/ui/*`, `components.json`

---

#### Task 1.7: Mobile-First Layouts
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create responsive layout components:
   - Mobile container (max-width, padding)
   - Safe area insets for notched devices
   - Touch-friendly spacing
2. Set up viewport meta tags
3. Create mobile navigation shell
4. Define responsive breakpoints:
   - Mobile: < 640px (default)
   - Tablet: 640px - 1024px
   - Desktop: > 1024px
5. Create layout primitives (Stack, Grid, Flex)
6. Test on actual mobile devices

**Must NOT do**:
- Do NOT create full pages yet
- Do NOT add navigation logic yet
- Do NOT optimize for desktop first

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.4, 1.11)
- **Blocks**: 2.9, 3.8
- **Blocked By**: 1.6

**References**:
- Mobile-first CSS: `https://tailwindcss.com/docs/responsive-design`
- Viewport meta: `https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag`

**Acceptance Criteria**:
- [ ] Layout works on iPhone SE (375px width)
- [ ] Layout works on iPhone 14 Pro Max (430px width)
- [ ] Touch targets minimum 44x44px
- [ ] Safe area insets handled for notched devices
- [ ] No horizontal scroll on mobile
- [ ] Text readable at 16px minimum

**Commit**: YES
- Message: `feat(ui): implement mobile-first responsive layouts`
- Files: `src/components/layout/*`, `src/app/layout.tsx`

---

#### Task 1.8: Animation System (Framer Motion)
**Duration**: 1 day  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Install Framer Motion
2. Create animation presets:
   - Page transitions
   - Button press feedback
   - Card hover effects
   - Toast slide-in
   - Modal fade-in
3. Create animation utility hooks
4. Set up reduced motion support
5. Document animation usage

**Must NOT do**:
- Do NOT add complex animations (keep it simple)
- Do NOT animate layout shifts
- Do NOT disable animations for MVP

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.3, 1.10)
- **Blocks**: 3.1-3.10, 4.1-4.7
- **Blocked By**: 1.1

**References**:
- Framer Motion: `https://www.framer.com/motion/`
- Accessibility: `https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html`

**Acceptance Criteria**:
- [ ] Page transitions animate smoothly (200-300ms)
- [ ] Button press has tactile feedback
- [ ] Toast slides in from bottom
- [ ] Modal fades in with backdrop
- [ ] Reduced motion respected via `prefers-reduced-motion`

**Commit**: YES
- Message: `feat(ui): setup Framer Motion animation system`
- Files: `src/lib/animations.ts`, `src/components/animations/*`

---

#### Task 1.9: API Structure & Middleware
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Set up API route structure:
   - `/api/auth/*` - Authentication routes
   - `/api/habits/*` - Habit management
   - `/api/gamification/*` - XP, levels, badges
   - `/api/users/*` - User profile
2. Create API middleware:
   - Authentication check
   - Rate limiting
   - Request logging
   - Error handling
3. Set up Zod for request validation
4. Create API response utilities
5. Create API error classes
6. Document API conventions

**Must NOT do**:
- Do NOT implement business logic yet
- Do NOT add AI routes
- Do NOT add social routes

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.2, 1.5)
- **Blocks**: 2.1, 2.5
- **Blocked By**: 1.1

**References**:
- Next.js API routes: `https://nextjs.org/docs/app/building-your-application/routing/route-handlers`
- Zod validation: `https://zod.dev/`

**Acceptance Criteria**:
- [ ] API routes respond with proper HTTP status codes
- [ ] Zod validates all request bodies
- [ ] Unauthenticated requests return 401
- [ ] Rate limiting returns 429 after threshold
- [ ] Errors return JSON with message and code
- [ ] API logging captures method, path, status, duration

**Commit**: YES
- Message: `feat(api): setup API structure with middleware and validation`
- Files: `src/app/api/**/*`, `src/lib/api/*`, `src/middleware.ts`

---

#### Task 1.10: User Service
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Create user service layer:
   - `getUserById`
   - `getUserByEmail`
   - `createUser`
   - `updateUser`
   - `deleteUser`
2. Implement user profile API:
   - GET `/api/users/me`
   - PATCH `/api/users/me`
3. Create user hooks (`useUser`, `useUpdateUser`)
4. Add user validation schemas
5. Implement user profile UI page

**Must NOT do**:
- Do NOT add social features
- Do NOT add user search
- Do NOT add user admin functions

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.3, 1.6)
- **Blocks**: 2.1, 2.5
- **Blocked By**: 1.2

**References**:
- Service pattern: `.sisyphus/plans/liftoff-architecture-plan.md` Section F.3

**Acceptance Criteria**:
- [ ] User can view their profile
- [ ] User can update name and avatar
- [ ] User cannot update email (defer to Phase 2)
- [ ] User can delete account (soft delete)
- [ ] Profile page is mobile-responsive

**Commit**: YES
- Message: `feat(users): implement user service and profile management`
- Files: `src/services/user.ts`, `src/app/api/users/*`, `src/app/(dashboard)/profile/*`

---

#### Task 1.11: Error Handling & Logging
**Duration**: 1 day  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Create global error boundary
2. Set up error logging service (Sentry or custom)
3. Create error classes:
   - `AppError` (base)
   - `ValidationError`
   - `AuthenticationError`
   - `NotFoundError`
4. Implement error toast notifications
5. Create error pages (404, 500)
6. Add request error handling

**Must NOT do**:
- Do NOT add complex error recovery
- Do NOT add retry logic yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.4, 1.7)
- **Blocks**: All subsequent tasks
- **Blocked By**: 1.1

**References**:
- Error boundaries: `https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary`

**Acceptance Criteria**:
- [ ] Uncaught errors show error boundary UI
- [ ] API errors display user-friendly toast
- [ ] 404 page works for unknown routes
- [ ] 500 page works for server errors
- [ ] Errors are logged with stack trace
- [ ] Error messages are in French

**Commit**: YES
- Message: `feat(error): implement global error handling and logging`
- Files: `src/lib/error.ts`, `src/components/error-boundary.tsx`, `src/app/error.tsx`

---

#### Task 1.12: Test Infrastructure
**Duration**: 1 day  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Set up bun test runner
2. Create test utilities and helpers
3. Set up test database (SQLite in-memory or test Postgres)
4. Create test fixtures
5. Set up test environment variables
6. Create example test
7. Add test scripts to package.json

**Must NOT do**:
- Do NOT write all tests yet (just infrastructure)
- Do NOT set up E2E tests yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.2, 1.5)
- **Blocks**: 5.1-5.4
- **Blocked By**: 1.1

**References**:
- Bun testing: `https://bun.sh/docs/cli/test`

**Acceptance Criteria**:
- [ ] `bun test` runs without errors
- [ ] Example test passes
- [ ] Test database is isolated from dev database
- [ ] Test utilities available (factories, mocks)
- [ ] Coverage reporting configured

**Commit**: YES
- Message: `chore(test): setup bun test infrastructure`
- Files: `test/setup.ts`, `test/fixtures/*`, `test/utils.ts`

---

#### Task 1.13: i18n Setup (French)
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Install next-intl
2. Configure i18n routing
3. Create French message files:
   - `messages/fr.json`
   - Namespaced by feature (auth, habits, gamification, etc.)
4. Set up language provider
5. Create translation hooks
6. Translate all static strings
7. Set French as default locale
8. Add language switcher component (structure only)

**Must NOT do**:
- Do NOT add English translations yet (French only)
- Do NOT add Arabic/Derja (Phase 2)
- Do NOT implement RTL support

**Parallelization**:
- **Can Run In Parallel**: YES (with 1.3, 1.6, 1.10)
- **Blocks**: All UI tasks
- **Blocked By**: 1.1

**References**:
- next-intl: `https://next-intl-docs.vercel.app/docs/getting-started`

**Acceptance Criteria**:
- [ ] All UI strings use translation keys
- [ ] French translations complete for all features
- [ ] Language provider wraps app
- [ ] `useTranslations` hook works in components
- [ ] Default locale is French (`fr`)
- [ ] URL structure supports `/fr/*` routes

**Commit**: YES
- Message: `feat(i18n): setup French internationalization with next-intl`
- Files: `src/i18n/config.ts`, `messages/fr.json`, `src/components/language-switcher.tsx`

---

### WAVE 2: Core Features (Weeks 3-4)

---

#### Task 2.1: Habit CRUD API
**Duration**: 4 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Create habit service layer:
   - `createHabit`
   - `getHabitsByUser`
   - `getHabitById`
   - `updateHabit`
   - `deleteHabit`
2. Implement API routes:
   - GET `/api/habits` - List habits
   - POST `/api/habits` - Create habit
   - GET `/api/habits/:id` - Get habit
   - PATCH `/api/habits/:id` - Update habit
   - DELETE `/api/habits/:id` - Delete habit
3. Create Zod schemas for validation
4. Add pagination support
5. Add filtering (active, archived)
6. Write unit tests

**Must NOT do**:
- Do NOT add complex recurrence (daily/weekly only)
- Do NOT add habit templates API yet
- Do NOT add habit sharing

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.5, 2.9)
- **Blocks**: 2.2, 2.4
- **Blocked By**: 1.3

**References**:
- API spec: `.sisyphus/plans/liftoff-architecture-plan.md` Section H.2
- Database schema: `.sisyphus/plans/liftoff-architecture-plan.md` Section G.2

**Acceptance Criteria**:
- [ ] All CRUD endpoints return correct status codes
- [ ] Zod validates request bodies
- [ ] Pagination works (limit, offset)
- [ ] Filtering works (active=true/false)
- [ ] User can only access own habits
- [ ] Tests cover all endpoints (70% coverage)

**Commit**: YES
- Message: `feat(habits): implement habit CRUD API with validation`
- Files: `src/services/habit.ts`, `src/app/api/habits/*`, `test/habits/api.test.ts`

---

#### Task 2.2: Completion Tracking
**Duration**: 3 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Create completion service:
   - `completeHabit` (idempotent)
   - `uncompleteHabit`
   - `getCompletionsByDate`
   - `getCompletionStats`
2. Implement API routes:
   - POST `/api/habits/:id/complete`
   - DELETE `/api/habits/:id/complete`
3. Add idempotency check (prevent double completion)
4. Add date validation (no future dates)
5. Add grace period logic (2 hours after midnight)
6. Create completion history view
7. Write tests

**Must NOT do**:
- Do NOT add XP awarding yet (Task 2.5)
- Do NOT add streak updates yet (Task 2.8)
- Do NOT allow backdated completions

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.6)
- **Blocks**: 2.8
- **Blocked By**: 2.1

**References**:
- Completion table: `.sisyphus/plans/liftoff-architecture-plan.md` Section G.2

**Acceptance Criteria**:
- [ ] Completing habit creates completion record
- [ ] Same habit cannot be completed twice same day
- [ ] Uncompleting removes completion record
- [ ] Grace period allows completion until 2 AM
- [ ] Future dates rejected
- [ ] Completion shows in history

**Commit**: YES
- Message: `feat(habits): implement habit completion tracking with idempotency`
- Files: `src/services/completion.ts`, `src/app/api/habits/[id]/complete/*`

---

#### Task 2.3: Reminder System Infrastructure
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Add reminder fields to habit schema:
   - `reminder_time` (TIME)
   - `reminder_days` (ARRAY of integers)
2. Create reminder service:
   - `setReminder`
   - `getRemindersForUser`
   - `getDueReminders`
3. Create reminder API routes
4. Create reminder UI components
5. Set up reminder storage (localStorage for now)
6. Create reminder scheduling logic (client-side for MVP)

**Must NOT do**:
- Do NOT implement push notifications yet
- Do NOT implement email reminders
- Do NOT implement SMS reminders

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.6, 2.10)
- **Blocks**: None (infrastructure only)
- **Blocked By**: 2.1

**References**:
- Reminder fields: `.sisyphus/plans/liftoff-architecture-plan.md` Section G.2

**Acceptance Criteria**:
- [ ] User can set reminder time per habit
- [ ] User can select reminder days
- [ ] Reminders stored in database
- [ ] Reminder UI shows in habit form
- [ ] Client-side reminder check works

**Commit**: YES
- Message: `feat(habits): setup reminder system infrastructure`
- Files: `src/services/reminder.ts`, `src/components/habits/reminder-settings.tsx`

---

#### Task 2.4: Habit UI Components
**Duration**: 3 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux, typescript-programmer

**What to do**:
1. Create habit list component
2. Create habit card component
3. Create habit detail view
4. Create habit form (create/edit)
5. Create habit completion checkbox
6. Create habit category selector
7. Create habit color picker
8. Add loading states
9. Add error states
10. Add empty states

**Must NOT do**:
- Do NOT add habit analytics yet
- Do NOT add habit templates UI yet
- Do NOT add habit sharing UI

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.8)
- **Blocks**: 3.5
- **Blocked By**: 2.1

**References**:
- UI patterns: `.sisyphus/plans/liftoff-architecture-plan.md` Section B.3

**Acceptance Criteria**:
- [ ] Habit list displays all user habits
- [ ] Habit card shows name, category, streak, completion status
- [ ] Tapping habit opens detail view
- [ ] Create habit form validates inputs
- [ ] Edit habit updates correctly
- [ ] Delete habit confirms before action
- [ ] Completion checkbox toggles state
- [ ] All components mobile-responsive

**Commit**: YES
- Message: `feat(ui): implement habit UI components`
- Files: `src/components/habits/*`, `src/app/(dashboard)/habits/*`

---

#### Task 2.5: XP Calculation Engine
**Duration**: 3 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer, data-scientist

**What to do**:
1. Implement XP formulas:
   - `xpForLevel(level) = 100 * level^1.5`
   - `getLevelFromXP(xp)` - inverse calculation
   - `xpToNextLevel(xp, level)` - remaining XP
2. Create XP service:
   - `calculateHabitXP(habit, context)`
   - `awardXP(userId, action, amount, context)`
   - `getXPTransactions(userId)`
3. Add XP bonuses:
   - Streak bonus: `min(streak * 2, 20)`
   - Consistency bonus: `+10` if all habits completed
4. Create XP transaction table
5. Add XP audit logging
6. Write tests for all formulas

**Must NOT do**:
- Do NOT add anti-cheat yet
- Do NOT add daily XP caps yet
- Do NOT add XP purchases

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.1, 2.9)
- **Blocks**: 2.6, 2.8, 3.1
- **Blocked By**: 1.2

**References**:
- XP formula: `.sisyphus/plans/liftoff-architecture-plan.md` Section D.2
- XP table: `.sisyphus/plans/liftoff-architecture-plan.md` Section G.3

**Acceptance Criteria**:
- [ ] XP formula matches specification exactly
- [ ] Level 1 requires 100 XP
- [ ] Level 2 requires 283 XP
- [ ] Level 5 requires 1,118 XP
- [ ] XP transactions recorded in database
- [ ] Bonuses calculated correctly
- [ ] Tests verify all calculations

**Commit**: YES
- Message: `feat(gamification): implement XP calculation engine with formula 100*level^1.5`
- Files: `src/services/xp.ts`, `src/lib/gamification/formulas.ts`, `test/gamification/xp.test.ts`

---

#### Task 2.6: Level Progression System
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Create level service:
   - `checkLevelUp(userId)`
   - `getLevelProgress(userId)`
   - `getLevelTitle(level)`
2. Define level titles:
   - 1-10: Débutant (Bronze)
   - 11-25: Intermédiaire (Silver)
   - 26-50: Avancé (Gold)
   - 51-75: Expert (Platinum)
   - 76-100: Maître (Diamond)
   - 100+: Légende (Legend)
3. Add level up detection
4. Award level up bonus (200 XP)
5. Create level progress API
6. Write tests

**Must NOT do**:
- Do NOT add prestige system yet (Phase 2)
- Do NOT add level-specific rewards yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.2, 2.10)
- **Blocks**: 3.2
- **Blocked By**: 2.5

**References**:
- Level tiers: `.sisyphus/plans/liftoff-architecture-plan.md` Section D.3

**Acceptance Criteria**:
- [ ] Level up detected when XP threshold reached
- [ ] Level up bonus awarded (200 XP)
- [ ] Level titles display correctly
- [ ] Level progress percentage calculated
- [ ] Level 100 is maximum (for Phase 1)

**Commit**: YES
- Message: `feat(gamification): implement level progression system`
- Files: `src/services/level.ts`, `src/lib/gamification/levels.ts`

---

#### Task 2.7: 5 Badge System
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Define exactly 5 badges:
   - **Premiers Pas** (First Steps): Complete first habit
   - **Série de 3** (3-Day Streak): 3-day streak
   - **Série de 7** (Week Warrior): 7-day streak
   - **Série de 30** (Month Master): 30-day streak
   - **Tous les Jours** (Perfect Week): Complete all habits for 7 days
2. Create badge service:
   - `checkBadgeEligibility(userId, badgeCode)`
   - `awardBadge(userId, badgeCode)`
   - `getUserBadges(userId)`
3. Create badge definitions table
4. Create user_badges table
5. Add badge award triggers
6. Create badge UI components
7. Write tests

**Must NOT do**:
- Do NOT add more than 5 badges
- Do NOT add premium badges
- Do NOT add hidden badges

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.3, 2.10)
- **Blocks**: 3.3
- **Blocked By**: 2.5

**References**:
- Badge table: `.sisyphus/plans/liftoff-architecture-plan.md` Section G.3

**Acceptance Criteria**:
- [ ] Exactly 5 badges defined
- [ ] Badges awarded automatically when criteria met
- [ ] Badge award creates XP transaction
- [ ] User can view earned badges
- [ ] Locked badges show progress
- [ ] Badge icons display correctly

**Commit**: YES
- Message: `feat(gamification): implement 5-badge system with automatic awarding`
- Files: `src/services/badge.ts`, `src/lib/gamification/badges.ts`, `src/components/gamification/badge.tsx`

---

#### Task 2.8: Streak Tracking
**Duration**: 3 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Create streak service:
   - `calculateStreak(userId)`
   - `updateStreak(userId)`
   - `isStreakAtRisk(userId)`
   - `breakStreak(userId)`
2. Define streak rules:
   - Day boundary: Midnight Tunisia time (UTC+1)
   - Grace period: 2 hours (until 2 AM)
   - Requirement: Complete at least 1 habit
3. Create streak history table
4. Add streak to user stats
5. Create streak at-risk detection
6. Create streak UI components
7. Write tests

**Must NOT do**:
- Do NOT add streak freeze (premium feature)
- Do NOT add streak recovery
- Do NOT add streak sharing

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.4)
- **Blocks**: 3.3
- **Blocked By**: 2.2, 2.5

**References**:
- Streak rules: `.sisyphus/plans/liftoff-architecture-plan.md` Section D.5

**Acceptance Criteria**:
- [ ] Streak increments when habit completed daily
- [ ] Streak breaks when day missed
- [ ] Grace period allows completion until 2 AM
- [ ] At-risk detection triggers at 9 PM
- [ ] Streak history recorded
- [ ] Longest streak tracked

**Commit**: YES
- Message: `feat(gamification): implement streak tracking with at-risk detection`
- Files: `src/services/streak.ts`, `src/lib/gamification/streaks.ts`, `test/gamification/streak.test.ts`

---

#### Task 2.9: Dashboard Layout Shell
**Duration**: 3 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create dashboard layout component
2. Create header component:
   - Logo
   - User avatar
   - Settings link
3. Create navigation component:
   - Dashboard
   - Habits
   - Progress
   - Profile
4. Create main content area
5. Create footer (mobile: hidden)
6. Add responsive behavior
7. Add loading skeleton

**Must NOT do**:
- Do NOT add widgets yet
- Do NOT add real-time updates
- Do NOT add notifications panel

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.1, 2.5)
- **Blocks**: 3.5, 3.6, 3.7
- **Blocked By**: 1.3

**References**:
- Dashboard layout: `.sisyphus/plans/liftoff-architecture-plan.md` Section B.3

**Acceptance Criteria**:
- [ ] Dashboard layout responsive
- [ ] Header shows on all pages
- [ ] Navigation works on mobile and desktop
- [ ] Active nav item highlighted
- [ ] User avatar displays
- [ ] Settings accessible

**Commit**: YES
- Message: `feat(ui): create dashboard layout shell with navigation`
- Files: `src/app/(dashboard)/layout.tsx`, `src/components/dashboard/header.tsx`, `src/components/dashboard/nav.tsx`

---

#### Task 2.10: Navigation Components
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create bottom navigation (mobile)
2. Create side navigation (desktop)
3. Add navigation icons
4. Add active state styling
5. Add badge notifications (structure only)
6. Create navigation hook
7. Add smooth transitions

**Must NOT do**:
- Do NOT add notification badges yet
- Do NOT add navigation animations beyond basic

**Parallelization**:
- **Can Run In Parallel**: YES (with 2.2, 2.6)
- **Blocks**: 3.8
- **Blocked By**: 2.9

**Acceptance Criteria**:
- [ ] Bottom nav shows on mobile
- [ ] Side nav shows on desktop
- [ ] Active item highlighted
- [ ] Icons clear and tappable
- [ ] Navigation state persists

**Commit**: YES
- Message: `feat(ui): implement responsive navigation components`
- Files: `src/components/navigation/*`

---

### WAVE 3: Dashboard & Polish (Weeks 5-6)

---

#### Task 3.1: XP Progress Bar Component
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create XP progress bar component
2. Show current level
3. Show XP progress to next level
4. Show XP amount needed
5. Add level up animation
6. Add color coding by tier
7. Make it responsive
8. Add to dashboard

**Must NOT do**:
- Do NOT add XP history chart yet
- Do NOT add XP breakdown

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.2, 3.3)
- **Blocks**: 3.5
- **Blocked By**: 2.5, 2.6

**Acceptance Criteria**:
- [ ] Progress bar fills based on XP
- [ ] Current level displayed
- [ ] XP to next level shown
- [ ] Level up triggers animation
- [ ] Color matches tier (bronze, silver, etc.)

**Commit**: YES
- Message: `feat(ui): create XP progress bar component with level up animation`
- Files: `src/components/gamification/xp-progress-bar.tsx`

---

#### Task 3.2: Level Badge Component
**Duration**: 1 day  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create level badge component
2. Show level number
3. Show tier icon (bronze, silver, gold, etc.)
4. Add tooltip with level title
5. Make it scalable (different sizes)
6. Add to dashboard header

**Must NOT do**:
- Do NOT add level history
- Do NOT add level comparison

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.1, 3.3)
- **Blocks**: None
- **Blocked By**: 2.6

**Acceptance Criteria**:
- [ ] Badge shows level number
- [ ] Tier icon displays correctly
- [ ] Tooltip shows level title
- [ ] Multiple sizes work (sm, md, lg)

**Commit**: YES
- Message: `feat(ui): create level badge component`
- Files: `src/components/gamification/level-badge.tsx`

---

#### Task 3.3: Streak Card Component
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create streak card component
2. Show current streak count (large)
3. Show fire icon/animation
4. Show personal best
5. Show at-risk warning
6. Add tap to view history
7. Add to dashboard

**Must NOT do**:
- Do NOT add streak calendar yet
- Do NOT add streak freeze button

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.1, 3.2)
- **Blocks**: 3.5
- **Blocked By**: 2.8

**Acceptance Criteria**:
- [ ] Streak count prominently displayed
- [ ] Fire icon shows
- [ ] Personal best shown
- [ ] At-risk warning displays when applicable
- [ ] Card is tappable

**Commit**: YES
- Message: `feat(ui): create streak card component with at-risk warning`
- Files: `src/components/gamification/streak-card.tsx`

---

#### Task 3.4: Weekly Progress Ring
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create circular progress component
2. Show 7 segments (days of week)
3. Color code segments:
   - Green: All habits completed
   - Yellow: Some habits completed
   - Gray: No habits completed
4. Show percentage in center
5. Add day labels
6. Add to dashboard

**Must NOT do**:
- Do NOT add detailed day view
- Do NOT add trend comparison

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.5, 3.6)
- **Blocks**: None
- **Blocked By**: 2.1

**Acceptance Criteria**:
- [ ] 7 segments display
- [ ] Segments color-coded correctly
- [ ] Percentage shown in center
- [ ] Day labels visible
- [ ] Responsive sizing

**Commit**: YES
- Message: `feat(ui): create weekly progress ring component`
- Files: `src/components/gamification/weekly-ring.tsx`

---

#### Task 3.5: Habit Checklist Widget
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create habit checklist widget
2. Show today's habits
3. Show completion checkboxes
4. Show habit category icons
5. Show XP reward
6. Add completion animation
7. Add to dashboard

**Must NOT do**:
- Do NOT add habit reordering
- Do NOT add habit filtering

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.4, 3.6)
- **Blocks**: None
- **Blocked By**: 2.4, 2.9

**Acceptance Criteria**:
- [ ] Today's habits displayed
- [ ] Checkboxes toggle completion
- [ ] Category icons show
- [ ] XP reward visible
- [ ] Animation on completion

**Commit**: YES
- Message: `feat(ui): create habit checklist widget for dashboard`
- Files: `src/components/dashboard/habit-checklist.tsx`

---

#### Task 3.6: Today Summary Widget
**Duration**: 1 day  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create today summary widget
2. Show habits completed / total
3. Show XP earned today
4. Show completion percentage
5. Add encouraging message
6. Add to dashboard

**Must NOT do**:
- Do NOT add historical comparison
- Do NOT add trend graph

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.4, 3.5)
- **Blocks**: None
- **Blocked By**: 2.9

**Acceptance Criteria**:
- [ ] Habits completed / total shown
- [ ] XP earned today displayed
- [ ] Percentage calculated
- [ ] Message changes based on progress

**Commit**: YES
- Message: `feat(ui): create today summary widget`
- Files: `src/components/dashboard/today-summary.tsx`

---

#### Task 3.7: Weekly Stats Widget
**Duration**: 1 day  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create weekly stats widget
2. Show bar chart (completion by day)
3. Show total habits completed
4. Show total XP earned
5. Show comparison to last week
6. Add to dashboard

**Must NOT do**:
- Do NOT add detailed analytics
- Do NOT add export functionality

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.8)
- **Blocks**: None
- **Blocked By**: 2.9

**Acceptance Criteria**:
- [ ] Bar chart shows 7 days
- [ ] Total habits completed shown
- [ ] Total XP earned shown
- [ ] Comparison to last week visible

**Commit**: YES
- Message: `feat(ui): create weekly stats widget`
- Files: `src/components/dashboard/weekly-stats.tsx`

---

#### Task 3.8: Bottom Navigation (Mobile)
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create fixed bottom navigation bar
2. Add 4-5 navigation items:
   - Dashboard (home)
   - Habits
   - Progress
   - Profile
3. Add active state indicator
4. Add icons
5. Ensure safe area support
6. Add haptic feedback (if supported)

**Must NOT do**:
- Do NOT add more than 5 items
- Do NOT add notification badges yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.7)
- **Blocks**: None
- **Blocked By**: 2.10

**Acceptance Criteria**:
- [ ] Bottom nav fixed on mobile
- [ ] 4-5 items visible
- [ ] Active item highlighted
- [ ] Icons clear
- [ ] Safe area padding on notched devices

**Commit**: YES
- Message: `feat(ui): implement mobile bottom navigation`
- Files: `src/components/navigation/bottom-nav.tsx`

---

#### Task 3.9: Touch Targets Optimization
**Duration**: 1 day  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Audit all interactive elements
2. Ensure minimum 44x44px touch targets
3. Add spacing between touch targets
4. Test on actual devices
5. Fix any issues

**Must NOT do**:
- Do NOT change design significantly
- Do NOT add new features

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.10)
- **Blocks**: None
- **Blocked By**: 3.8

**Acceptance Criteria**:
- [ ] All buttons minimum 44x44px
- [ ] All checkboxes minimum 44x44px
- [ ] All navigation items minimum 44x44px
- [ ] Adequate spacing between targets
- [ ] Tested on iOS and Android

**Commit**: YES
- Message: `fix(ui): optimize touch targets for mobile (44x44px minimum)`
- Files: Various component files

---

#### Task 3.10: Responsive Polish
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Test on multiple screen sizes:
   - iPhone SE (375px)
   - iPhone 14 (390px)
   - iPhone 14 Pro Max (430px)
   - iPad (768px)
   - Desktop (1024px+)
2. Fix layout issues
3. Adjust font sizes
4. Adjust spacing
5. Test landscape mode
6. Document breakpoints

**Must NOT do**:
- Do NOT add desktop-specific features
- Do NOT change mobile-first approach

**Parallelization**:
- **Can Run In Parallel**: YES (with 3.9)
- **Blocks**: None
- **Blocked By**: 3.8

**Acceptance Criteria**:
- [ ] Layout works on all tested sizes
- [ ] No horizontal scroll
- [ ] Text readable at all sizes
- [ ] Images scale correctly
- [ ] Landscape mode works

**Commit**: YES
- Message: `style(ui): responsive design polish across all breakpoints`
- Files: Various CSS and component files

---

### WAVE 4: Onboarding (Weeks 7-8)

---

#### Task 4.1: Welcome Screen
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create welcome screen
2. Add logo animation
3. Add value proposition text
4. Add "Commencer" CTA button
5. Add social proof ("Rejoint par X utilisateurs")
6. Add background design
7. Make it mobile-optimized

**Must NOT do**:
- Do NOT add video background
- Do NOT add complex animations

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.2, 4.3)
- **Blocks**: 4.5
- **Blocked By**: 2.9

**Acceptance Criteria**:
- [ ] Logo displays prominently
- [ ] Value proposition clear
- [ ] CTA button visible
- [ ] Social proof shown
- [ ] Mobile-optimized layout

**Commit**: YES
- Message: `feat(onboarding): create welcome screen with logo animation`
- Files: `src/app/(onboarding)/welcome/page.tsx`

---

#### Task 4.2: Language Selection
**Duration**: 1 day  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create language selection screen
2. Show French option (default, pre-selected)
3. Show Arabic option (disabled for Phase 1)
4. Add large tappable cards
5. Add flags/icons
6. Save selection to user profile

**Must NOT do**:
- Do NOT enable Arabic yet
- Do NOT add auto-detection complexity

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.1, 4.3)
- **Blocks**: None
- **Blocked By**: 1.13

**Acceptance Criteria**:
- [ ] French option shown
- [ ] French pre-selected
- [ ] Arabic shown as "Bientôt disponible"
- [ ] Selection saves to profile
- [ ] Large tappable cards

**Commit**: YES
- Message: `feat(onboarding): create language selection screen`
- Files: `src/app/(onboarding)/language/page.tsx`

---

#### Task 4.3: Goal Selection UI
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create goal selection screen
2. Show 6 goal categories:
   - Fitness & Santé
   - Apprentissage & Études
   - Carrière & Productivité
   - Bien-être Mental
   - Finances Personnelles
   - Relations Sociales
3. Add visual cards with icons
4. Allow multi-select (max 3)
5. Show selection counter
6. Save to user profile

**Must NOT do**:
- Do NOT add custom goals
- Do NOT add more than 6 categories

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.1, 4.2)
- **Blocks**: None
- **Blocked By**: 2.9

**Acceptance Criteria**:
- [ ] 6 categories displayed
- [ ] Cards tappable
- [ ] Max 3 selections
- [ ] Counter shows selections
- [ ] Selections saved to profile

**Commit**: YES
- Message: `feat(onboarding): create goal selection UI with 6 categories`
- Files: `src/app/(onboarding)/goals/page.tsx`, `src/components/onboarding/goal-card.tsx`

---

#### Task 4.4: Account Creation Step
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux, typescript-programmer

**What to do**:
1. Create account creation screen
2. Show OAuth options (Google, Facebook)
3. Show email/password form
4. Add validation
5. Add "Skip for now" option
6. Award +50 XP for completion
7. Redirect to dashboard

**Must NOT do**:
- Do NOT add complex validation rules
- Do NOT add email verification yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.5)
- **Blocks**: None
- **Blocked By**: 1.3

**Acceptance Criteria**:
- [ ] OAuth buttons work
- [ ] Email form validates
- [ ] Password requirements shown
- [ ] Skip option available
- [ ] +50 XP awarded on completion
- [ ] Redirects to dashboard

**Commit**: YES
- Message: `feat(onboarding): create account creation step with OAuth and email`
- Files: `src/app/(onboarding)/account/page.tsx`

---

#### Task 4.5: Progressive Tutorial System
**Duration**: 3 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create tutorial overlay component
2. Create tutorial steps:
   - Step 1: Dashboard overview
   - Step 2: How to complete habits
   - Step 3: Understanding XP and levels
   - Step 4: Streaks explained
   - Step 5: Creating new habits
3. Add highlight boxes
4. Add tooltip text
5. Add navigation (next, skip)
6. Save progress to localStorage

**Must NOT do**:
- Do NOT add interactive tutorials
- Do NOT add video tutorials

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.4)
- **Blocks**: None
- **Blocked By**: 4.1

**Acceptance Criteria**:
- [ ] Tutorial overlay displays
- [ ] 5 steps complete
- [ ] Highlight boxes show correctly
- [ ] Tooltips readable
- [ ] Progress saved
- [ ] Skip option works

**Commit**: YES
- Message: `feat(onboarding): implement progressive tutorial system`
- Files: `src/components/tutorial/*`, `src/hooks/use-tutorial.ts`

---

#### Task 4.6: Contextual Help Tooltips
**Duration**: 1 day  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create tooltip component
2. Add help icons to complex features
3. Create tooltip content
4. Add hover/tap to show
5. Make it dismissible

**Must NOT do**:
- Do NOT add tooltips to every element
- Do NOT add walkthrough tooltips

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.5)
- **Blocks**: None
- **Blocked By**: 2.9

**Acceptance Criteria**:
- [ ] Tooltips show on interaction
- [ ] Content helpful and concise
- [ ] Dismissible
- [ ] Mobile-friendly

**Commit**: YES
- Message: `feat(ui): add contextual help tooltips`
- Files: `src/components/ui/tooltip.tsx`

---

#### Task 4.7: First Experience Optimization
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create first habit suggestion
2. Award +25 XP for first completion
3. Award "Premiers Pas" badge
4. Show celebration animation
5. Add "Invite friend" prompt
6. Optimize empty states

**Must NOT do**:
- Do NOT add complex AI suggestions
- Do NOT add friend invite functionality yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.6)
- **Blocks**: None
- **Blocked By**: 4.4

**Acceptance Criteria**:
- [ ] First habit suggested
- [ ] +25 XP awarded on first completion
- [ ] Badge awarded
- [ ] Celebration animation plays
- [ ] Invite prompt shown

**Commit**: YES
- Message: `feat(onboarding): optimize first experience with celebrations and rewards`
- Files: `src/components/onboarding/first-experience.tsx`

---

#### Task 4.8: Loading States
**Duration**: 2 days  
**Category**: visual-engineering  
**Skills**: frontend-ui-ux

**What to do**:
1. Create loading skeleton components
2. Add skeletons to:
   - Dashboard
   - Habit list
   - Profile
3. Create loading spinner component
4. Add loading states to buttons
5. Add shimmer effect
6. Ensure accessibility

**Must NOT do**:
- Do NOT add fake content
- Do NOT add progress bars

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.9)
- **Blocks**: None
- **Blocked By**: 2.9

**Acceptance Criteria**:
- [ ] Skeletons match content layout
- [ ] Shimmer animation smooth
- [ ] Loading states on all async actions
- [ ] Accessible (aria-busy)

**Commit**: YES
- Message: `feat(ui): implement loading states and skeletons`
- Files: `src/components/ui/skeleton.tsx`, `src/components/loading/*`

---

#### Task 4.9: Error Boundaries
**Duration**: 1 day  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Create error boundary component
2. Add to root layout
3. Add to dashboard layout
4. Create error fallback UI
5. Add retry functionality
6. Log errors

**Must NOT do**:
- Do NOT add complex recovery
- Do NOT add error reporting UI

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.8)
- **Blocks**: None
- **Blocked By**: 1.11

**Acceptance Criteria**:
- [ ] Error boundary catches errors
- [ ] Fallback UI displays
- [ ] Retry button works
- [ ] Errors logged
- [ ] User-friendly message

**Commit**: YES
- Message: `feat(error): implement React error boundaries`
- Files: `src/components/error-boundary.tsx`

---

#### Task 4.10: Performance Optimization
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Run Lighthouse audit
2. Optimize images
3. Code split routes
4. Lazy load components
5. Optimize bundle size
6. Add performance budgets
7. Document optimizations

**Must NOT do**:
- Do NOT add service workers yet
- Do NOT add complex caching

**Parallelization**:
- **Can Run In Parallel**: YES (with 4.8, 4.9)
- **Blocks**: None
- **Blocked By**: 3.10

**Acceptance Criteria**:
- [ ] Lighthouse score >90 mobile
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3s
- [ ] Bundle size <200KB (initial)
- [ ] Performance budgets set

**Commit**: YES
- Message: `perf: optimize performance for Lighthouse >90 score`
- Files: Various optimization configs

---

### WAVE 5: Testing & Launch Prep (Weeks 9-10)

---

#### Task 5.1: API Integration Tests
**Duration**: 3 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Write tests for auth API
2. Write tests for habits API
3. Write tests for gamification API
4. Write tests for user API
5. Test error cases
6. Test edge cases
7. Achieve 70% coverage

**Must NOT do**:
- Do NOT test UI components
- Do NOT test external services

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.2, 5.5)
- **Blocks**: 5.8
- **Blocked By**: 2.1, 2.5, 1.12

**Acceptance Criteria**:
- [ ] All API endpoints tested
- [ ] Error cases covered
- [ ] Edge cases covered
- [ ] 70% coverage achieved
- [ ] Tests run in CI

**Commit**: YES
- Message: `test(api): add integration tests for all API endpoints`
- Files: `test/api/*.test.ts`

---

#### Task 5.2: Component Unit Tests
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Write tests for habit components
2. Write tests for gamification components
3. Write tests for dashboard components
4. Write tests for form components
5. Test user interactions
6. Achieve 50% coverage

**Must NOT do**:
- Do NOT test all components (focus on critical)
- Do NOT test external libraries

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.1, 5.5)
- **Blocks**: None
- **Blocked By**: 1.12

**Acceptance Criteria**:
- [ ] Critical components tested
- [ ] User interactions tested
- [ ] 50% coverage achieved
- [ ] Tests run in CI

**Commit**: YES
- Message: `test(components): add unit tests for critical components`
- Files: `test/components/*.test.tsx`

---

#### Task 5.3: E2E Tests (Critical Paths)
**Duration**: 3 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Set up Playwright
2. Write E2E tests for:
   - User registration
   - User login
   - Create habit
   - Complete habit
   - View dashboard
   - Onboarding flow
3. Test on mobile viewport
4. Test on desktop viewport
5. Run in CI

**Must NOT do**:
- Do NOT test all flows
- Do NOT test error scenarios extensively

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.4)
- **Blocks**: 5.8
- **Blocked By**: 1.12

**Acceptance Criteria**:
- [ ] Critical paths tested
- [ ] Mobile viewport tested
- [ ] Desktop viewport tested
- [ ] Tests run in CI
- [ ] Screenshots on failure

**Commit**: YES
- Message: `test(e2e): add Playwright E2E tests for critical paths`
- Files: `e2e/*.spec.ts`, `playwright.config.ts`

---

#### Task 5.4: Performance Testing
**Duration**: 1 day  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Set up Lighthouse CI
2. Run performance benchmarks
3. Test API response times
4. Test database query performance
5. Document baselines
6. Set up performance alerts

**Must NOT do**:
- Do NOT load test yet
- Do NOT stress test yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.3)
- **Blocks**: 5.8
- **Blocked By**: 4.10

**Acceptance Criteria**:
- [ ] Lighthouse CI configured
- [ ] Performance baselines documented
- [ ] API response times <200ms
- [ ] Database queries <50ms
- [ ] Alerts configured

**Commit**: YES
- Message: `test(perf): setup performance testing and monitoring`
- Files: `.github/workflows/lighthouse.yml`, `test/performance/*`

---

#### Task 5.5: API Documentation
**Duration**: 1 day  
**Category**: quick  
**Skills**: typescript-programmer

**What to do**:
1. Document all API endpoints
2. Include request/response examples
3. Document error codes
4. Document authentication
5. Create API reference

**Must NOT do**:
- Do NOT use OpenAPI/Swagger yet
- Do NOT auto-generate docs

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.1, 5.2)
- **Blocks**: None
- **Blocked By**: 2.1, 2.5

**Acceptance Criteria**:
- [ ] All endpoints documented
- [ ] Examples provided
- [ ] Error codes listed
- [ ] Auth documented

**Commit**: YES
- Message: `docs: add API documentation`
- Files: `docs/api.md`

---

#### Task 5.6: Deployment Guide
**Duration**: 1 day  
**Category**: quick  
**Skills**: git-master

**What to do**:
1. Document environment setup
2. Document deployment process
3. Document rollback procedure
4. Document environment variables
5. Create deployment checklist

**Must NOT do**:
- Do NOT document Phase 2 features
- Do NOT add complex procedures

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.7)
- **Blocks**: None
- **Blocked By**: 1.4

**Acceptance Criteria**:
- [ ] Environment setup documented
- [ ] Deployment process clear
- [ ] Rollback procedure documented
- [ ] Checklist created

**Commit**: YES
- Message: `docs: add deployment guide`
- Files: `docs/deployment.md`

---

#### Task 5.7: Troubleshooting Guide
**Duration**: 1 day  
**Category**: quick  
**Skills**: git-master

**What to do**:
1. Document common errors
2. Document debugging steps
3. Document log locations
4. Document support contacts
5. Create FAQ

**Must NOT do**:
- Do NOT document hypothetical issues
- Do NOT add complex troubleshooting

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.6)
- **Blocks**: None
- **Blocked By**: 1.11

**Acceptance Criteria**:
- [ ] Common errors documented
- [ ] Debugging steps clear
- [ ] Log locations listed
- [ ] FAQ created

**Commit**: YES
- Message: `docs: add troubleshooting guide and FAQ`
- Files: `docs/troubleshooting.md`

---

#### Task 5.8: Production Environment Setup
**Duration**: 2 days  
**Category**: unspecified-high  
**Skills**: typescript-programmer, git-master

**What to do**:
1. Set up production database
2. Set up production environment variables
3. Configure production auth providers
4. Set up production domain
5. Configure SSL
6. Test production deployment
7. Verify all features work

**Must NOT do**:
- Do NOT enable analytics yet
- Do NOT enable monitoring yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.9)
- **Blocks**: 5.10
- **Blocked By**: 5.1, 5.3, 5.4

**Acceptance Criteria**:
- [ ] Production database created
- [ ] Environment variables configured
- [ ] Auth providers configured
- [ ] Domain configured
- [ ] SSL working
- [ ] Deployment successful
- [ ] All features tested

**Commit**: YES
- Message: `chore: setup production environment`
- Files: Environment configs (not in repo)

---

#### Task 5.9: Monitoring & Alerting
**Duration**: 1 day  
**Category**: unspecified-high  
**Skills**: typescript-programmer

**What to do**:
1. Set up error monitoring (Sentry)
2. Set up performance monitoring
3. Set up uptime monitoring
4. Configure alerts:
   - Error rate >1%
   - API response time >500ms
   - Database connection errors
   - 500 errors
5. Create alert runbook

**Must NOT do**:
- Do NOT add complex dashboards
- Do NOT add custom metrics yet

**Parallelization**:
- **Can Run In Parallel**: YES (with 5.8)
- **Blocks**: 5.10
- **Blocked By**: 5.8

**Acceptance Criteria**:
- [ ] Error monitoring active
- [ ] Performance monitoring active
- [ ] Uptime monitoring active
- [ ] Alerts configured
- [ ] Runbook created

**Commit**: YES
- Message: `chore: setup monitoring and alerting`
- Files: Monitoring configs

---

#### Task 5.10: Beta Launch Checklist
**Duration**: 1 day  
**Category**: quick  
**Skills**: git-master

**What to do**:
1. Create launch checklist
2. Verify all features
3. Verify all tests pass
4. Verify documentation complete
5. Verify monitoring active
6. Create rollback plan
7. Schedule launch

**Must NOT do**:
- Do NOT add new features
- Do NOT make last-minute changes

**Parallelization**:
- **Can Run In Parallel**: NO (final task)
- **Blocks**: LAUNCH
- **Blocked By**: 5.8, 5.9

**Acceptance Criteria**:
- [ ] Checklist complete
- [ ] All features verified
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Monitoring active
- [ ] Rollback plan ready

**Commit**: YES
- Message: `chore: complete beta launch checklist`
- Files: `docs/launch-checklist.md`

---

## File Structure Specification

```
my-app/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── cd.yml
│       └── lighthouse.yml
├── docs/
│   ├── api.md
│   ├── deployment.md
│   ├── troubleshooting.md
│   └── launch-checklist.md
├── e2e/
│   ├── auth.spec.ts
│   ├── habits.spec.ts
│   └── onboarding.spec.ts
├── messages/
│   └── fr.json
├── public/
│   ├── icons/
│   ├── images/
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── forgot-password/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── habits/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   ├── progress/
│   │   │   │   └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── (onboarding)/
│   │   │   ├── layout.tsx
│   │   │   ├── welcome/
│   │   │   │   └── page.tsx
│   │   │   ├── language/
│   │   │   │   └── page.tsx
│   │   │   ├── goals/
│   │   │   │   └── page.tsx
│   │   │   └── account/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── habits/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       └── complete/
│   │   │   │           └── route.ts
│   │   │   ├── gamification/
│   │   │   │   ├── xp/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── level/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── badges/
│   │   │   │   │   └── route.ts
│   │   │   │   └── streak/
│   │   │   │       └── route.ts
│   │   │   └── users/
│   │   │       └── me/
│   │   │           └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── skeleton.tsx
│   │   ├── habits/
│   │   │   ├── habit-list.tsx
│   │   │   ├── habit-card.tsx
│   │   │   ├── habit-form.tsx
│   │   │   ├── habit-detail.tsx
│   │   │   ├── completion-checkbox.tsx
│   │   │   └── reminder-settings.tsx
│   │   ├── gamification/
│   │   │   ├── xp-progress-bar.tsx
│   │   │   ├── level-badge.tsx
│   │   │   ├── streak-card.tsx
│   │   │   ├── weekly-ring.tsx
│   │   │   └── badge.tsx
│   │   ├── dashboard/
│   │   │   ├── header.tsx
│   │   │   ├── habit-checklist.tsx
│   │   │   ├── today-summary.tsx
│   │   │   └── weekly-stats.tsx
│   │   ├── navigation/
│   │   │   ├── bottom-nav.tsx
│   │   │   ├── side-nav.tsx
│   │   │   └── nav-link.tsx
│   │   ├── onboarding/
│   │   │   ├── goal-card.tsx
│   │   │   └── first-experience.tsx
│   │   ├── tutorial/
│   │   │   ├── tutorial-overlay.tsx
│   │   │   └── tutorial-step.tsx
│   │   ├── loading/
│   │   │   ├── page-loader.tsx
│   │   │   └── skeletons/
│   │   ├── error-boundary.tsx
│   │   └── animations/
│   │       └── page-transition.tsx
│   ├── db/
│   │   ├── index.ts
│   │   ├── schema.ts
│   │   ├── migrations/
│   │   │   └── 0000_initial.sql
│   │   └── seed.ts
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-user.ts
│   │   ├── use-habits.ts
│   │   ├── use-completions.ts
│   │   ├── use-gamification.ts
│   │   ├── use-tutorial.ts
│   │   └── use-local-storage.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   └── messages/
│   │       └── fr.json
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── errors.ts
│   │   │   └── validation.ts
│   │   ├── auth.ts
│   │   ├── error.ts
│   │   ├── utils.ts
│   │   └── animations.ts
│   ├── services/
│   │   ├── user.ts
│   │   ├── habit.ts
│   │   ├── completion.ts
│   │   ├── reminder.ts
│   │   ├── xp.ts
│   │   ├── level.ts
│   │   ├── badge.ts
│   │   └── streak.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── user.ts
│   │   ├── habit.ts
│   │   └── gamification.ts
│   └── styles/
│       ├── globals.css
│       └── tokens.css
├── test/
│   ├── setup.ts
│   ├── fixtures/
│   │   ├── users.ts
│   │   ├── habits.ts
│   │   └── completions.ts
│   ├── utils.ts
│   ├── api/
│   │   ├── auth.test.ts
│   │   ├── habits.test.ts
│   │   └── gamification.test.ts
│   ├── components/
│   │   └── habit-card.test.tsx
│   └── gamification/
│       ├── xp.test.ts
│       └── streak.test.ts
├── components.json
├── drizzle.config.ts
├── next.config.js
├── package.json
├── playwright.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Package.json Dependencies

```json
{
  "name": "liftoff",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "bun test",
    "test:watch": "bun test --watch",
    "test:coverage": "bun test --coverage",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "db:seed": "bun run src/db/seed.ts",
    "db:reset": "drizzle-kit drop && drizzle-kit migrate && bun run db:seed",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@auth/drizzle-adapter": "^1.0.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "drizzle-orm": "^0.29.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0",
    "next": "15.0.0",
    "next-auth": "5.0.0-beta.4",
    "next-intl": "^3.5.0",
    "postgres": "^3.4.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.22.4",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "autoprefixer": "^10.4.16",
    "drizzle-kit": "^0.20.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "15.0.0",
    "eslint-config-prettier": "^9.1.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "prettier-plugin-tailwindcss": "^0.5.9",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

---

## Database Migration Files Outline

### Migration 0000: Initial Schema

**File**: `src/db/migrations/0000_initial.sql`

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified TIMESTAMP,
  password_hash VARCHAR(255),
  name VARCHAR(100) NOT NULL,
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  location VARCHAR(100),
  timezone VARCHAR(50) DEFAULT 'Africa/Tunis',
  language VARCHAR(10) DEFAULT 'fr',
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  streak_start_date DATE,
  last_activity_date DATE,
  subscription_status VARCHAR(20) DEFAULT 'free',
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_active ON users(is_active, total_xp DESC) WHERE is_active = true;

-- OAuth accounts
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  UNIQUE(provider, provider_account_id)
);

-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL,
  session_token VARCHAR(255) UNIQUE NOT NULL
);

-- Verification tokens
CREATE TABLE verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires TIMESTAMP NOT NULL,
  UNIQUE(identifier, token)
);

-- Habits
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  color VARCHAR(7) DEFAULT '#E07A5F',
  icon VARCHAR(50),
  frequency_type VARCHAR(20) NOT NULL CHECK (frequency_type IN ('daily', 'weekly')),
  frequency_config JSONB,
  target_value INTEGER DEFAULT 1,
  target_unit VARCHAR(50),
  duration_minutes INTEGER,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  base_xp INTEGER DEFAULT 10,
  reminder_time TIME,
  reminder_days INTEGER[],
  is_active BOOLEAN DEFAULT true,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE
);

CREATE INDEX idx_habits_user ON habits(user_id);
CREATE INDEX idx_habits_active ON habits(user_id, is_active) WHERE is_active = true AND is_archived = false;

-- Habit completions
CREATE TABLE habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  completion_date DATE NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  value INTEGER DEFAULT 1,
  notes TEXT,
  xp_earned INTEGER DEFAULT 0,
  bonuses JSONB,
  completion_source VARCHAR(20) DEFAULT 'manual',
  ip_address INET,
  user_agent TEXT,
  UNIQUE(habit_id, completion_date)
);

CREATE INDEX idx_completions_user_date ON habit_completions(user_id, completion_date DESC);
CREATE INDEX idx_completions_habit ON habit_completions(habit_id, completion_date DESC);

-- XP transactions
CREATE TABLE xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  base_amount INTEGER NOT NULL,
  bonuses JSONB,
  reference_type VARCHAR(50),
  reference_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_xp_user ON xp_transactions(user_id, created_at DESC);

-- Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  tier VARCHAR(20) CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum', 'diamond')),
  icon_url TEXT,
  xp_bonus INTEGER DEFAULT 0,
  requirement_type VARCHAR(50),
  requirement_config JSONB,
  is_active BOOLEAN DEFAULT true
);

-- User badges
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT NOW(),
  shared_at TIMESTAMP,
  UNIQUE(user_id, badge_id)
);

CREATE INDEX idx_user_badges ON user_badges(user_id, earned_at DESC);

-- Streak history
CREATE TABLE streak_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  streak_start DATE NOT NULL,
  streak_end DATE NOT NULL,
  streak_length INTEGER NOT NULL,
  broken_at TIMESTAMP DEFAULT NOW(),
  broken_reason VARCHAR(50),
  UNIQUE(user_id, streak_start)
);
```

### Migration 0001: Seed Data

**File**: `src/db/migrations/0001_seed_badges.sql`

```sql
-- Insert 5 Phase 1 badges
INSERT INTO badges (code, name, description, category, tier, icon_url, xp_bonus, requirement_type, requirement_config) VALUES
('first_steps', 'Premiers Pas', 'Complétez votre première habitude', 'completion', 'bronze', '/badges/first-steps.svg', 25, 'habit_completed', '{"count": 1}'),
('streak_3', 'Série de 3', 'Maintenez une série de 3 jours', 'streak', 'bronze', '/badges/streak-3.svg', 50, 'streak', '{"days": 3}'),
('streak_7', 'Série de 7', 'Maintenez une série de 7 jours', 'streak', 'silver', '/badges/streak-7.svg', 100, 'streak', '{"days": 7}'),
('streak_30', 'Série de 30', 'Maintenez une série de 30 jours', 'streak', 'gold', '/badges/streak-30.svg', 500, 'streak', '{"days": 30}'),
('perfect_week', 'Tous les Jours', 'Complétez toutes vos habitudes pendant 7 jours', 'completion', 'silver', '/badges/perfect-week.svg', 150, 'perfect_week', '{"days": 7}');
```

---

## Environment Variables List

### Required for Development

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/liftoff_dev"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-app-id"
FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Liftoff"
```

### Required for Production

```bash
# Database (Neon or Supabase)
DATABASE_URL="postgresql://user:password@neon-host/liftoff_prod"
DATABASE_POOL_SIZE="20"

# NextAuth.js
NEXTAUTH_URL="https://liftoff.tn"
NEXTAUTH_SECRET="production-secret-key"

# OAuth Providers (Production)
GOOGLE_CLIENT_ID="prod-google-client-id"
GOOGLE_CLIENT_SECRET="prod-google-client-secret"
FACEBOOK_CLIENT_ID="prod-facebook-app-id"
FACEBOOK_CLIENT_SECRET="prod-facebook-app-secret"

# App Config
NEXT_PUBLIC_APP_URL="https://liftoff.tn"
NEXT_PUBLIC_APP_NAME="Liftoff"

# Monitoring (Sentry)
SENTRY_DSN="your-sentry-dsn"
SENTRY_ENVIRONMENT="production"

# Analytics (PostHog - Phase 2)
# NEXT_PUBLIC_POSTHOG_KEY=""
# NEXT_PUBLIC_POSTHOG_HOST=""
```

### Optional for Development

```bash
# Debug
DEBUG="liftoff:*"
LOG_LEVEL="debug"

# Test Database
TEST_DATABASE_URL="postgresql://user:password@localhost:5432/liftoff_test"
```

---

## Commit Strategy

| After Task | Commit Message | Files | Verification |
|------------|----------------|-------|--------------|
| 1.1 | `chore: initialize Next.js 15 project with TypeScript strict mode` | All initial files | `bun build` passes |
| 1.2 | `feat(db): implement core database schema with Drizzle ORM` | `src/db/*`, migrations | `bun db:migrate` works |
| 1.3 | `feat(auth): implement NextAuth.js v5 with Google, Facebook, and email providers` | `src/lib/auth.ts`, `src/app/(auth)/*` | Login works |
| 1.4 | `ci: setup GitHub Actions CI/CD pipeline with Vercel deployment` | `.github/workflows/*` | CI passes |
| 1.5 | `feat(ui): implement design tokens and color system` | `tailwind.config.ts`, `src/styles/*` | Colors render |
| 1.6 | `feat(ui): setup shadcn/ui component library with custom theme` | `src/components/ui/*` | Components work |
| 1.7 | `feat(ui): implement mobile-first responsive layouts` | `src/components/layout/*` | Mobile layout works |
| 1.8 | `feat(ui): setup Framer Motion animation system` | `src/lib/animations.ts` | Animations work |
| 1.9 | `feat(api): setup API structure with middleware and validation` | `src/app/api/*`, `src/lib/api/*` | API responds |
| 1.10 | `feat(users): implement user service and profile management` | `src/services/user.ts`, `src/app/(dashboard)/profile/*` | Profile works |
| 1.11 | `feat(error): implement global error handling and logging` | `src/lib/error.ts`, `src/components/error-boundary.tsx` | Errors handled |
| 1.12 | `chore(test): setup bun test infrastructure` | `test/*` | `bun test` passes |
| 1.13 | `feat(i18n): setup French internationalization with next-intl` | `src/i18n/*`, `messages/*` | French UI shows |
| 2.1 | `feat(habits): implement habit CRUD API with validation` | `src/services/habit.ts`, `src/app/api/habits/*` | API tests pass |
| 2.2 | `feat(habits): implement habit completion tracking with idempotency` | `src/services/completion.ts` | Completion works |
| 2.3 | `feat(habits): setup reminder system infrastructure` | `src/services/reminder.ts` | Reminders stored |
| 2.4 | `feat(ui): implement habit UI components` | `src/components/habits/*` | Components work |
| 2.5 | `feat(gamification): implement XP calculation engine with formula 100*level^1.5` | `src/services/xp.ts`, `src/lib/gamification/formulas.ts` | Tests pass |
| 2.6 | `feat(gamification): implement level progression system` | `src/services/level.ts` | Level up works |
| 2.7 | `feat(gamification): implement 5-badge system with automatic awarding` | `src/services/badge.ts` | Badges award |
| 2.8 | `feat(gamification): implement streak tracking with at-risk detection` | `src/services/streak.ts` | Streaks track |
| 2.9 | `feat(ui): create dashboard layout shell with navigation` | `src/app/(dashboard)/layout.tsx` | Layout works |
| 2.10 | `feat(ui): implement responsive navigation components` | `src/components/navigation/*` | Nav works |
| 3.1 | `feat(ui): create XP progress bar component with level up animation` | `src/components/gamification/xp-progress-bar.tsx` | Bar renders |
| 3.2 | `feat(ui): create level badge component` | `src/components/gamification/level-badge.tsx` | Badge shows |
| 3.3 | `feat(ui): create streak card component with at-risk warning` | `src/components/gamification/streak-card.tsx` | Card works |
| 3.4 | `feat(ui): create weekly progress ring component` | `src/components/gamification/weekly-ring.tsx` | Ring renders |
| 3.5 | `feat(ui): create habit checklist widget for dashboard` | `src/components/dashboard/habit-checklist.tsx` | Widget works |
| 3.6 | `feat(ui): create today summary widget` | `src/components/dashboard/today-summary.tsx` | Summary shows |
| 3.7 | `feat(ui): create weekly stats widget` | `src/components/dashboard/weekly-stats.tsx` | Stats display |
| 3.8 | `feat(ui): implement mobile bottom navigation` | `src/components/navigation/bottom-nav.tsx` | Nav works |
| 3.9 | `fix(ui): optimize touch targets for mobile (44x44px minimum)` | Various | Touch targets OK |
| 3.10 | `style(ui): responsive design polish across all breakpoints` | Various CSS | Responsive OK |
| 4.1 | `feat(onboarding): create welcome screen with logo animation` | `src/app/(onboarding)/welcome/*` | Welcome shows |
| 4.2 | `feat(onboarding): create language selection screen` | `src/app/(onboarding)/language/*` | Language works |
| 4.3 | `feat(onboarding): create goal selection UI with 6 categories` | `src/app/(onboarding)/goals/*` | Goals work |
| 4.4 | `feat(onboarding): create account creation step with OAuth and email` | `src/app/(onboarding)/account/*` | Account works |
| 4.5 | `feat(onboarding): implement progressive tutorial system` | `src/components/tutorial/*` | Tutorial works |
| 4.6 | `feat(ui): add contextual help tooltips` | `src/components/ui/tooltip.tsx` | Tooltips work |
| 4.7 | `feat(onboarding): optimize first experience with celebrations and rewards` | `src/components/onboarding/first-experience.tsx` | Experience works |
| 4.8 | `feat(ui): implement loading states and skeletons` | `src/components/loading/*`, `src/components/ui/skeleton.tsx` | Loading works |
| 4.9 | `feat(error): implement React error boundaries` | `src/components/error-boundary.tsx` | Boundaries work |
| 4.10 | `perf: optimize performance for Lighthouse >90 score` | Various configs | Lighthouse >90 |
| 5.1 | `test(api): add integration tests for all API endpoints` | `test/api/*` | 70% coverage |
| 5.2 | `test(components): add unit tests for critical components` | `test/components/*` | 50% coverage |
| 5.3 | `test(e2e): add Playwright E2E tests for critical paths` | `e2e/*` | E2E passes |
| 5.4 | `test(perf): setup performance testing and monitoring` | `test/performance/*` | Perf OK |
| 5.5 | `docs: add API documentation` | `docs/api.md` | Docs complete |
| 5.6 | `docs: add deployment guide` | `docs/deployment.md` | Guide complete |
| 5.7 | `docs: add troubleshooting guide and FAQ` | `docs/troubleshooting.md` | Guide complete |
| 5.8 | `chore: setup production environment` | Configs | Prod ready |
| 5.9 | `chore: setup monitoring and alerting` | Monitoring | Monitoring active |
| 5.10 | `chore: complete beta launch checklist` | `docs/launch-checklist.md` | Ready to launch |

---

## Success Criteria

### Phase 1 MVP Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Features Complete** | 100% | All 50 tasks done |
| **Test Coverage** | API 70%, Components 50% | Coverage report |
| **Lighthouse Score** | >90 mobile | Lighthouse CI |
| **Build Status** | Passing | CI/CD |
| **TypeScript** | Strict mode, 0 errors | `tsc --noEmit` |
| **i18n** | 100% French | String audit |
| **Mobile-First** | All breakpoints | Visual testing |
| **Documentation** | Complete | Docs review |

### Final Verification Commands

```bash
# Build verification
bun run build

# Type checking
bun run typecheck

# Linting
bun run lint

# Testing
bun test

# E2E testing
bun run e2e

# Performance
bun run lighthouse

# Database
bun run db:migrate
```

### Launch Readiness Checklist

- [ ] All 50 tasks complete
- [ ] All tests passing
- [ ] Lighthouse score >90
- [ ] Documentation complete
- [ ] Production environment ready
- [ ] Monitoring active
- [ ] Rollback plan documented
- [ ] Team trained on deployment
- [ ] Beta users identified
- [ ] Launch date scheduled

---

## Open Questions (Decisions Needed)

Before execution begins, the following decisions need to be made:

### 1. Database Hosting Provider
**Options**:
- **Neon**: Serverless PostgreSQL, generous free tier, branching
- **Supabase**: PostgreSQL + auth + storage, generous free tier

**Recommendation**: Neon for Phase 1 (simpler, better connection pooling)

### 2. Analytics Platform
**Options**:
- **PostHog**: Open-source, generous free tier, product analytics
- **Amplitude**: Industry standard, expensive
- **Mixpanel**: Good free tier, product analytics
- **None**: Defer to Phase 2

**Recommendation**: None for Phase 1 (focus on core features)

### 3. Exact 5 Badge Definitions
**Current Proposal**:
1. **Premiers Pas** (First Steps): Complete first habit
2. **Série de 3** (3-Day Streak): 3-day streak
3. **Série de 7** (Week Warrior): 7-day streak
4. **Série de 30** (Month Master): 30-day streak
5. **Tous les Jours** (Perfect Week): Complete all habits for 7 days

**Decision Needed**: Confirm or modify these 5 badges

### 4. OAuth Provider Availability
**Question**: Are Google and Facebook OAuth available in Tunisia without restrictions?

**Action**: Verify before Week 1 begins

### 5. Domain Name
**Question**: What is the production domain?

**Options**:
- liftoff.tn
- liftoff-app.tn
- liftoff-habits.tn

**Decision Needed**: Register domain before Week 8

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| NextAuth v5 instability | Medium | High | Test thoroughly in Week 1, have v4 fallback plan |
| Drizzle ORM limitations | Low | Medium | Verify all needed features in Week 1 spike |
| Mobile performance issues | Medium | High | Performance budget from Week 1, test on real devices |
| OAuth provider issues | Medium | High | Verify Tunisia availability early, have email-only fallback |
| Scope creep | High | High | Strict guardrails, weekly scope reviews |
| Team velocity lower than expected | Medium | High | Buffer in schedule, prioritize critical path |
| Database performance | Low | Medium | Indexes from start, query optimization in Week 6 |

---

## Next Steps

1. **Review and approve this plan**
2. **Answer open questions** (database provider, badges, domain)
3. **Run `/start-work`** to begin execution
4. **Assign tasks** to implementation agents
5. **Begin Wave 1** (Foundation)

---

**Plan Generated**: January 30, 2025  
**Ready for Execution**: Yes  
**Estimated Duration**: 10 weeks  
**Total Tasks**: 50  
**Critical Path**: 34 days
