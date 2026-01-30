# Liftoff Phase 2: AI, Social, Payments & Language Support

## Executive Summary

**Phase 2 Scope**: AI Coach (GPT-4o/Gemini), Social Features (Friends, Leaderboards, Challenges), Tunisian Payment Integration (Flouci/D17/Orange Money), and Tunisian Derja Language Support

**Estimated Duration**: 8-10 weeks  
**Parallel Execution Waves**: 4 major waves with 15+ parallel task groups  
**Critical Path**: Database Schema → AI Infrastructure → Social Core → Payment Integration → Language Support

---

## Current State Analysis

### Phase 1 Foundation (Complete)
- **Stack**: Next.js 16.1.6, React 19.2.3, TypeScript, Drizzle ORM, PostgreSQL
- **Auth**: NextAuth v5 with Google/Facebook OAuth + Credentials
- **Features**: Habits, Gamification (XP, Levels, Badges, Streaks), Dashboard
- **i18n**: French only (next-intl), prepared for multi-language
- **Testing**: Vitest configured, minimal test coverage
- **Build**: 12 routes, passing build

### Existing Database Schema
```typescript
// Key tables from Phase 1:
- users (with gamification fields: totalXp, level, currentStreak, etc.)
- habits, habitCompletions
- badges, userBadges
- xpTransactions, streakHistory
- accounts, sessions (NextAuth)
```

---

## Phase 2 Work Breakdown

### WAVE 1: Foundation & Infrastructure (Week 1-2)
**Theme**: Database migrations, core infrastructure, shared utilities

#### Task 1.1: Database Schema Extensions - Social Features
**Category**: `unspecified-high`  
**Skills**: Database Design, Drizzle ORM, PostgreSQL  
**Estimated Effort**: 2 days  
**Dependencies**: None

**What to do**:
- Add social feature tables to `src/db/schema.ts`:
  - `friendships` (requesterId, addresseeId, status, requestedAt, respondedAt)
  - `privacySettings` (userId, profileVisibility, activityVisibility, allowLeaderboard, etc.)
  - `activities` (actorId, type, referenceType, metadata, visibility)
  - `feedItems` (userId, activityId, isRead)
  - `activityReactions` (activityId, userId, reactionType)
  - `challenges` (creatorId, title, type, config, startDate, endDate, xpReward)
  - `challengeParticipants` (challengeId, userId, progress, target)
- Add enums: friendRequestStatus, profileVisibility, activityVisibility, challengeType
- Update relations in existing tables
- Generate migration: `npm run db:generate`
- Run migration: `npm run db:migrate`

**Must NOT do**:
- Don't modify existing Phase 1 tables (only add relations)
- Don't create indexes yet (will be Task 1.4)

**Acceptance Criteria**:
- [ ] All new tables defined in schema.ts
- [ ] `npm run db:generate` produces valid migration
- [ ] Migration runs successfully without errors
- [ ] `drizzle-kit studio` shows all new tables

**Files to modify**:
- `src/db/schema.ts` (add tables, enums, relations)
- `src/db/index.ts` (export new types)

**Commit**: `feat(db): add social features schema`

---

#### Task 1.2: Database Schema Extensions - AI & Payments
**Category**: `unspecified-high`  
**Skills**: Database Design, Drizzle ORM  
**Estimated Effort**: 2 days  
**Dependencies**: Task 1.1

**What to do**:
- Add AI-related tables:
  - `aiConversations` (userId, sessionId, model, context)
  - `aiMessages` (conversationId, role, content, tokensUsed)
  - `aiRecommendations` (userId, type, content, accepted, createdAt)
- Add payment/subscription tables:
  - `subscriptionTiers` (name, priceAmount, priceCurrency, billingInterval, features)
  - `subscriptions` (userId, tierId, status, currentPeriodStart/End, provider)
  - `payments` (subscriptionId, amount, currency, status, provider, providerPaymentId)
  - `paymentMethods` (userId, type, providerToken, isDefault)
- Add language support tables:
  - `userLanguagePreferences` (userId, primaryLanguage, fallbackChain)

**Acceptance Criteria**:
- [ ] AI tables defined with proper foreign keys
- [ ] Payment tables support Flouci/Orange Money/D17
- [ ] All migrations generate and run successfully
- [ ] Types exported from db/index.ts

**Files to modify**:
- `src/db/schema.ts`
- `src/db/index.ts`

**Commit**: `feat(db): add ai, payments, and language schema`

---

#### Task 1.3: Environment Configuration Setup
**Category**: `quick`  
**Skills**: DevOps, Security  
**Estimated Effort**: 0.5 days  
**Dependencies**: None

**What to do**:
- Create `.env.example` with all Phase 2 environment variables:
  - OpenAI: `OPENAI_API_KEY`, `OPENAI_ORG_ID`
  - Google Gemini: `GOOGLE_AI_API_KEY`
  - Flouci: `FLOUCI_PUBLIC_KEY`, `FLOUCI_PRIVATE_KEY`, `FLOUCI_WEBHOOK_SECRET`
  - Orange Money: `ORANGE_MONEY_MERCHANT_ID`, `ORANGE_MONEY_API_KEY`
  - Rate Limiting: `REDIS_URL` (for production)
  - AI Features: `AI_RATE_LIMIT_PER_MINUTE`, `AI_MAX_TOKENS`
- Update `.gitignore` to exclude `.env.local`, `.env.production`
- Add validation in `src/lib/env.ts` using Zod

**Acceptance Criteria**:
- [ ] `.env.example` created with all required variables
- [ ] Environment validation schema in `src/lib/env.ts`
- [ ] App fails gracefully with clear error if required env vars missing

**Files to create**:
- `.env.example`
- `src/lib/env.ts`

**Commit**: `chore(config): add Phase 2 environment variables`

---

#### Task 1.4: Database Index Optimization
**Category**: `quick`  
**Skills**: PostgreSQL, Performance  
**Estimated Effort**: 0.5 days  
**Dependencies**: Task 1.1, Task 1.2

**What to do**:
- Add performance indexes for social features:
  - `friendships`: (requesterId, status), (addresseeId, status)
  - `feedItems`: (userId, createdAt), (userId, isRead)
  - `activities`: (actorId, createdAt), (visibility)
  - `challengeParticipants`: (challengeId, progress DESC)
- Add indexes for AI:
  - `aiMessages`: (conversationId, createdAt)
- Add indexes for payments:
  - `payments`: (userId, createdAt), (providerPaymentId)

**Acceptance Criteria**:
- [ ] All indexes defined in schema
- [ ] Migration generated and applied
- [ ] Query performance verified (EXPLAIN ANALYZE)

**Commit**: `perf(db): add indexes for social, ai, and payments`

---

### WAVE 2: AI Features (Week 2-4)
**Theme**: AI Coach chat, recommendations, streaming infrastructure

#### Task 2.1: AI SDK Integration & Provider Setup
**Category**: `unspecified-high`  
**Skills**: AI Integration, Vercel AI SDK  
**Estimated Effort**: 2 days  
**Dependencies**: Task 1.3

**What to do**:
- Install dependencies:
  ```bash
  npm install ai @ai-sdk/openai @ai-sdk/google
  ```
- Create AI provider configuration:
  - `src/lib/ai/providers.ts`: Configure OpenAI GPT-4o and Google Gemini
  - `src/lib/ai/models.ts`: Model selection logic (French → GPT-4o, Arabic → Gemini)
- Create rate limiting middleware:
  - `src/lib/ai/rate-limiter.ts`: Token bucket implementation
  - Redis-based for production, in-memory for dev

**Must NOT do**:
- Don't hardcode API keys
- Don't skip rate limiting (cost control)

**Acceptance Criteria**:
- [ ] `ai` package installed
- [ ] Provider config loads API keys from env
- [ ] Rate limiter blocks requests after limit exceeded
- [ ] Unit tests for rate limiter

**Files to create**:
- `src/lib/ai/providers.ts`
- `src/lib/ai/models.ts`
- `src/lib/ai/rate-limiter.ts`
- `src/lib/ai/__tests__/rate-limiter.test.ts`

**Commit**: `feat(ai): setup AI SDK with OpenAI and Gemini`

---

#### Task 2.2: AI Coach Chat API Route
**Category**: `unspecified-high`  
**Skills**: Next.js API Routes, Streaming, AI  
**Estimated Effort**: 3 days  
**Dependencies**: Task 2.1

**What to do**:
- Create streaming chat endpoint:
  - `src/app/api/ai/chat/route.ts`: POST handler with streaming
  - Support both OpenAI and Gemini providers
  - Implement conversation context loading
  - Add user context (habits, progress, preferences)
- Create system prompts:
  - `src/lib/ai/prompts/coach.ts`: Nutrition/Wellness coach persona
  - French and Arabic versions
- Implement context management:
  - Load user's habits, recent completions, streak data
  - Include in system prompt for personalization

**API Contract**:
```typescript
POST /api/ai/chat
Body: {
  messages: { role: 'user' | 'assistant', content: string }[];
  provider?: 'openai' | 'google';
  conversationId?: string;
}
Response: Streaming text (Vercel AI SDK format)
```

**Acceptance Criteria**:
- [ ] Chat endpoint returns streaming response
- [ ] Context includes user's habits and progress
- [ ] Rate limiting enforced (10 req/min per user)
- [ ] Falls back to alternative provider on failure
- [ ] Error handling returns user-friendly messages

**Files to create**:
- `src/app/api/ai/chat/route.ts`
- `src/lib/ai/prompts/coach.ts`
- `src/lib/ai/context.ts`

**Commit**: `feat(ai): implement streaming chat endpoint`

---

#### Task 2.3: AI Chat UI Component
**Category**: `visual-engineering`  
**Skills**: React, UI/UX, Streaming UI  
**Estimated Effort**: 3 days  
**Dependencies**: Task 2.2

**What to do**:
- Create chat interface:
  - `src/components/ai/chat-interface.tsx`: Main chat container
  - `src/components/ai/chat-message.tsx`: Individual message bubble
  - `src/components/ai/chat-input.tsx`: Input with send button
- Implement streaming message display:
  - Use `useChat` hook from `@ai-sdk/react`
  - Show typing indicator during streaming
  - Support markdown rendering for responses
- Add chat history:
  - Load previous messages from `aiMessages` table
  - Pagination for long conversations
- Create chat page:
  - `src/app/(dashboard)/coach/page.tsx`: Full-page chat interface

**UI Requirements**:
- Mobile-first design (matches existing app style)
- Message bubbles: User (right, blue), AI (left, gray)
- Input at bottom with send button
- Scroll to bottom on new messages
- Empty state with suggested prompts

**Acceptance Criteria**:
- [ ] Chat UI matches design system
- [ ] Messages stream in real-time
- [ ] Previous conversations load from database
- [ ] Mobile responsive
- [ ] Accessible (keyboard navigation, screen readers)

**Files to create**:
- `src/components/ai/chat-interface.tsx`
- `src/components/ai/chat-message.tsx`
- `src/components/ai/chat-input.tsx`
- `src/app/(dashboard)/coach/page.tsx`

**Commit**: `feat(ui): add AI coach chat interface`

---

#### Task 2.4: Personalized Habit Recommendations
**Category**: `unspecified-high`  
**Skills**: AI, Data Analysis  
**Estimated Effort**: 2 days  
**Dependencies**: Task 2.1

**What to do**:
- Create recommendation engine:
  - `src/lib/ai/recommendations.ts`: Generate habit suggestions
  - Analyze user's existing habits, categories, completion patterns
  - Use AI to suggest new habits based on goals
- Create recommendation API:
  - `src/app/api/ai/recommendations/route.ts`: GET endpoint
  - Returns 3-5 personalized suggestions
  - Cache recommendations (1 hour TTL)
- Add recommendation UI:
  - `src/components/ai/habit-recommendations.tsx`: Card component
  - Show on dashboard and habits page
  - One-click to create habit from recommendation

**Acceptance Criteria**:
- [ ] Recommendations based on user's habit history
- [ ] API returns cached results for performance
- [ ] UI allows one-click habit creation
- [ ] Recommendations refresh daily

**Files to create**:
- `src/lib/ai/recommendations.ts`
- `src/app/api/ai/recommendations/route.ts`
- `src/components/ai/habit-recommendations.tsx`

**Commit**: `feat(ai): add personalized habit recommendations`

---

#### Task 2.5: Natural Language Progress Summaries
**Category**: `unspecified-high`  
**Skills**: AI, Data Aggregation  
**Estimated Effort**: 2 days  
**Dependencies**: Task 2.1

**What to do**:
- Create progress summary generator:
  - `src/lib/ai/summaries.ts`: Generate weekly/monthly summaries
  - Aggregate completion data, streak info, XP earned
  - Use AI to write natural language summary
- Create summary API:
  - `src/app/api/ai/summaries/route.ts`: GET with period param
  - Cache summaries (24 hour TTL)
- Add summary UI:
  - `src/components/ai/progress-summary.tsx`: Summary card
  - Show on progress page
  - Support weekly and monthly views

**Acceptance Criteria**:
- [ ] Summaries include completion rate, streak, XP
- [ ] Natural language generation (not template-based)
- [ ] Cached for performance
- [ ] UI integrated into progress page

**Files to create**:
- `src/lib/ai/summaries.ts`
- `src/app/api/ai/summaries/route.ts`
- `src/components/ai/progress-summary.tsx`

**Commit**: `feat(ai): add natural language progress summaries`

---

#### Task 2.6: Context-Aware Motivational Messages
**Category**: `quick`  
**Skills**: AI, UX Writing  
**Estimated Effort**: 1 day  
**Dependencies**: Task 2.1

**What to do**:
- Create motivational message generator:
  - `src/lib/ai/motivation.ts`: Generate contextual messages
  - Triggers: streak at risk, milestone reached, morning greeting
  - Use AI for variety (not hardcoded)
- Add to dashboard:
  - Show motivational banner based on context
  - Update throughout the day

**Acceptance Criteria**:
- [ ] Messages contextually relevant
- [ ] Generated via AI (not template)
- [ ] Show in dashboard header

**Files to create**:
- `src/lib/ai/motivation.ts`
- Update `src/components/dashboard/header.tsx`

**Commit**: `feat(ai): add contextual motivational messages`

---

### WAVE 3: Social Features (Week 4-6)
**Theme**: Friends, leaderboards, challenges, social feed

#### Task 3.1: Privacy Settings Service & API
**Category**: `unspecified-high`  
**Skills**: Backend, Privacy  
**Estimated Effort**: 2 days  
**Dependencies**: Task 1.1

**What to do**:
- Create privacy service:
  - `src/services/privacy.ts`: CRUD for privacy settings
  - Default to most restrictive settings
  - Helper functions: `canViewProfile()`, `canViewActivity()`
- Create privacy API:
  - `src/app/api/privacy/route.ts`: GET, PATCH endpoints
  - `src/app/api/privacy/defaults/route.ts`: GET default settings
- Add privacy checks to existing endpoints:
  - Update user profile API to respect privacy
  - Update dashboard to respect activity visibility

**Acceptance Criteria**:
- [ ] Privacy settings CRUD working
- [ ] Default settings are restrictive (friends_only)
- [ ] Existing endpoints respect privacy settings
- [ ] Unit tests for privacy helpers

**Files to create**:
- `src/services/privacy.ts`
- `src/app/api/privacy/route.ts`
- `src/lib/privacy.ts` (helpers)

**Commit**: `feat(social): implement privacy settings`

---

#### Task 3.2: Friend System Service & API
**Category**: `unspecified-high`  
**Skills**: Backend, Social Features  
**Estimated Effort**: 3 days  
**Dependencies**: Task 3.1

**What to do**:
- Create friendship service:
  - `src/services/friendship.ts`: Send, accept, decline, block
  - Search users by username/email
  - List friends, pending requests
- Create friendship API:
  - `src/app/api/friends/route.ts`: GET (list), POST (send request)
  - `src/app/api/friends/search/route.ts`: GET search
  - `src/app/api/friends/requests/route.ts`: GET pending
  - `src/app/api/friends/[id]/accept/route.ts`: POST
  - `src/app/api/friends/[id]/decline/route.ts`: POST
  - `src/app/api/friends/[id]/block/route.ts`: POST
  - `src/app/api/friends/[id]/remove/route.ts`: DELETE
- Add notifications:
  - Create notification on friend request
  - Create notification on request accepted

**Acceptance Criteria**:
- [ ] Send friend request by username/email
- [ ] Accept/decline/block/remove friends
- [ ] Search users (respects privacy settings)
- [ ] List friends and pending requests
- [ ] Notifications created for friend events

**Files to create**:
- `src/services/friendship.ts`
- `src/app/api/friends/**/route.ts` (multiple files)
- `src/services/notification.ts` (if not exists)

**Commit**: `feat(social): implement friend system`

---

#### Task 3.3: Friend System UI
**Category**: `visual-engineering`  
**Skills**: React, UI/UX  
**Estimated Effort**: 3 days  
**Dependencies**: Task 3.2

**What to do**:
- Create friend management UI:
  - `src/components/friends/friend-list.tsx`: List with actions
  - `src/components/friends/friend-search.tsx`: Search and add
  - `src/components/friends/friend-requests.tsx`: Pending requests
  - `src/components/friends/friend-card.tsx`: Individual friend display
- Create friends page:
  - `src/app/(dashboard)/friends/page.tsx`: Main friends interface
- Add to navigation:
  - Add "Friends" to bottom navigation
  - Show notification badge for pending requests

**UI Requirements**:
- Search with debounced input
- Friend cards show avatar, name, level, streak
- Actions: Message (placeholder), Remove, Block
- Request cards: Accept/Decline buttons

**Acceptance Criteria**:
- [ ] Search users and send requests
- [ ] View and manage friend list
- [ ] Accept/decline pending requests
- [ ] Mobile responsive
- [ ] Real-time updates (poll every 30s)

**Files to create**:
- `src/components/friends/*.tsx`
- `src/app/(dashboard)/friends/page.tsx`
- Update `src/components/navigation/bottom-nav.tsx`

**Commit**: `feat(ui): add friend management interface`

---

#### Task 3.4: Leaderboard Service & API
**Category**: `unspecified-high`  
**Skills**: Backend, Data Aggregation  
**Estimated Effort**: 3 days  
**Dependencies**: Task 3.1, Task 3.2

**What to do**:
- Create leaderboard service:
  - `src/services/leaderboard.ts`: Calculate and retrieve rankings
  - Support scopes: global, friends, regional
  - Support periods: weekly, monthly, all-time
  - Respect privacy settings (only users with allowLeaderboard=true)
- Create leaderboard API:
  - `src/app/api/leaderboard/route.ts`: GET with scope and period params
  - Returns top 100 + user's rank
- Create leaderboard calculation job:
  - `src/jobs/calculate-leaderboards.ts`: Scheduled job
  - Calculate daily/weekly snapshots
  - Store in `leaderboardEntries` table

**API Contract**:
```typescript
GET /api/leaderboard?scope=global|friends|regional&period=weekly|monthly|all-time
Response: {
  entries: [{ rank, userId, name, avatarUrl, totalXp, level, streak }],
  userRank: { rank, score } | null
}
```

**Acceptance Criteria**:
- [ ] Leaderboard calculated for all scopes/periods
- [ ] Privacy settings respected
- [ ] User's rank included even if not in top 100
- [ ] Scheduled job runs daily
- [ ] API returns cached results

**Files to create**:
- `src/services/leaderboard.ts`
- `src/app/api/leaderboard/route.ts`
- `src/jobs/calculate-leaderboards.ts`

**Commit**: `feat(social): implement leaderboard system`

---

#### Task 3.5: Leaderboard UI
**Category**: `visual-engineering`  
**Skills**: React, UI/UX  
**Estimated Effort**: 2 days  
**Dependencies**: Task 3.4

**What to do**:
- Create leaderboard UI:
  - `src/components/leaderboard/leaderboard-table.tsx`: Rankings list
  - `src/components/leaderboard/leaderboard-filters.tsx`: Scope/period tabs
  - `src/components/leaderboard/leaderboard-card.tsx`: User rank card
- Create leaderboard page:
  - `src/app/(dashboard)/leaderboard/page.tsx`: Full leaderboard view
- Add to navigation:
  - Add "Leaderboard" to bottom navigation

**UI Requirements**:
- Tabs for scope (Global, Friends, Regional)
- Tabs for period (Weekly, Monthly, All Time)
- Highlight current user's row
- Top 3 special styling (gold, silver, bronze)
- Pull to refresh

**Acceptance Criteria**:
- [ ] Display leaderboard with filters
- [ ] Highlight current user
- [ ] Top 3 styled differently
- [ ] Mobile responsive
- [ ] Loading and empty states

**Files to create**:
- `src/components/leaderboard/*.tsx`
- `src/app/(dashboard)/leaderboard/page.tsx`
- Update `src/components/navigation/bottom-nav.tsx`

**Commit**: `feat(ui): add leaderboard interface`

---

#### Task 3.6: Challenges Service & API
**Category**: `unspecified-high`  
**Skills**: Backend, Gamification  
**Estimated Effort**: 3 days  
**Dependencies**: Task 3.1

**What to do**:
- Create challenge service:
  - `src/services/challenge.ts`: CRUD for challenges
  - Join/leave challenge
  - Update progress
  - Complete challenge (award XP)
- Create challenge API:
  - `src/app/api/challenges/route.ts`: GET list, POST create
  - `src/app/api/challenges/[id]/route.ts`: GET, PATCH, DELETE
  - `src/app/api/challenges/[id]/join/route.ts`: POST
  - `src/app/api/challenges/[id]/leave/route.ts`: POST
  - `src/app/api/challenges/[id]/progress/route.ts`: GET, POST
- Integrate with habit completion:
  - Update `completeHabit` to update challenge progress
  - Auto-complete challenges when target reached

**Acceptance Criteria**:
- [ ] Create challenges (admin/system only for now)
- [ ] Join/leave challenges
- [ ] Progress updates on habit completion
- [ ] XP awarded on completion
- [ ] Challenge types: streak, completion_count, xp_goal

**Files to create**:
- `src/services/challenge.ts`
- `src/app/api/challenges/**/route.ts`
- Update `src/services/completion.ts`

**Commit**: `feat(social): implement challenges system`

---

#### Task 3.7: Challenges UI
**Category**: `visual-engineering`  
**Skills**: React, UI/UX  
**Estimated Effort**: 2 days  
**Dependencies**: Task 3.6

**What to do**:
- Create challenge UI:
  - `src/components/challenges/challenge-list.tsx`: Available challenges
  - `src/components/challenges/challenge-card.tsx`: Challenge display
  - `src/components/challenges/challenge-detail.tsx`: Detail view
  - `src/components/challenges/challenge-progress.tsx`: Progress bar
- Create challenges page:
  - `src/app/(dashboard)/challenges/page.tsx`: Challenges list
  - `src/app/(dashboard)/challenges/[id]/page.tsx`: Challenge detail
- Add to navigation:
  - Add "Challenges" to bottom navigation

**UI Requirements**:
- Challenge cards show: title, description, reward, participants
- Progress bar for joined challenges
- Join/Leave buttons
- Detail view with rules and leaderboard

**Acceptance Criteria**:
- [ ] Browse available challenges
- [ ] Join/leave challenges
- [ ] View progress in joined challenges
- [ ] Mobile responsive

**Files to create**:
- `src/components/challenges/*.tsx`
- `src/app/(dashboard)/challenges/**/page.tsx`
- Update `src/components/navigation/bottom-nav.tsx`

**Commit**: `feat(ui): add challenges interface`

---

#### Task 3.8: Social Feed Service & API
**Category**: `unspecified-high`  
**Skills**: Backend, Feed Algorithms  
**Estimated Effort**: 3 days  
**Dependencies**: Task 3.1, Task 3.2

**What to do**:
- Create activity service:
  - `src/services/activity.ts`: Create activities, generate feed
  - Fan-out on write pattern
  - Activity types: habit_completed, streak_milestone, level_up, badge_earned, challenge_completed
- Create feed service:
  - `src/services/feed.ts`: Retrieve feed items
  - Pagination with cursor
  - Mark as read
- Create feed API:
  - `src/app/api/feed/route.ts`: GET feed with pagination
  - `src/app/api/feed/mark-read/route.ts`: POST mark items read
- Integrate activity creation:
  - Hook into habit completion
  - Hook into badge awarding
  - Hook into level up
  - Hook into challenge completion

**Acceptance Criteria**:
- [ ] Activities created on key events
- [ ] Feed generated for friends
- [ ] Pagination working
- [ ] Mark as read functionality
- [ ] Privacy settings respected

**Files to create**:
- `src/services/activity.ts`
- `src/services/feed.ts`
- `src/app/api/feed/**/route.ts`
- Update `src/services/completion.ts`, `src/services/badge.ts`, etc.

**Commit**: `feat(social): implement activity feed system`

---

#### Task 3.9: Social Feed UI
**Category**: `visual-engineering`  
**Skills**: React, UI/UX  
**Estimated Effort**: 2 days  
**Dependencies**: Task 3.8

**What to do**:
- Create feed UI:
  - `src/components/feed/feed-list.tsx`: Activity feed list
  - `src/components/feed/feed-item.tsx`: Individual activity card
  - `src/components/feed/feed-reactions.tsx`: Like/reaction buttons
- Create feed page:
  - `src/app/(dashboard)/feed/page.tsx`: Social feed
- Add to dashboard:
  - Show recent feed items on dashboard

**UI Requirements**:
- Activity cards show: actor avatar, action description, timestamp
- Group similar activities
- Like/reaction buttons
- Infinite scroll pagination
- Pull to refresh

**Acceptance Criteria**:
- [ ] Feed displays activities from friends
- [ ] Like/reaction functionality
- [ ] Infinite scroll
- [ ] Mobile responsive
- [ ] Real-time updates (poll every 30s)

**Files to create**:
- `src/components/feed/*.tsx`
- `src/app/(dashboard)/feed/page.tsx`
- Update `src/app/(dashboard)/dashboard/page.tsx`

**Commit**: `feat(ui): add social feed interface`

---

### WAVE 4: Payment Integration (Week 6-8)
**Theme**: Flouci, Orange Money, D17, subscriptions

#### Task 4.1: Payment Provider Infrastructure
**Category**: `unspecified-high`  
**Skills**: Payment Integration, Security  
**Estimated Effort**: 2 days  
**Dependencies**: Task 1.2, Task 1.3

**What to do**:
- Create payment provider abstraction:
  - `src/lib/payments/types.ts`: Shared types and interfaces
  - `src/lib/payments/base-provider.ts`: Abstract base class
- Implement Flouci provider:
  - `src/lib/payments/flouci.ts`: Flouci API integration
  - Generate payment link
  - Verify payment
  - Handle webhooks
- Implement Orange Money provider:
  - `src/lib/payments/orange-money.ts`: Orange Money integration
  - Initialize payment
  - Verify payment
- Create payment service:
  - `src/services/payment.ts`: Orchestrate providers
  - Provider selection logic
  - Idempotency handling

**Acceptance Criteria**:
- [ ] Provider abstraction supports multiple gateways
- [ ] Flouci provider implemented
- [ ] Orange Money provider implemented
- [ ] Service handles provider selection
- [ ] Unit tests for providers

**Files to create**:
- `src/lib/payments/types.ts`
- `src/lib/payments/base-provider.ts`
- `src/lib/payments/flouci.ts`
- `src/lib/payments/orange-money.ts`
- `src/services/payment.ts`

**Commit**: `feat(payments): setup payment provider infrastructure`

---

#### Task 4.2: Subscription Management Service
**Category**: `unspecified-high`  
**Skills**: Backend, Billing  
**Estimated Effort**: 2 days  
**Dependencies**: Task 4.1

**What to do**:
- Create subscription service:
  - `src/services/subscription.ts`: Manage subscriptions
  - Create subscription
  - Cancel subscription
  - Renew subscription
  - Check subscription status
- Create subscription tiers:
  - Seed default tiers: Free, Premium
  - Define features per tier
- Integrate with auth:
  - Add subscription status to JWT token
  - Middleware to check subscription for premium features

**Subscription Tiers**:
```typescript
Free: {
  maxHabits: 5,
  aiChat: false,
  advancedStats: false,
  challenges: true,
  socialFeed: true
}
Premium: {
  maxHabits: unlimited,
  aiChat: true,
  advancedStats: true,
  challenges: true,
  socialFeed: true,
  price: 15000 // 15 TND/month
}
```

**Acceptance Criteria**:
- [ ] Subscription tiers seeded
- [ ] Create/cancel subscription working
- [ ] Subscription status in JWT
- [ ] Middleware checks subscription

**Files to create**:
- `src/services/subscription.ts`
- `src/db/seed.ts` (update with tiers)
- Update `src/lib/auth.ts` (add subscription to JWT)

**Commit**: `feat(payments): implement subscription management`

---

#### Task 4.3: Payment API Routes
**Category**: `unspecified-high`  
**Skills**: Backend, API Design  
**Estimated Effort**: 2 days  
**Dependencies**: Task 4.2

**What to do**:
- Create payment API:
  - `src/app/api/payments/initiate/route.ts`: POST initiate payment
  - `src/app/api/payments/verify/route.ts`: POST verify payment
  - `src/app/api/payments/methods/route.ts`: GET available methods
- Create subscription API:
  - `src/app/api/subscriptions/route.ts`: GET current, POST create
  - `src/app/api/subscriptions/cancel/route.ts`: POST cancel
  - `src/app/api/subscriptions/upgrade/route.ts`: POST upgrade
- Create webhook handlers:
  - `src/app/api/webhooks/flouci/route.ts`: Flouci webhooks
  - `src/app/api/webhooks/orange-money/route.ts`: Orange Money webhooks
  - Implement idempotency and signature verification

**Acceptance Criteria**:
- [ ] Initiate payment endpoint
- [ ] Verify payment endpoint
- [ ] Webhook handlers with signature verification
- [ ] Idempotency on all payment operations
- [ ] Error handling for failed payments

**Files to create**:
- `src/app/api/payments/**/route.ts`
- `src/app/api/subscriptions/**/route.ts`
- `src/app/api/webhooks/**/route.ts`

**Commit**: `feat(payments): add payment and subscription APIs`

---

#### Task 4.4: Payment UI Components
**Category**: `visual-engineering`  
**Skills**: React, UI/UX  
**Estimated Effort**: 2 days  
**Dependencies**: Task 4.3

**What to do**:
- Create payment UI:
  - `src/components/payments/payment-methods.tsx`: Select payment method
  - `src/components/payments/payment-form.tsx`: Payment form
  - `src/components/payments/subscription-card.tsx`: Current subscription
  - `src/components/payments/upgrade-modal.tsx`: Upgrade to premium
- Create subscription page:
  - `src/app/(dashboard)/subscription/page.tsx`: Manage subscription
- Add upgrade prompts:
  - Show upgrade modal when hitting free limits
  - Show premium badge for premium users

**UI Requirements**:
- Payment method selection (Flouci, Orange Money)
- Clear pricing display (15 TND/month)
- Feature comparison table
- Secure payment indicators
- Success/error states

**Acceptance Criteria**:
- [ ] Select payment method
- [ ] Complete payment flow
- [ ] View subscription status
- [ ] Upgrade prompts at limits
- [ ] Mobile responsive

**Files to create**:
- `src/components/payments/*.tsx`
- `src/app/(dashboard)/subscription/page.tsx`

**Commit**: `feat(ui): add payment and subscription interface`

---

#### Task 4.5: Premium Feature Gates
**Category**: `quick`  
**Skills**: Frontend, Authorization  
**Estimated Effort**: 1 day  
**Dependencies**: Task 4.2

**What to do**:
- Create premium gate component:
  - `src/components/payments/premium-gate.tsx`: Block non-premium users
- Add gates to premium features:
  - AI Coach chat (limit to premium)
  - Advanced statistics (limit to premium)
  - More than 5 habits (limit to premium)
- Update UI to show premium requirements:
  - Add "Premium" badges
  - Show upgrade prompts

**Acceptance Criteria**:
- [ ] AI chat blocked for free users
- [ ] Habit limit enforced (5 for free)
- [ ] Premium badges shown
- [ ] Upgrade prompts clear

**Files to create**:
- `src/components/payments/premium-gate.tsx`
- Update `src/app/(dashboard)/coach/page.tsx`
- Update `src/app/(dashboard)/habits/page.tsx`

**Commit**: `feat(payments): add premium feature gates`

---

### WAVE 5: Language Support (Week 8-9)
**Theme**: Tunisian Derja, TunBERT, RTL support

#### Task 5.1: Language Detection & Routing
**Category**: `unspecified-high`  
**Skills**: i18n, NLP  
**Estimated Effort**: 2 days  
**Dependencies**: None

**What to do**:
- Create language detection:
  - `src/lib/i18n/detect.ts`: Detect Tunisian Derja vs French vs Arabic
  - Use franc + custom Tunisian markers
- Update i18n configuration:
  - `src/i18n/request.ts`: Support multiple locales
  - Add fallback chain: Derja → French → English
- Create language switcher:
  - `src/components/i18n/language-switcher.tsx`: UI to change language
- Update middleware:
  - `src/middleware.ts`: Language-based routing

**Acceptance Criteria**:
- [ ] Detect Tunisian Derja input
- [ ] Fallback chain working
- [ ] Language switcher UI
- [ ] URL-based language routing

**Files to create/modify**:
- `src/lib/i18n/detect.ts`
- `src/i18n/request.ts`
- `src/components/i18n/language-switcher.tsx`
- `src/middleware.ts`

**Commit**: `feat(i18n): implement language detection and routing`

---

#### Task 5.2: Tunisian Derja Messages
**Category**: `quick`  
**Skills**: i18n, Translation  
**Estimated Effort**: 2 days  
**Dependencies**: Task 5.1

**What to do**:
- Create Tunisian Derja translations:
  - `messages/tn.json`: Core translations in Derja
  - Focus on common phrases: greetings, navigation, actions
  - Use `__FALLBACK__` marker for complex terms
- Update French translations:
  - `messages/fr.json`: Ensure complete coverage
- Create translation utilities:
  - `src/lib/i18n/fallback.ts`: Handle fallback markers
  - Show fallback indicator in UI

**Key Derja Translations**:
```json
{
  "greeting": "أهلا وسهلا",
  "welcome": "مرحبا بيك",
  "goodbye": "بسلامة",
  "thank_you": "يسر",
  "yes": "اي",
  "no": "لا",
  "habits": "العادات",
  "dashboard": "الصفحة الرئيسية"
}
```

**Acceptance Criteria**:
- [ ] tn.json with core translations
- [ ] Fallback to French working
- [ ] Fallback indicator in UI
- [ ] All UI elements translatable

**Files to create**:
- `messages/tn.json`
- `src/lib/i18n/fallback.ts`

**Commit**: `feat(i18n): add Tunisian Derja translations`

---

#### Task 5.3: RTL Support & Arabic Fonts
**Category**: `visual-engineering`  
**Skills**: CSS, Typography  
**Estimated Effort**: 2 days  
**Dependencies**: Task 5.1

**What to do**:
- Add RTL support:
  - Update `src/app/layout.tsx`: Add dir attribute based on locale
  - Create `src/styles/rtl.css`: RTL-specific styles
  - Use logical properties (margin-inline, padding-inline)
- Add Arabic fonts:
  - Import Noto Sans Arabic from Google Fonts
  - Configure in Tailwind: `fontFamily: { arabic: ['Noto Sans Arabic', ...] }`
- Update components for RTL:
  - Review all components for hardcoded left/right
  - Replace with logical properties
  - Flip icons where needed (arrows, chevrons)

**Acceptance Criteria**:
- [ ] RTL layout working
- [ ] Arabic fonts loaded
- [ ] All components use logical properties
- [ ] Icons flipped correctly in RTL
- [ ] Mobile responsive in RTL

**Files to modify**:
- `src/app/layout.tsx`
- `tailwind.config.ts`
- `src/styles/rtl.css` (create)
- Multiple component files

**Commit**: `feat(i18n): add RTL support and Arabic fonts`

---

#### Task 5.4: AI Language Support (Derja/French)
**Category**: `unspecified-high`  
**Skills**: AI, i18n  
**Estimated Effort**: 2 days  
**Dependencies**: Task 2.2, Task 5.1

**What to do**:
- Update AI prompts for multilingual:
  - `src/lib/ai/prompts/coach.ts`: French and Arabic versions
  - Route French to GPT-4o, Arabic to Gemini
- Add language-aware context:
  - Include user's language preference in context
  - AI responds in user's language
- Handle Derja fallback:
  - If user inputs Derja, AI responds in French (Derja not supported by models)
  - Show indicator: "Responding in French (Derja not yet supported)"

**Acceptance Criteria**:
- [ ] AI responds in French for French users
- [ ] AI responds in Arabic for Arabic users
- [ ] Derja inputs handled gracefully (French response)
- [ ] Language indicator shown

**Files to modify**:
- `src/lib/ai/prompts/coach.ts`
- `src/lib/ai/context.ts`
- `src/components/ai/chat-message.tsx`

**Commit**: `feat(ai): add multilingual support to AI coach`

---

#### Task 5.5: TunBERT Integration (Optional/Future)
**Category**: `unspecified-high`  
**Skills**: NLP, Python/Node  
**Estimated Effort**: 3 days  
**Dependencies**: Task 5.1

**What to do**:
- Create TunBERT service:
  - `src/lib/nlp/tunbert.ts`: Node.js wrapper for TunBERT
  - Use HuggingFace Inference API or self-host
  - Sentiment analysis for Derja text
- Add sentiment analysis:
  - Analyze user feedback in Derja
  - Analyze chat messages for mood
- Create API endpoint:
  - `src/app/api/nlp/sentiment/route.ts`: POST analyze sentiment

**Note**: Mark as optional - can be deferred to Phase 3 if time constrained

**Acceptance Criteria**:
- [ ] TunBERT service working
- [ ] Sentiment analysis API
- [ ] Used for feedback analysis

**Files to create**:
- `src/lib/nlp/tunbert.ts`
- `src/app/api/nlp/sentiment/route.ts`

**Commit**: `feat(nlp): integrate TunBERT for Derja sentiment analysis`

---

### WAVE 6: Testing & Polish (Week 9-10)
**Theme**: Testing, bug fixes, performance optimization

#### Task 6.1: Unit & Integration Tests
**Category**: `unspecified-high`  
**Skills**: Testing, Vitest  
**Estimated Effort**: 3 days  
**Dependencies**: All previous tasks

**What to do**:
- Write tests for services:
  - `src/services/__tests__/friendship.test.ts`
  - `src/services/__tests__/challenge.test.ts`
  - `src/services/__tests__/subscription.test.ts`
  - `src/services/__tests__/ai.test.ts`
- Write tests for API routes:
  - `src/app/api/friends/__tests__/route.test.ts`
  - `src/app/api/payments/__tests__/route.test.ts`
- Write tests for utilities:
  - `src/lib/ai/__tests__/rate-limiter.test.ts`
  - `src/lib/payments/__tests__/flouci.test.ts`

**Acceptance Criteria**:
- [ ] 70%+ test coverage for services
- [ ] API route tests for critical paths
- [ ] All tests passing

**Files to create**:
- Multiple `*.test.ts` files

**Commit**: `test: add comprehensive test suite`

---

#### Task 6.2: E2E Testing with Playwright
**Category**: `unspecified-high`  
**Skills**: E2E Testing, Playwright  
**Estimated Effort**: 2 days  
**Dependencies**: Task 6.1

**What to do**:
- Setup Playwright:
  - `npm install -D @playwright/test`
  - `npx playwright install`
  - `playwright.config.ts`
- Write E2E tests:
  - `e2e/auth.spec.ts`: Authentication flows
  - `e2e/friends.spec.ts`: Friend system
  - `e2e/payments.spec.ts`: Payment flow (mock provider)
  - `e2e/ai.spec.ts`: AI chat (mock responses)

**Acceptance Criteria**:
- [ ] Playwright configured
- [ ] Critical user flows tested
- [ ] CI integration ready

**Files to create**:
- `playwright.config.ts`
- `e2e/*.spec.ts`

**Commit**: `test: add Playwright E2E tests`

---

#### Task 6.3: Performance Optimization
**Category**: `quick`  
**Skills**: Performance, Optimization  
**Estimated Effort**: 2 days  
**Dependencies**: All previous tasks

**What to do**:
- Optimize database queries:
  - Add missing indexes
  - Review slow queries (pg_stat_statements)
- Optimize API responses:
  - Add caching headers
  - Implement request deduplication
- Optimize bundle size:
  - Code split heavy components
  - Lazy load AI chat
  - Tree shake unused dependencies
- Optimize images:
  - Use Next.js Image component
  - Implement lazy loading

**Acceptance Criteria**:
- [ ] Lighthouse score > 90
- [ ] API response times < 200ms (p95)
- [ ] Bundle size < 500KB (initial)

**Commit**: `perf: optimize performance and bundle size`

---

#### Task 6.4: Bug Fixes & Polish
**Category**: `quick`  
**Skills**: Debugging, QA  
**Estimated Effort**: 2 days  
**Dependencies**: All previous tasks

**What to do**:
- Bug bash:
  - Fix UI inconsistencies
  - Fix edge cases in friend system
  - Fix payment edge cases
  - Fix AI chat issues
- Polish UI:
  - Add loading states
  - Add error boundaries
  - Improve empty states
  - Add success toasts
- Accessibility:
  - Run axe-core audit
  - Fix accessibility issues
  - Add ARIA labels

**Acceptance Criteria**:
- [ ] No critical bugs
- [ ] UI polished and consistent
- [ ] Accessibility audit passed

**Commit**: `fix: bug fixes and UI polish`

---

## Parallel Execution Strategy

### Wave Dependencies Graph

```
Wave 1 (Foundation)
├── Task 1.1 (Social Schema) ──┬──> Wave 3 (Social)
├── Task 1.2 (AI/Payment Schema) ┬──> Wave 2 (AI)
│                                └──> Wave 4 (Payments)
├── Task 1.3 (Env Config) ───────> All Waves
└── Task 1.4 (Indexes) ──────────> All Waves

Wave 2 (AI) - Parallel Tasks
├── Task 2.1 (AI SDK) ─────┬──> Task 2.2 (Chat API)
│                          ├──> Task 2.4 (Recommendations)
│                          ├──> Task 2.5 (Summaries)
│                          └──> Task 2.6 (Motivation)
├── Task 2.2 (Chat API) ───> Task 2.3 (Chat UI)
└── Task 2.3 (Chat UI) ────> Task 5.4 (AI Language)

Wave 3 (Social) - Parallel Tasks
├── Task 3.1 (Privacy) ────┬──> Task 3.2 (Friends)
│                          └──> Task 3.4 (Leaderboard)
├── Task 3.2 (Friends) ────> Task 3.3 (Friends UI)
├── Task 3.4 (Leaderboard) ─> Task 3.5 (Leaderboard UI)
├── Task 3.6 (Challenges) ─> Task 3.7 (Challenges UI)
└── Task 3.8 (Feed) ───────> Task 3.9 (Feed UI)

Wave 4 (Payments) - Sequential
├── Task 4.1 (Providers) ──> Task 4.2 (Subscriptions)
├── Task 4.2 (Subscriptions) ─> Task 4.3 (API)
├── Task 4.3 (API) ────────> Task 4.4 (UI)
└── Task 4.4 (UI) ─────────> Task 4.5 (Gates)

Wave 5 (Language) - Parallel
├── Task 5.1 (Detection) ──┬──> Task 5.2 (Messages)
│                          ├──> Task 5.3 (RTL)
│                          └──> Task 5.4 (AI Language)
└── Task 5.5 (TunBERT) [Optional]

Wave 6 (Testing) - Parallel
├── Task 6.1 (Unit Tests)
├── Task 6.2 (E2E Tests)
├── Task 6.3 (Performance)
└── Task 6.4 (Polish)
```

### Parallel Groups by Wave

| Wave | Parallel Tasks | Sequential Chain |
|------|---------------|------------------|
| 1 | 1.1, 1.2, 1.3 | 1.4 (after 1.1, 1.2) |
| 2 | 2.4, 2.5, 2.6 | 2.1 → 2.2 → 2.3 |
| 3 | 3.2∥3.4∥3.6∥3.8 | 3.1 → (3.2→3.3), (3.4→3.5), (3.6→3.7), (3.8→3.9) |
| 4 | None | 4.1 → 4.2 → 4.3 → 4.4 → 4.5 |
| 5 | 5.2∥5.3∥5.4 | 5.1 → (5.2, 5.3, 5.4) |
| 6 | 6.1∥6.2∥6.3∥6.4 | All parallel |

---

## File Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── coach/           # AI Coach chat page
│   │   ├── friends/         # Friends management
│   │   ├── leaderboard/     # Leaderboards
│   │   ├── challenges/      # Challenges
│   │   ├── feed/            # Social feed
│   │   └── subscription/    # Subscription management
│   ├── api/
│   │   ├── ai/
│   │   │   ├── chat/        # AI chat endpoint
│   │   │   ├── recommendations/
│   │   │   └── summaries/
│   │   ├── friends/         # Friend system API
│   │   ├── challenges/      # Challenges API
│   │   ├── leaderboard/     # Leaderboard API
│   │   ├── feed/            # Feed API
│   │   ├── payments/        # Payment API
│   │   ├── subscriptions/   # Subscription API
│   │   └── webhooks/        # Payment webhooks
│   └── ...
├── components/
│   ├── ai/                  # AI components
│   ├── friends/             # Friend components
│   ├── leaderboard/         # Leaderboard components
│   ├── challenges/          # Challenge components
│   ├── feed/                # Feed components
│   ├── payments/            # Payment components
│   └── i18n/                # i18n components
├── services/
│   ├── friendship.ts
│   ├── challenge.ts
│   ├── leaderboard.ts
│   ├── feed.ts
│   ├── activity.ts
│   ├── subscription.ts
│   └── payment.ts
├── lib/
│   ├── ai/
│   │   ├── providers.ts
│   │   ├── models.ts
│   │   ├── rate-limiter.ts
│   │   ├── prompts/
│   │   └── context.ts
│   ├── payments/
│   │   ├── types.ts
│   │   ├── flouci.ts
│   │   └── orange-money.ts
│   ├── i18n/
│   │   ├── detect.ts
│   │   └── fallback.ts
│   └── nlp/
│       └── tunbert.ts
├── jobs/
│   └── calculate-leaderboards.ts
└── db/
    └── schema.ts            # Extended with Phase 2 tables
```

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Flouci API changes** | Medium | High | Abstract provider interface, easy to swap |
| **Orange Money approval delays** | Medium | High | Start with Flouci only, add Orange Money later |
| **AI API costs exceed budget** | Medium | Medium | Rate limiting, caching, model tiering |
| **TunBERT integration complexity** | High | Low | Mark as optional, defer to Phase 3 |
| **RTL UI bugs** | Medium | Medium | Thorough testing, use logical properties |
| **Social feature abuse** | Low | High | Privacy settings, reporting, rate limiting |
| **Performance with large user base** | Low | High | Indexes, caching, pagination from start |

---

## Success Criteria

### Functional
- [ ] AI Coach chat with streaming responses
- [ ] Friend system (add, remove, block)
- [ ] Leaderboards (global, friends)
- [ ] Challenges (create, join, complete)
- [ ] Social feed with activities
- [ ] Flouci payment integration
- [ ] Subscription tiers (Free/Premium)
- [ ] Tunisian Derja language support
- [ ] RTL layout support

### Technical
- [ ] 70%+ test coverage
- [ ] Lighthouse score > 90
- [ ] API response times < 200ms (p95)
- [ ] Zero critical security vulnerabilities
- [ ] Mobile-first responsive design

### Business
- [ ] Premium conversion funnel working
- [ ] Payment confirmation rate > 80%
- [ ] AI chat engagement > 30% of users
- [ ] Social feature adoption > 20% of users

---

## Appendix: Third-Party Integrations

### Required API Keys

| Service | Key Name | Environment | Documentation |
|---------|----------|-------------|---------------|
| OpenAI | `OPENAI_API_KEY` | All | https://platform.openai.com |
| Google AI | `GOOGLE_AI_API_KEY` | All | https://ai.google.dev |
| Flouci | `FLOUCI_PUBLIC_KEY`, `FLOUCI_PRIVATE_KEY` | All | https://developers.flouci.com |
| Orange Money | `ORANGE_MONEY_MERCHANT_ID` | Production | Contact Orange Tunisia |

### Rate Limits

| Service | Limit | Strategy |
|---------|-------|----------|
| OpenAI GPT-4o | 10K TPM | Rate limiting, caching |
| Google Gemini | 60 req/min | Rate limiting |
| Flouci | 100 req/min | Queue, retry logic |

---

## Execution Commands

```bash
# Start development
npm run dev

# Database operations
npm run db:generate
npm run db:migrate
npm run db:studio

# Testing
npm run test
npm run test:coverage
npm run test:e2e

# Build
npm run build

# Lint
npm run lint
```

---

*Plan generated by Prometheus - Phase 2 Implementation Guide*
*Last updated: 2026-01-30*
