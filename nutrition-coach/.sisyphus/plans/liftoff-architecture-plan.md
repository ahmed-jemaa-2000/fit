# Liftoff - B2C SaaS Architecture & Implementation Plan
## Comprehensive Plan for Tunisian Market

**Version**: 1.0  
**Date**: January 2025  
**Target Market**: Tunisia (Mobile-First B2C SaaS)  
**Platform**: Web Application (Next.js 15 App Router)

---

## Executive Summary

**Liftoff** is a gamified habit-tracking and personal development SaaS targeting the Tunisian market. Drawing inspiration from successful apps like the Liftoff fitness tracker (4.8★, 500K+ downloads), this platform combines gamification, AI personalization, and social features to drive user engagement and retention.

### Key Differentiators
- **Tunisia-First Design**: French primary, Tunisian Derja secondary, with D17/Flouci payment integration
- **AI-Powered Personalization**: GPT-4o/Gemini with TunBERT fallback for authentic local language support
- **Gamification Engine**: Sophisticated XP/leveling system with anti-cheat mechanisms
- **Mobile-First**: 85%+ of Tunisian internet traffic is mobile

### Business Model
- **Freemium**: Free tier with premium upgrade at 19.900 TND/month (~$6.40 USD)
- **Target**: 10,000 paid subscribers by Year 1 = ~$768K ARR
- **Conversion Target**: 5-8% free-to-paid (industry benchmark for gamified apps)

---

## Table of Contents

1. [Product Requirements (Section A)](#section-a-product-requirements)
2. [UX Features (Section B)](#section-b-ux-features-mobile-first-web)
3. [AI Use Cases (Section C)](#section-c-ai-use-cases)
4. [Gamification Engine (Section D)](#section-d-gamification-engine)
5. [Monetization (Section E)](#section-e-monetization-tunisia-focused)
6. [Technical Architecture (Section F)](#section-f-technical-architecture)
7. [Database Schema (Section G)](#section-g-database-schema)
8. [API Specifications (Section H)](#section-h-api-specifications)
9. [Implementation Roadmap (Section I)](#section-i-implementation-roadmap)
10. [Parallel Execution Graph](#parallel-execution-graph)
11. [Task Dependencies](#task-dependencies)
12. [Skill Assignments](#skill-assignments)

---

## Section A: Product Requirements

### A.1 User Personas (Tunisia-Specific)

#### Persona 1: "Youssef the Young Professional"
- **Demographics**: 24-32 years old, works in tech/finance, urban (Tunis/Sfax/Sousse)
- **Device**: Mid-range Android smartphone (Samsung A-series, Xiaomi)
- **Pain Points**: 
  - Wants to build better habits but lacks accountability
  - Feels isolated in personal growth journey
  - Skeptical of foreign apps that don't understand local context
- **Goals**: Career advancement, fitness, learning new skills
- **Language**: French for UI, Derja for casual chat/AI interaction
- **Payment**: Comfortable with mobile payments, has bank account
- **Quote**: *"I want something that feels like it was made for us, not imported from Silicon Valley"*

#### Persona 2: "Amira the University Student"
- **Demographics**: 19-24 years old, university student, limited budget
- **Device**: Entry-level smartphone, shared family computer
- **Pain Points**:
  - Limited disposable income for subscriptions
  - Highly motivated by social validation and competition
  - Uses multiple free apps but none stick
- **Goals**: Academic success, social connections, self-improvement
- **Language**: Mix of French and Derja, prefers Derja for informal
- **Payment**: Cash-based, may use parent's card for small amounts
- **Quote**: *"If my friends are using it and I can compete with them, I'm in"*

#### Persona 3: "Karim the Entrepreneur"
- **Demographics**: 30-45 years old, small business owner, goal-oriented
- **Device**: iPhone or high-end Android
- **Pain Points**:
  - Needs structured approach to personal development
  - Values data and progress tracking
  - Willing to pay for quality tools
- **Goals**: Business growth, networking, work-life balance
- **Language**: French dominant, occasional Derja
- **Payment**: Business credit card, values receipts/invoices
- **Quote**: *"Show me the ROI. If it helps me achieve my goals, I'll pay"*

#### Persona 4: "Fatma the Health Conscious"
- **Demographics**: 28-40 years old, health/fitness focused, suburban
- **Device**: Smartphone + fitness tracker
- **Pain Points**:
  - Existing fitness apps don't account for local food/culture
  - Wants community support in Arabic/French
  - Needs flexible tracking for Ramadan and cultural events
- **Goals**: Weight management, healthy habits, community
- **Language**: Derja preferred for emotional connection
- **Payment**: Family budget, careful with subscriptions
- **Quote**: *"I need something that understands our lifestyle and food"*

### A.2 Problems Solved

| Problem | Solution | Impact |
|---------|----------|--------|
| **Accountability Gap** | AI coach + social accountability partners | 3x higher completion rates |
| **Motivation Decay** | Gamification with streaks, levels, leaderboards | 40% better retention at Day 30 |
| **Cultural Disconnect** | Tunisian context-aware AI (TunBERT) | Higher engagement with local users |
| **Payment Friction** | D17/Flouci integration | 60% lower checkout abandonment |
| **Isolation** | Friend leaderboards + challenges | Viral growth through social sharing |
| **Progress Visibility** | Visual dashboards + AI summaries | Increased perceived value |

### A.3 Key Engagement & Retention Metrics

#### Primary KPIs (North Star Metrics)

| Metric | Target | Industry Benchmark | Measurement |
|--------|--------|-------------------|-------------|
| **Day 1 Retention** | 75% | 60-70% | % users returning 24h after signup |
| **Day 7 Retention** | 45% | 30-40% | % users active on Day 7 |
| **Day 30 Retention** | 25% | 15-20% | % users active on Day 30 |
| **Free-to-Paid Conversion** | 6% | 3-5% | % free users upgrading |
| **Monthly Churn** | <8% | 10-15% | % paid users canceling |
| **Session Frequency** | 4.5/week | 3/week | Avg sessions per user per week |
| **Session Duration** | 8 min | 5-7 min | Avg time per session |
| **Streak Completion** | 65% | 50% | % users maintaining 7+ day streaks |

#### Secondary Metrics

| Metric | Target | Purpose |
|--------|--------|---------|
| Onboarding Completion | 85% | Reduce early drop-off |
| AI Interaction Rate | 3/day | Validate AI value |
| Social Connection Rate | 40% | Network effects |
| NPS Score | >50 | User satisfaction |
| Support Ticket Rate | <2% | Product quality |

### A.4 Success Metrics by Phase

**Phase 1 (MVP - Months 1-4)**
- 1,000 registered users
- 60% Day 1 retention
- 3% free-to-paid conversion
- Core gamification functional

**Phase 2 (Growth - Months 5-8)**
- 10,000 registered users
- 45% Day 7 retention
- 5% free-to-paid conversion
- AI features launched

**Phase 3 (Scale - Months 9-12)**
- 50,000 registered users
- 25% Day 30 retention
- 6% free-to-paid conversion
- 500 paid subscribers
- Break-even on unit economics

---

## Section B: UX Features (Mobile-First Web)

### B.1 Design System Philosophy

**Aesthetic Direction**: "Modern Mediterranean"
- Clean, airy feel inspired by Tunisian coastal aesthetics
- Warm terracotta accents (#E07A5F) against cool slate (#3D405B)
- Generous whitespace reflecting Mediterranean openness
- Subtle geometric patterns inspired by Tunisian tilework

**Typography**
- **Display**: "Outfit" (Google Fonts) - modern, geometric, distinctive
- **Body**: "DM Sans" (Google Fonts) - highly readable, friendly
- **Arabic**: "Noto Sans Arabic" - excellent Derja support

**Color Palette**
```css
:root {
  --primary: #E07A5F;        /* Terracotta - energy, warmth */
  --primary-dark: #C45A3F;   /* Darker for hover states */
  --secondary: #81B29A;      /* Sage - growth, success */
  --accent: #F2CC8F;         /* Sand - highlights, warnings */
  --background: #F4F1DE;     /* Cream - main background */
  --surface: #FFFFFF;        /* White - cards, inputs */
  --text-primary: #3D405B;   /* Slate - headings */
  --text-secondary: #6B7280; /* Gray - body text */
  --error: #E07A5F;          /* Same as primary for consistency */
  --success: #81B29A;        /* Same as secondary */
}
```

### B.2 Onboarding Flows

#### Flow 1: Signup & Account Creation (5 steps)

**Step 1: Welcome Screen**
- Hero animation: Logo reveal with subtle particle effect
- Value proposition: "Devenez la meilleure version de vous-même" (FR) / "ولّي أحسن نسخة من روحك" (AR)
- CTA: "Commencer" (Start) / "ابدا" (Begin)
- Social proof: "Rejoint par 10,000+ Tunisiens"

**Step 2: Language Selection**
- Large, tappable cards
- French: "Français" (default, pre-selected)
- Tunisian Derja: "تونسي" (Tounsi)
- Auto-detect from browser, allow change anytime
- Store preference in user profile

**Step 3: Goal Selection (Multi-select)**
- Visual cards with icons:
  - 💪 Fitness & Santé
  - 📚 Apprentissage & Études
  - 💼 Carrière & Productivité
  - 🧘 Bien-être Mental
  - 💰 Finances Personnelles
  - 🤝 Relations Sociales
- Max 3 selections to maintain focus
- AI uses this for personalization

**Step 4: Current Level Assessment**
- Slider: "Comment évalues-tu ton niveau actuel ?"
- 1-10 scale with labels: Débutant → Intermédiaire → Avancé
- Determines starting difficulty

**Step 5: Account Creation**
- Options: Email + password, Google OAuth, Facebook OAuth
- Minimal fields: Email, password, name
- Skip option: "Créer un compte plus tard" (limited features)
- Immediate reward: +50 XP for completing onboarding

#### Flow 2: First Experience (Day 0)

**Immediate Post-Signup**
1. **Celebration**: Confetti animation, "Bienvenue ! 🎉"
2. **First Habit Setup**: AI suggests 3 habits based on goals
3. **Quick Win**: Complete first check-in (takes 30 seconds)
4. **Reward**: +25 XP, unlock first badge "Premiers Pas"
5. **Social Prompt**: "Invite un ami pour +100 XP"

**Progressive Onboarding (First 7 Days)**
- Day 1: Tutorial overlay on dashboard
- Day 2: Introduce streaks
- Day 3: Show leaderboard
- Day 5: Introduce AI coach
- Day 7: Premium upgrade prompt (soft)

### B.3 Dashboard Experience

#### Main Dashboard Layout (Mobile-First)

```
┌─────────────────────────────────────┐
│  [Menu]  Liftoff        [Notif] 👤 │  ← Header (sticky)
├─────────────────────────────────────┤
│                                     │
│  👋 Salut, Youssef!                 │  ← Personalized greeting
│  Niveau 3 • 450 XP                  │  ← Level progress
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🔥 5 jours de suite!        │    │  ← Streak card
│  │ Continue ta série 💪        │    │
│  └─────────────────────────────┘    │
│                                     │
│  TES HABITUDES AUJOURD'HUI          │
│  ┌─────────────────────────────┐    │
│  │ ✅ Méditation (10 min)      │    │
│  │ ⬜ Lecture (20 pages)       │    │  ← Habit checklist
│  │ ⬜ Sport (30 min)           │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📊 Ta progression cette     │    │
│  │ semaine: 85% ✅             │    │  ← Weekly progress
│  └─────────────────────────────┘    │
│                                     │
│  🏆 CLASSEMENT AMIS               │
│  1. Amira (1,240 XP)     👑       │
│  2. Toi (450 XP)                   │
│  3. Karim (380 XP)                 │  ← Friend leaderboard
│                                     │
│  [💬 Coach AI]  [➕ Nouvelle]      │  ← FABs
└─────────────────────────────────────┘
```

#### Dashboard Components

**1. Streak Card**
- Visual fire animation (CSS/Canvas)
- Current streak count (large)
- "Record: 12 jours" (personal best)
- Tap to see streak history calendar

**2. Habit Checklist**
- Swipeable cards
- Check animation on completion
- Progress bar fills throughout day
- Long-press for options (edit, skip, delete)

**3. Weekly Progress Ring**
- Circular progress indicator
- 7 segments (days of week)
- Color-coded: Green (completed), Yellow (partial), Gray (missed)

**4. Leaderboard Preview**
- Top 3 friends + user's position
- "Voir tout" link to full leaderboard
- Real-time updates (WebSocket)

**5. AI Coach Widget**
- Floating action button (FAB)
- Badge notification when new insight available
- Recent conversation preview

### B.4 Progress Tracking UI

#### Progress Views

**1. Daily View**
- Timeline of today's activities
- Check-in timestamps
- XP earned per activity
- Mood/energy rating (optional)

**2. Weekly View**
- Bar chart: completion rate by day
- Streak visualization
- Comparison to previous week
- "Tu as été 20% plus actif cette semaine!"

**3. Monthly View**
- Calendar heatmap (GitHub-style)
- Total XP earned
- Habits consistency score
- Achievement unlocks

**4. Yearly/All-Time View**
- Level progression timeline
- Total habits completed
- Time invested (hours)
- Rank progression

#### Progress Visualization Components

**XP Progress Bar**
```
Niveau 3 → 4
[████████░░░░░░░░░░░░] 450/600 XP
Encore 150 XP pour le prochain niveau!
```

**Streak Calendar**
- Month view with color-coded days
- Green: Completed all habits
- Yellow: Partial completion
- Red: Missed
- Tap day for details

**Achievement Showcase**
- Grid of earned badges
- Locked badges (grayed out with progress)
- Share button for social media

### B.5 AI Interaction Patterns

#### AI Coach Interface

**Entry Points**
1. Dashboard FAB (primary)
2. Habit completion celebration
3. Streak at risk warning
4. Weekly summary
5. User-initiated (tap to chat)

**Chat Interface**
```
┌─────────────────────────────────────┐
│  ← Coach AI              [History] │
├─────────────────────────────────────┤
│                                     │
│  🤖 Coach                           │
│  Salut Youssef! Je vois que tu      │
│  as complété 3 habitudes aujourd'hui.│
│  Tu es sur une belle lancée! 🔥      │
│                                     │
│  [Merci!] [C'était dur] [Conseil?]  │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [🎤]  [Écris un message...]  [➤]  │
└─────────────────────────────────────┘
```

**AI Interaction Patterns**

1. **Proactive Messages** (triggered by events)
   - Morning: "Bonjour! Prêt pour aujourd'hui?"
   - Evening: "Bilan de la journée..."
   - Streak risk: "⚠️ Ta série est en danger!"
   - Milestone: "🎉 Félicitations! Niveau 5 atteint!"

2. **Reactive Responses** (user-initiated)
   - Motivation requests
   - Habit advice
   - Progress analysis
   - Goal setting help

3. **Contextual Suggestions**
   - Based on time of day
   - Based on completion patterns
   - Based on goals
   - Based on streak status

**Language Handling**
- User writes in Derja → AI responds in Derja (via TunBERT)
- User writes in French → AI responds in French
- Mixed input → Respond in dominant language
- Code-switching detection

### B.6 Push Notification Strategy

#### Notification Types & Triggers

**1. Habit Reminders**
| Trigger | Timing | Content (FR) | Content (AR) |
|---------|--------|--------------|--------------|
| Morning habits | 7:00 AM | "C'est l'heure de ta méditation! 🧘" | "وخت التأمل متاعك! 🧘" |
| Evening habits | 6:00 PM | "N'oublie pas ta séance de sport" | "ما تنساش الرياضة" |
| Custom | User-defined | Personalized | Personalized |

**2. Streak Protection**
| Trigger | Timing | Content |
|---------|--------|---------|
| Streak risk | 9:00 PM (if incomplete) | "🔥 Ta série de 5 jours est en danger! Il te reste 3h" |
| Last chance | 11:00 PM | "⏰ Dernière chance pour sauver ta série!" |

**3. Social & Competitive**
| Trigger | Content |
|---------|---------|
| Friend overtakes | "🏃 Amira vient de te dépasser! Réagis vite!" |
| Challenge invite | "💪 Karim t'a défié à une semaine de méditation" |
| Achievement | "🎉 Nouveau badge débloqué: 'Méditant Assidu'" |

**4. AI Coach**
| Trigger | Content |
|---------|---------|
| Weekly summary | "📊 Ton bilan de la semaine est prêt!" |
| Insight | "💡 J'ai remarqué que tu progresses mieux le matin" |
| Encouragement | "🌟 Tu es à 80% de ton objectif mensuel!" |

**5. Monetization**
| Trigger | Timing | Content |
|---------|--------|---------|
| Trial ending | 3 days before | "⏳ Il te reste 3 jours d'essai gratuit" |
| Feature tease | When hitting limit | "🔒 Passe Premium pour débloquer les statistiques avancées" |
| Win-back | 7 days after cancel | "On te manque? Reprends ton abonnement avec -30%" |

#### Notification Delivery

**Channels**
1. **Web Push** (primary): Via service worker
2. **In-App**: Toast notifications
3. **Email**: Weekly summaries, important updates
4. **SMS**: Critical alerts only (Tunisia: high open rates)

**Smart Delivery**
- Respect quiet hours (10 PM - 7 AM)
- Batch non-urgent notifications
- Frequency capping (max 5/day)
- A/B test timing for optimization

### B.7 Profile & Settings

#### Profile Screen

```
┌─────────────────────────────────────┐
│  ← Profil              [Modifier]  │
├─────────────────────────────────────┤
│                                     │
│        ┌─────────┐                  │
│        │   👤    │  Youssef B.      │
│        │  Photo  │  @youssef_b      │
│        └─────────┘  Niveau 5 ⭐     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📊 Statistiques             │    │
│  │ 45 jours actifs • 12 badges │    │
│  │ 2,340 XP total              │    │
│  └─────────────────────────────┘    │
│                                     │
│  MES SUCCÈS                         │
│  [🏆] [🔥] [📚] [💪] [⭐] [🎯]      │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ⚙️ Paramètres               │    │
│  │ 🔔 Notifications            │    │
│  │ 🌍 Langue: Français         │    │
│  │ 💳 Abonnement: Gratuit      │    │
│  │ ❓ Aide & Support           │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

#### Settings Categories

**1. Account**
- Profile photo, name, email
- Password change
- Connected accounts (Google, Facebook)
- Delete account

**2. Preferences**
- Language (Français / تونسي)
- Theme (Light / Dark / Auto)
- Units (Metric / Imperial)
- Timezone (auto-detect: Africa/Tunis)

**3. Notifications**
- Push notifications toggle
- Email notifications toggle
- Reminder times per habit
- Quiet hours

**4. Privacy**
- Profile visibility (Public / Friends / Private)
- Leaderboard participation
- Data export
- Privacy policy

**5. Subscription**
- Current plan
- Upgrade to Premium
- Payment methods (D17, Flouci)
- Billing history
- Cancel subscription

---

## Section C: AI Use Cases

### C.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        AI Layer                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   GPT-4o     │  │   Gemini     │  │   TunBERT    │      │
│  │  (Primary)   │  │  (Fallback)  │  │ (Derja NLP)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                │                │                 │
│         └────────────────┴────────────────┘                 │
│                          │                                  │
│                   ┌──────────────┐                         │
│                   │ AI Router    │                         │
│                   │ & Context    │                         │
│                   │ Manager      │                         │
│                   └──────────────┘                         │
│                          │                                  │
│  ┌───────────────────────┼───────────────────────┐         │
│  │                       │                       │         │
│  ▼                       ▼                       ▼         │
│ ┌──────────┐      ┌──────────┐      ┌──────────┐          │
│ │  Coach   │      │ Insights │      │ Content  │          │
│ │  Agent   │      │  Engine  │      │ Generator│          │
│ └──────────┘      └──────────┘      └──────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### C.2 Use Case 1: Conversational AI Coach

**Feature Goals**
- Provide personalized motivation and accountability
- Answer questions about habits and progress
- Offer contextual advice based on user patterns
- Support both French and Tunisian Derja

**Backend Architecture**

```typescript
// AI Coach Service
interface CoachService {
  // Main entry point
  async generateResponse(
    userId: string,
    message: string,
    context: ConversationContext
  ): Promise<CoachResponse>;
  
  // Language detection and routing
  detectLanguage(text: string): 'fr' | 'ar' | 'mixed';
  
  // Context assembly
  buildContext(userId: string): Promise<ConversationContext>;
}

interface ConversationContext {
  user: UserProfile;
  recentActivity: ActivityLog[];
  currentStreak: number;
  goals: Goal[];
  conversationHistory: Message[];
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  language: 'fr' | 'ar';
}
```

**Prompt Design**

```typescript
// French Prompt Template
const FRENCH_COACH_PROMPT = `
Tu es Coach AI, un coach personnel bienveillant et motivant pour l'app Liftoff.
Tu aides les utilisateurs tunisiens à développer de bonnes habitudes.

CONTEXTE UTILISATEUR:
- Nom: {{user.name}}
- Niveau: {{user.level}}
- Série actuelle: {{user.streak}} jours
- Objectifs: {{user.goals}}
- Activité récente: {{recentActivity}}

INSTRUCTIONS:
1. Sois chaleureux et encourageant
2. Utilise un langage simple et accessible
3. Fais référence à leurs progrès réels
4. Propose des actions concrètes
5. Maximum 3 phrases par réponse
6. Utilise des emojis pertinents

MESSAGE UTILISATEUR: {{message}}

RÉPONSE:
`;

// Derja Prompt Template (via TunBERT or GPT-4o with examples)
const DERJA_COACH_PROMPT = `
أنت كواش آي، كوتش شخصي متاع تطبيق Liftoff.
تساعد الناس التوانسة يطوّروا عاداتهم.

سياق المستخدم:
- الاسم: {{user.name}}
- المستوى: {{user.level}}
- السلسلة: {{user.streak}} أيام
- الأهداف: {{user.goals}}

تعليمات:
1. كن دافع ومحفز
2. استعمل لغة بسيطة (تونسي)
3. اشير لتحسنهم الحقيقي
4. اقترح أفعال ملموسة
5. 3 جمل كحد أقصى

رسالة المستخدم: {{message}}

الرد:
`;
```

**Context Storage**

```sql
-- Conversation history table
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  session_id UUID NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  language VARCHAR(10),
  model_used VARCHAR(50),
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

-- Create indexes for efficient retrieval
CREATE INDEX idx_conversations_user_session ON ai_conversations(user_id, session_id, created_at DESC);
CREATE INDEX idx_conversations_user_time ON ai_conversations(user_id, created_at DESC);

-- Context cache (recent summary)
CREATE TABLE ai_context_cache (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  summary TEXT NOT NULL,
  key_facts JSONB,
  last_updated TIMESTAMP DEFAULT NOW()
);
```

**Fallback Strategy**

```typescript
async function generateCoachResponse(message: string, userId: string): Promise<string> {
  const language = detectLanguage(message);
  const context = await buildContext(userId);
  
  try {
    // Try GPT-4o first (best quality)
    if (language === 'fr' || language === 'mixed') {
      return await callGPT4o(message, context, 'fr');
    }
  } catch (error) {
    console.log('GPT-4o failed, trying fallback...');
  }
  
  try {
    // Fallback to Gemini
    return await callGemini(message, context, language);
  } catch (error) {
    console.log('Gemini failed, trying TunBERT...');
  }
  
  // Final fallback: TunBERT for Derja, or template response
  if (language === 'ar') {
    return await callTunBERT(message, context);
  }
  
  // Ultimate fallback: template-based response
  return generateTemplateResponse(context, language);
}
```

### C.3 Use Case 2: Intelligent Recommendations

**Feature Goals**
- Suggest optimal habits based on user goals
- Recommend optimal times for habits
- Suggest habit difficulty adjustments
- Friend and challenge recommendations

**Recommendation Engine**

```typescript
interface RecommendationEngine {
  // Habit recommendations
  suggestHabits(userId: string, goals: Goal[]): Promise<HabitSuggestion[]>;
  
  // Time optimization
  suggestOptimalTimes(userId: string, habitId: string): Promise<TimeSlot[]>;
  
  // Difficulty adjustment
  suggestDifficulty(userId: string, habitId: string): Promise<DifficultyAdjustment>;
  
  // Social recommendations
  suggestFriends(userId: string): Promise<User[]>;
  suggestChallenges(userId: string): Promise<Challenge[]>;
}

interface HabitSuggestion {
  habit: HabitTemplate;
  confidence: number; // 0-1
  reason: string;
  expectedImpact: 'high' | 'medium' | 'low';
}
```

**ML Model Architecture**

```
User Features:
├── Demographics (age, location)
├── Goals (multi-hot encoded)
├── Current habits (embeddings)
├── Completion patterns (time series)
└── Social graph (friend habits)

Habit Features:
├── Category (one-hot)
├── Difficulty level
├── Time requirement
├── Popularity (global completion rate)
└── Success rate by user segment

Model: Collaborative Filtering + Content-Based Hybrid
├── Matrix Factorization for user-habit interactions
├── XGBoost for feature-based scoring
└── Ensemble weighted by confidence
```

**Prompt for Habit Suggestion**

```typescript
const HABIT_SUGGESTION_PROMPT = `
Basé sur le profil suivant, suggère 3 habitudes pertinentes:

PROFIL:
- Objectifs: {{goals}}
- Niveau: {{level}}
- Habitudes actuelles: {{currentHabits}}
- Heures actives: {{activeHours}}

HABITUDES DISPONIBLES:
{{availableHabits}}

FORMAT DE RÉPONSE (JSON):
{
  "suggestions": [
    {
      "habitId": "...",
      "reason": "...",
      "confidence": 0.85
    }
  ]
}
`;
```

### C.4 Use Case 3: Natural Language Progress Summaries

**Feature Goals**
- Generate weekly/monthly progress reports
- Explain trends in natural language
- Celebrate achievements meaningfully
- Identify patterns and insights

**Summary Generation**

```typescript
interface ProgressSummarizer {
  generateWeeklySummary(userId: string, weekStart: Date): Promise<Summary>;
  generateMonthlySummary(userId: string, month: number, year: number): Promise<Summary>;
  generateMilestoneSummary(userId: string, milestone: Milestone): Promise<Summary>;
}

interface Summary {
  title: string;
  highlights: string[];
  insights: string[];
  recommendations: string[];
  comparisonToPrevious: string;
  tone: 'celebratory' | 'encouraging' | 'neutral';
}
```

**Summary Prompt**

```typescript
const WEEKLY_SUMMARY_PROMPT = `
Génère un résumé de la semaine pour l'utilisateur.

DONNÉES:
- Semaine du {{weekStart}} au {{weekEnd}}
- Habitudes complétées: {{completed}}/{{total}} ({{completionRate}}%)
- XP gagné: {{xpEarned}}
- Série actuelle: {{currentStreak}}
- Meilleure série: {{bestStreak}}
- Jours les plus actifs: {{mostActiveDays}}
- Habitudes les plus complétées: {{topHabits}}
- Habitudes les moins complétées: {{bottomHabits}}

COMPARAISON SEMAINE PRÉCÉDENTE:
- Complétion: {{prevWeekCompletion}}% → {{thisWeekCompletion}}%
- XP: {{prevWeekXP}} → {{thisWeekXP}}

INSTRUCTIONS:
1. Commence par une célébration si la semaine était bonne
2. Mentionne 2-3 faits marquants
3. Donne 1 insight sur les patterns
4. Termine par une encouragement/recommandation
5. Longueur: 4-5 phrases
6. Ton: {{tone}}

RÉSUMÉ:
`;
```

### C.5 Use Case 4: Multilingual Support

**Language Detection & Routing**

```typescript
class LanguageRouter {
  async detectAndRoute(text: string, userId: string): Promise<LanguageDecision> {
    const detected = await this.detectLanguage(text);
    const userPref = await this.getUserLanguagePreference(userId);
    
    // Decision matrix
    if (detected === 'ar' && this.isDerja(text)) {
      // Use TunBERT for Tunisian Derja
      return { provider: 'tunbert', language: 'ar-tn' };
    }
    
    if (detected === 'ar') {
      // Standard Arabic - use GPT-4o
      return { provider: 'gpt4o', language: 'ar' };
    }
    
    if (detected === 'fr') {
      // French - use GPT-4o
      return { provider: 'gpt4o', language: 'fr' };
    }
    
    // Mixed or uncertain - use GPT-4o with user preference
    return { provider: 'gpt4o', language: userPref };
  }
  
  private isDerja(text: string): boolean {
    // Check for Tunisian-specific markers
    const derjaMarkers = ['باهي', 'يسطى', 'خيبة', 'برشا', 'يعيشك'];
    return derjaMarkers.some(marker => text.includes(marker));
  }
}
```

**TunBERT Integration**

```python
# Python microservice for TunBERT
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

class TunBERTService:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("iCompass-ai/TunBERT")
        self.model = AutoModelForSequenceClassification.from_pretrained("iCompass-ai/TunBERT")
    
    def analyze_sentiment(self, text: str) -> dict:
        """Analyze sentiment of Tunisian text"""
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        outputs = self.model(**inputs)
        predictions = torch.softmax(outputs.logits, dim=-1)
        
        return {
            'positive': predictions[0][0].item(),
            'negative': predictions[0][1].item(),
            'neutral': predictions[0][2].item()
        }
    
    def generate_response(self, context: dict, message: str) -> str:
        """Generate contextual response in Derja"""
        # Fine-tuned generation model
        # Implementation depends on specific TunBERT variant
        pass
```

### C.6 Context Storage Strategy

**Short-term Context (Active Session)**
- Redis: Last 20 messages per conversation
- TTL: 24 hours
- Purpose: Maintain conversation flow

**Medium-term Context (Recent History)**
- PostgreSQL: Last 100 messages per user
- Purpose: Pattern recognition, personalization

**Long-term Context (User Profile)**
- PostgreSQL: Aggregated insights
- Summary updated weekly via AI
- Key facts extracted and stored

```sql
-- User AI profile (long-term context)
CREATE TABLE user_ai_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  communication_style VARCHAR(50), -- formal, casual, humorous
  preferred_language VARCHAR(10),
  motivation_triggers JSONB, -- what works for this user
  common_challenges JSONB, -- recurring issues
  success_patterns JSONB, -- when they succeed
  last_summary_update TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Section D: Gamification Engine

### D.1 Core Mechanics Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    GAMIFICATION ENGINE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │    XP &     │───→│   Levels    │───→│   Badges    │     │
│  │   Points    │    │             │    │             │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         ↓                  ↓                  ↓             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Streaks   │    │ Leaderboards│    │ Challenges  │     │
│  │             │    │             │    │             │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              ANTI-CHEAT SYSTEM                       │   │
│  │  • Pattern detection  • Rate limiting  • Validation  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### D.2 XP & Points System

**XP Sources**

| Action | XP Reward | Frequency Limit |
|--------|-----------|-----------------|
| Complete habit | 10-50 XP | Per habit per day |
| Maintain streak | +5 XP per day | Daily bonus |
| New personal best | 100 XP | Per streak milestone |
| Level up | 200 XP | Per level |
| Complete challenge | 500 XP | Per challenge |
| Invite friend | 150 XP | Per successful invite |
| Profile completion | 50 XP | One-time |
| First habit created | 25 XP | One-time |
| AI interaction | 5 XP | Max 3/day |
| Share achievement | 10 XP | Max 1/day |

**XP Calculation Formula**

```typescript
function calculateHabitXP(habit: Habit, context: Context): number {
  const baseXP = habit.difficulty * 10; // 1-5 difficulty = 10-50 XP
  
  // Streak bonus
  const streakBonus = Math.min(context.currentStreak * 2, 20); // Max +20 XP
  
  // Time bonus (completing at optimal time)
  const timeBonus = isOptimalTime(habit, context.completionTime) ? 5 : 0;
  
  // Consistency bonus (completing all habits for day)
  const consistencyBonus = context.allHabitsCompleted ? 10 : 0;
  
  return baseXP + streakBonus + timeBonus + consistencyBonus;
}
```

### D.3 Level Progression System

**Level Formula**

Using the industry-standard progression curve:

```typescript
// XP required to reach level N
function xpForLevel(level: number): number {
  // Formula: 100 * level^1.5
  // Level 1: 100 XP
  // Level 2: 283 XP
  // Level 5: 1,118 XP
  // Level 10: 3,162 XP
  // Level 25: 12,500 XP
  // Level 50: 35,355 XP
  return Math.floor(100 * Math.pow(level, 1.5));
}

// XP needed from current level to next
function xpToNextLevel(currentXP: number, currentLevel: number): number {
  const nextLevelXP = xpForLevel(currentLevel + 1);
  return nextLevelXP - currentXP;
}

// Get level from total XP
function getLevelFromXP(totalXP: number): number {
  let level = 1;
  while (xpForLevel(level + 1) <= totalXP) {
    level++;
  }
  return level;
}
```

**Level Tiers**

| Tier | Levels | Title (FR) | Title (AR) | Visual |
|------|--------|------------|------------|--------|
| Bronze | 1-10 | Débutant | مبتدئ | 🥉 |
| Silver | 11-25 | Intermédiaire | متوسط | 🥈 |
| Gold | 26-50 | Avancé | متقدم | 🥇 |
| Platinum | 51-75 | Expert | خبير | 💎 |
| Diamond | 76-100 | Maître | محترف | 💠 |
| Legend | 100+ | Légende | أسطورة | 👑 |

### D.4 Badges System

**Badge Categories**

**1. Streak Badges**
| Badge | Requirement | XP Bonus |
|-------|-------------|----------|
| 🔥 First Spark | 3-day streak | 50 XP |
| 🔥🔥 On Fire | 7-day streak | 100 XP |
| 🔥🔥🔥 Unstoppable | 30-day streak | 500 XP |
| 🔥🔥🔥🔥 Legendary | 100-day streak | 2,000 XP |
| 🔥🔥🔥🔥🔥 Immortal | 365-day streak | 10,000 XP |

**2. Completion Badges**
| Badge | Requirement | XP Bonus |
|-------|-------------|----------|
| 🎯 First Steps | Complete first habit | 25 XP |
| 📅 Week Warrior | Complete all habits for 7 days | 150 XP |
| 📆 Month Master | Complete all habits for 30 days | 500 XP |
| 🏆 Perfect Year | Complete all habits for 365 days | 5,000 XP |

**3. Social Badges**
| Badge | Requirement | XP Bonus |
|-------|-------------|----------|
| 🤝 Connector | Invite 3 friends | 100 XP |
| 🌟 Influencer | 10 friends joined | 500 XP |
| 🏅 Competitor | Win first challenge | 200 XP |
| 🥇 Champion | Win 10 challenges | 1,000 XP |

**4. Special Badges**
| Badge | Requirement | XP Bonus |
|-------|-------------|----------|
| 🌙 Ramadan Warrior | Maintain habits during Ramadan | 300 XP |
| 🎉 Early Adopter | Join in first 1,000 users | 500 XP |
| 🐛 Bug Hunter | Report valid bug | 100 XP |
| 💡 Innovator | Suggest feature that gets implemented | 500 XP |

### D.5 Streak System

**Streak Mechanics**

```typescript
interface StreakSystem {
  // Daily streak calculation
  calculateStreak(userId: string): Promise<StreakStatus>;
  
  // Check if streak is at risk
  isStreakAtRisk(userId: string): boolean;
  
  // Streak freeze (premium feature)
  freezeStreak(userId: string, reason: string): Promise<void>;
  
  // Streak recovery (one-time per month)
  recoverStreak(userId: string): Promise<boolean>;
}

interface StreakStatus {
  currentStreak: number;
  longestStreak: number;
  streakStartDate: Date;
  lastActivityDate: Date;
  isAtRisk: boolean;
  hoursRemaining: number;
  streakFreezeAvailable: boolean;
}
```

**Streak Rules**

1. **Daily Reset**: Streak checks at midnight Tunisia time (UTC+1)
2. **Grace Period**: 2-hour buffer after midnight (until 2 AM)
3. **Completion Requirement**: Complete at least 1 habit to maintain streak
4. **Streak Freeze**: Premium users can freeze streak once per month
5. **Streak Recovery**: One recovery allowed per month (watch ad or 50 XP)

**Streak Visual States**

```
Active Streak (3+ days):
┌─────────────────────────────┐
│ 🔥 12 jours de suite!       │
│ Continue comme ça! 💪       │
└─────────────────────────────┘

At Risk (incomplete after 9 PM):
┌─────────────────────────────┐
│ ⚠️ Ta série est en danger!  │
│ Complète une habitude vite! │
└─────────────────────────────┘

Broken (missed day):
┌─────────────────────────────┐
│ 💔 Série perdue (12 jours)  │
│ Ne lâche pas! Reprends! 🚀  │
└─────────────────────────────┘
```

### D.6 Leaderboards

**Leaderboard Types**

**1. Global Leaderboard**
- All users ranked by total XP
- Updated daily
- Top 100 displayed
- User sees their rank + surrounding 5 users

**2. Friends Leaderboard**
- User + their friends
- Real-time updates
- Weekly reset for fresh competition
- Shows XP gained this week

**3. Regional Leaderboard**
- Users from same governorate
- Builds local community
- Monthly competitions

**4. Category Leaderboard**
- Ranked by specific habit category
- Fitness, Learning, etc.
- Seasonal competitions

**Leaderboard Query (PostgreSQL)**

```sql
-- Get user's rank and surrounding users
WITH ranked_users AS (
  SELECT 
    id,
    username,
    total_xp,
    level,
    RANK() OVER (ORDER BY total_xp DESC) as rank
  FROM users
  WHERE is_active = true
)
SELECT * FROM ranked_users
WHERE rank BETWEEN (
  SELECT rank - 5 FROM ranked_users WHERE id = :userId
) AND (
  SELECT rank + 5 FROM ranked_users WHERE id = :userId
)
ORDER BY rank;
```

### D.7 Anti-Cheat Mechanisms

**Detection Methods**

```typescript
class AntiCheatSystem {
  // Pattern detection
  detectSuspiciousPatterns(userId: string): Alert[] {
    const alerts: Alert[] = [];
    
    // 1. Impossible completion times
    const rapidCompletions = this.checkRapidCompletions(userId);
    if (rapidCompletions.count > 5) {
      alerts.push({
        type: 'RAPID_COMPLETION',
        severity: 'high',
        details: `${rapidCompletions.count} habits completed in < 30 seconds`
      });
    }
    
    // 2. Time zone manipulation
    const timezoneAnomalies = this.checkTimezoneConsistency(userId);
    if (timezoneAnomalies.detected) {
      alerts.push({
        type: 'TIMEZONE_MANIPULATION',
        severity: 'high',
        details: 'Suspicious timezone changes detected'
      });
    }
    
    // 3. Bot-like patterns
    const botPatterns = this.checkBotPatterns(userId);
    if (botPatterns.score > 0.8) {
      alerts.push({
        type: 'BOT_LIKE_BEHAVIOR',
        severity: 'critical',
        details: `Bot probability: ${botPatterns.score}`
      });
    }
    
    // 4. Multiple accounts
    const multiAccount = this.checkMultiAccount(userId);
    if (multiAccount.confidence > 0.7) {
      alerts.push({
        type: 'MULTI_ACCOUNT',
        severity: 'medium',
        details: `Possible alt accounts: ${multiAccount.accounts.join(', ')}`
      });
    }
    
    return alerts;
  }
  
  // Rate limiting
  checkRateLimit(userId: string, action: string): boolean {
    const limits = {
      'habit_complete': { max: 20, window: '1 hour' },
      'xp_earn': { max: 1000, window: '1 day' },
      'friend_invite': { max: 10, window: '1 day' },
      'challenge_create': { max: 5, window: '1 day' }
    };
    
    // Implementation with Redis
  }
}
```

**Enforcement Actions**

| Violation | First Offense | Repeat Offense |
|-----------|--------------|----------------|
| Minor (rapid completions) | Warning + XP deduction | 7-day XP freeze |
| Major (timezone manipulation) | 30-day leaderboard ban | Permanent ban |
| Critical (bot usage) | Account suspension | Permanent ban |

---

## Section E: Monetization (Tunisia-Focused)

### E.1 Pricing Strategy

**Market Context**
- Average monthly salary: 1,200-2,500 TND
- Typical SaaS spend: 1-3% of income
- Price-sensitive market
- Strong preference for local payment methods

**Pricing Tiers**

| Plan | Price | Target |
|------|-------|--------|
| **Free** | 0 TND | Acquisition, students, trial |
| **Premium Monthly** | 19.900 TND/mo | Flexible users |
| **Premium Annual** | 179.000 TND/yr (25% off) | Committed users |
| **Family (4 users)** | 49.900 TND/mo | Households |

**Competitive Comparison**
- Duolingo Plus: ~15 TND/mo
- Spotify Premium: ~13 TND/mo
- Local fitness apps: 10-25 TND/mo
- **Liftoff positioning**: Premium value at accessible price

### E.2 Free vs Premium Feature Matrix

| Feature | Free | Premium |
|---------|------|---------|
| **Habits** | 3 active | Unlimited |
| **Reminders** | 1 per habit | Unlimited + smart |
| **Streaks** | Basic | Freeze + recovery |
| **AI Coach** | 5 msgs/day | Unlimited |
| **Leaderboards** | Friends only | Global + regional |
| **Challenges** | Join only | Create + join |
| **Analytics** | Basic | Advanced + insights |
| **Badges** | Standard | Exclusive premium |
| **Export** | ❌ | CSV + PDF |
| **Support** | Community | Priority |
| **Ads** | Yes | No |

### E.3 Payment Integration Strategy

**Payment Providers**

**1. D17 (La Poste Tunisienne)**
- Coverage: 100% of Tunisian adults
- Methods: Cash at post offices, bank transfer, e-Dinar card
- Integration: REST API
- Settlement: 3-5 business days
- Fees: 2.5% + 0.500 TND per transaction

**2. Flouci**
- Coverage: 67,000+ active users (Dec 2024)
- Methods: Wallet, linked bank account, Orange Money
- Integration: REST API + SDK
- Settlement: Instant to wallet, 1-2 days to bank
- Fees: 1.5% per transaction
- Partnership: Orange Tunisia integration

**3. Orange Money (via Flouci)**
- Coverage: 2M+ Orange Tunisia subscribers
- Methods: Mobile wallet
- Integration: Via Flouci API
- Settlement: Instant
- Fees: 1.5%

**Payment Flow**

```
User selects Premium
       ↓
Choose payment method:
├── D17 (Cash/Card)
├── Flouci (Wallet)
└── Orange Money
       ↓
Redirect to provider
       ↓
Complete payment
       ↓
Webhook callback
       ↓
Activate subscription
       ↓
Grant premium features
```

### E.4 Upgrade Flows

**Soft Upgrade Prompts**

1. **Feature Tease** (when hitting free limit)
   - "🔒 Passe à Premium pour ajouter plus d'habitudes"
   - Show locked features with preview

2. **Streak Protection** (when streak at risk)
   - "💎 Utilise le Gel de Série (Premium) pour protéger ta série"

3. **AI Limit** (after 5 messages)
   - "🤖 Passe Premium pour discuter sans limite avec ton Coach AI"

4. **Weekly Summary** (end of week)
   - "📊 Découvre tes statistiques avancées avec Premium"

**Hard Paywall**

- After 14-day free trial
- Can still view data, but cannot add/edit habits
- Soft downgrade: "Ton essai gratuit est terminé"
- Offer: 30% discount for first month

**Conversion Hooks**

| Hook | Timing | Offer |
|------|--------|-------|
| Trial ending | Day 12 | 30% off first month |
| Streak milestone | Day 30 | Free month for annual |
| Referral | Any | 1 month free per referral |
| Win-back | 7 days post-cancel | 50% off 3 months |
| Seasonal | Ramadan/New Year | Special pricing |

---

## Section F: Technical Architecture

### F.1 System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Next.js    │  │   PWA        │  │   Web Push   │              │
│  │   App Router │  │   (Mobile)   │  │   Service    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           API GATEWAY                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Rate       │  │   Auth       │  │   Request    │              │
│  │   Limiting   │  │   Middleware │  │   Routing    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         SERVICE LAYER                                │
│                                                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│  │   Auth     │ │   User     │ │ Gamification│ │    AI      │       │
│  │  Service   │ │  Service   │ │  Service    │ │  Service   │       │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │
│                                                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│  │  Habit     │ │  Social    │ │  Billing   │ │ Notification│       │
│  │  Service   │ │  Service   │ │  Service   │ │  Service    │       │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  PostgreSQL  │  │    Redis     │  │   S3/MinIO   │              │
│  │  (Primary)   │  │   (Cache)    │  │   (Files)    │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │  GPT-4o  │ │  Gemini  │ │ TunBERT  │ │   D17    │ │  Flouci  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### F.2 Frontend Architecture (Next.js 15 App Router)

**Directory Structure**

```
app/
├── (auth)/                    # Auth route group
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── (dashboard)/               # Dashboard route group
│   ├── layout.tsx            # Dashboard shell
│   ├── page.tsx              # Main dashboard
│   ├── habits/
│   ├── progress/
│   ├── leaderboard/
│   ├── challenges/
│   ├── coach/                # AI coach interface
│   └── settings/
├── api/                       # API routes
│   ├── auth/
│   ├── habits/
│   ├── gamification/
│   ├── ai/
│   └── webhooks/             # Payment webhooks
├── layout.tsx                # Root layout
├── page.tsx                  # Landing page
└── globals.css

components/
├── ui/                       # Base UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── habits/                   # Habit-specific
├── gamification/             # XP, badges, streaks
├── dashboard/                # Dashboard widgets
├── coach/                    # AI coach components
└── charts/                   # Data visualization

lib/
├── api/                      # API clients
├── hooks/                    # Custom React hooks
├── utils/                    # Utilities
├── constants/                # App constants
└── types/                    # TypeScript types

hooks/
├── useAuth.ts
├── useHabits.ts
├── useGamification.ts
├── useAI.ts
└── useRealtime.ts
```

**Key Technical Decisions**

1. **App Router over Pages Router**
   - Server Components for initial load performance
   - Streaming for progressive enhancement
   - Parallel routes for complex layouts

2. **State Management**
   - Server state: React Query (TanStack Query)
   - Client state: Zustand (lightweight)
   - Form state: React Hook Form + Zod

3. **Styling**
   - Tailwind CSS for utility-first styling
   - CSS variables for theming
   - Framer Motion for animations

4. **Real-time**
   - Server-Sent Events (SSE) for live updates
   - WebSocket for AI chat
   - Optimistic UI updates

### F.3 Backend Architecture

**Service Architecture (Microservices-lite)**

```typescript
// API Route Handler Pattern
// app/api/habits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { habitService } from '@/services/habit';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const habits = await habitService.getUserHabits(session.user.id);
  return NextResponse.json(habits);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  const habit = await habitService.createHabit(session.user.id, body);
  
  // Trigger gamification
  await gamificationService.awardXP(session.user.id, 'habit_created', 25);
  
  return NextResponse.json(habit, { status: 201 });
}
```

**Service Layer Pattern**

```typescript
// services/gamification.ts
export class GamificationService {
  async awardXP(
    userId: string, 
    action: XPAction, 
    baseAmount: number,
    context?: AwardContext
  ): Promise<XPResult> {
    // Calculate final XP with bonuses
    const finalXP = this.calculateXP(action, baseAmount, context);
    
    // Update user XP
    await db.transaction(async (trx) => {
      await trx.userStats.increment('total_xp', finalXP.amount);
      
      // Check for level up
      const newLevel = await this.checkLevelUp(userId);
      
      // Record transaction
      await trx.xpTransactions.create({
        userId,
        action,
        amount: finalXP.amount,
        bonuses: finalXP.bonuses,
        metadata: context
      });
      
      return { xp: finalXP, levelUp: newLevel };
    });
  }
  
  async checkLevelUp(userId: string): Promise<LevelUpResult | null> {
    const stats = await db.userStats.findUnique({ where: { userId } });
    const currentLevel = stats.level;
    const newLevel = getLevelFromXP(stats.total_xp);
    
    if (newLevel > currentLevel) {
      await db.userStats.update({
        where: { userId },
        data: { level: newLevel }
      });
      
      // Award level up bonus
      await this.awardXP(userId, 'level_up', 200);
      
      return { oldLevel: currentLevel, newLevel };
    }
    
    return null;
  }
}
```

### F.4 Authentication Architecture

**Auth Stack**
- **Framework**: NextAuth.js v5 (Auth.js)
- **Providers**: Email/Password, Google OAuth, Facebook OAuth
- **Session**: JWT with database persistence
- **Security**: CSRF protection, rate limiting, secure headers

**Auth Flow**

```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Validate credentials
        const user = await validateCredentials(credentials);
        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.subscription = user.subscription;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.userId;
      session.user.subscription = token.subscription;
      return session;
    }
  }
});
```

### F.5 Database Architecture

**Primary Database: PostgreSQL**
- Main data store for all persistent data
- ACID compliance for financial transactions
- JSONB for flexible metadata
- Full-text search for content

**Cache Layer: Redis**
- Session storage
- Real-time leaderboards (sorted sets)
- Rate limiting counters
- AI conversation context

**File Storage: S3/MinIO**
- User profile photos
- Achievement badges (SVG)
- Exported data (CSV/PDF)

### F.6 API Layer Design

**REST API Structure**

```
/api/v1/
├── auth/
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   ├── POST /forgot-password
│   └── POST /reset-password
├── users/
│   ├── GET /me
│   ├── PATCH /me
│   ├── GET /me/stats
│   └── GET /:id/profile
├── habits/
│   ├── GET /
│   ├── POST /
│   ├── GET /:id
│   ├── PATCH /:id
│   ├── DELETE /:id
│   ├── POST /:id/complete
│   └── GET /:id/history
├── gamification/
│   ├── GET /xp
│   ├── GET /level
│   ├── GET /badges
│   ├── GET /streak
│   └── GET /leaderboard/:type
├── ai/
│   ├── POST /chat
│   ├── GET /suggestions
│   └── POST /feedback
├── social/
│   ├── GET /friends
│   ├── POST /friends/request
│   ├── GET /challenges
│   └── POST /challenges
└── billing/
    ├── GET /subscription
    ├── POST /subscribe
    ├── POST /cancel
    └── GET /invoices
```

---

## Section G: Database Schema

### G.1 Core Tables

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
  
  -- Profile
  bio TEXT,
  location VARCHAR(100),
  timezone VARCHAR(50) DEFAULT 'Africa/Tunis',
  language VARCHAR(10) DEFAULT 'fr',
  
  -- Gamification
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  streak_start_date DATE,
  last_activity_date DATE,
  
  -- Subscription
  subscription_status VARCHAR(20) DEFAULT 'free' CHECK (subscription_status IN ('free', 'trial', 'active', 'cancelled', 'expired')),
  subscription_tier VARCHAR(20),
  trial_ends_at TIMESTAMP,
  subscription_ends_at TIMESTAMP,
  
  -- Metadata
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Indexes for users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_subscription ON users(subscription_status);
CREATE INDEX idx_users_xp ON users(total_xp DESC);

-- Accounts (OAuth)
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
```

### G.2 Habits & Tracking

```sql
-- Habits table
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Basic info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  color VARCHAR(7) DEFAULT '#E07A5F',
  icon VARCHAR(50),
  
  -- Configuration
  frequency_type VARCHAR(20) NOT NULL CHECK (frequency_type IN ('daily', 'weekly', 'custom')),
  frequency_config JSONB, -- e.g., {"days": ["mon", "wed", "fri"]}
  target_value INTEGER DEFAULT 1,
  target_unit VARCHAR(50),
  duration_minutes INTEGER,
  
  -- Difficulty & XP
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),
  base_xp INTEGER DEFAULT 10,
  
  -- Reminders
  reminder_time TIME,
  reminder_days INTEGER[], -- [1, 3, 5] for Mon, Wed, Fri
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE
);

CREATE INDEX idx_habits_user ON habits(user_id);
CREATE INDEX idx_habits_active ON habits(user_id, is_active) WHERE is_active = true;

-- Habit completions (tracking)
CREATE TABLE habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  completion_date DATE NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  value INTEGER DEFAULT 1,
  notes TEXT,
  
  -- XP earned
  xp_earned INTEGER DEFAULT 0,
  bonuses JSONB, -- {"streak": 10, "time": 5}
  
  -- Anti-cheat
  completion_source VARCHAR(20) DEFAULT 'manual' CHECK (completion_source IN ('manual', 'api', 'import')),
  ip_address INET,
  user_agent TEXT,
  
  UNIQUE(habit_id, completion_date)
);

CREATE INDEX idx_completions_user_date ON habit_completions(user_id, completion_date DESC);
CREATE INDEX idx_completions_habit ON habit_completions(habit_id, completion_date DESC);

-- Habit templates (for AI suggestions)
CREATE TABLE habit_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  difficulty INTEGER DEFAULT 2,
  base_xp INTEGER DEFAULT 10,
  icon VARCHAR(50),
  color VARCHAR(7),
  tags TEXT[],
  popularity_score INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);
```

### G.3 Gamification Tables

```sql
-- XP transactions (audit log)
CREATE TABLE xp_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  action VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  base_amount INTEGER NOT NULL,
  bonuses JSONB,
  
  reference_type VARCHAR(50), -- 'habit', 'badge', 'challenge', etc.
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

-- User badges (earned)
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

-- Leaderboard snapshots (for historical data)
CREATE TABLE leaderboard_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  period_start DATE NOT NULL,
  
  rank INTEGER NOT NULL,
  xp_earned INTEGER NOT NULL,
  habits_completed INTEGER NOT NULL,
  
  UNIQUE(user_id, period_type, period_start)
);

CREATE INDEX idx_leaderboard_period ON leaderboard_snapshots(period_type, period_start, rank);
```

### G.4 Social Tables

```sql
-- Friends/connections
CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  addressee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
  requested_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  
  UNIQUE(requester_id, addressee_id)
);

CREATE INDEX idx_friendships_user ON friendships(requester_id, status);
CREATE INDEX idx_friendships_friend ON friendships(addressee_id, status);

-- Challenges
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  goal_type VARCHAR(50) NOT NULL,
  goal_target INTEGER NOT NULL,
  
  is_public BOOLEAN DEFAULT false,
  max_participants INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Challenge participants
CREATE TABLE challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  joined_at TIMESTAMP DEFAULT NOW(),
  current_progress INTEGER DEFAULT 0,
  final_rank INTEGER,
  
  UNIQUE(challenge_id, user_id)
);
```

### G.5 AI Tables

```sql
-- AI conversations
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  language VARCHAR(10),
  
  model_used VARCHAR(50),
  tokens_used INTEGER,
  response_time_ms INTEGER,
  
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_session ON ai_conversations(user_id, session_id, created_at DESC);
CREATE INDEX idx_conversations_user ON ai_conversations(user_id, created_at DESC);

-- User AI preferences/profile
CREATE TABLE user_ai_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  
  preferred_language VARCHAR(10) DEFAULT 'fr',
  communication_style VARCHAR(50) DEFAULT 'friendly',
  
  motivation_triggers JSONB,
  common_challenges JSONB,
  success_patterns JSONB,
  
  daily_message_count INTEGER DEFAULT 0,
  last_message_date DATE,
  
  last_summary_update TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- AI feedback (for improvement)
CREATE TABLE ai_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES ai_conversations(id),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback_text TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

### G.6 Billing Tables

```sql
-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  stripe_subscription_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  
  tier VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  
  cancel_at_period_end BOOLEAN DEFAULT false,
  canceled_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Local payment records (D17, Flouci)
CREATE TABLE local_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  provider VARCHAR(20) NOT NULL CHECK (provider IN ('d17', 'flouci', 'orange_money')),
  provider_transaction_id VARCHAR(255),
  
  amount DECIMAL(10, 3) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TND',
  
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  
  subscription_id UUID REFERENCES subscriptions(id),
  
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Invoices
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  amount DECIMAL(10, 3) NOT NULL,
  currency VARCHAR(3) DEFAULT 'TND',
  
  status VARCHAR(20) DEFAULT 'pending',
  paid_at TIMESTAMP,
  
  pdf_url TEXT,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

### G.7 Indexes Summary

```sql
-- Performance indexes
CREATE INDEX CONCURRENTLY idx_users_active_xp ON users(is_active, total_xp DESC) WHERE is_active = true;
CREATE INDEX CONCURRENTLY idx_habits_user_active ON habits(user_id) WHERE is_active = true AND is_archived = false;
CREATE INDEX CONCURRENTLY idx_completions_date ON habit_completions(completion_date DESC);
CREATE INDEX CONCURRENTLY idx_xp_user_date ON xp_transactions(user_id, created_at DESC);
CREATE INDEX CONCURRENTLY idx_conversations_recent ON ai_conversations(user_id, created_at DESC);

-- Full-text search
CREATE INDEX idx_habits_search ON habits USING gin(to_tsvector('french', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_users_search ON users USING gin(to_tsvector('french', name || ' ' || COALESCE(username, '')));
```

---

## Section H: API Specifications

### H.1 Authentication Endpoints

#### POST /api/auth/register
```json
// Request
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "Youssef Ben Ali",
  "username": "youssef_b"
}

// Response 201
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Youssef Ben Ali",
    "username": "youssef_b",
    "level": 1,
    "total_xp": 0
  },
  "token": "jwt_token"
}
```

#### POST /api/auth/login
```json
// Request
{
  "email": "user@example.com",
  "password": "securePassword123"
}

// Response 200
{
  "user": { ... },
  "token": "jwt_token"
}
```

### H.2 Habit Endpoints

#### GET /api/habits
```json
// Response 200
{
  "habits": [
    {
      "id": "uuid",
      "name": "Méditation",
      "category": "wellness",
      "color": "#81B29A",
      "difficulty": 2,
      "base_xp": 20,
      "streak": 5,
      "completed_today": true,
      "reminder_time": "07:00"
    }
  ],
  "summary": {
    "total": 3,
    "completed_today": 2,
    "total_xp_available": 60
  }
}
```

#### POST /api/habits
```json
// Request
{
  "name": "Lecture",
  "category": "learning",
  "difficulty": 3,
  "frequency_type": "daily",
  "reminder_time": "20:00"
}

// Response 201
{
  "id": "uuid",
  "name": "Lecture",
  "category": "learning",
  "difficulty": 3,
  "base_xp": 30,
  "created_at": "2025-01-30T10:00:00Z"
}
```

#### POST /api/habits/:id/complete
```json
// Request
{
  "notes": "Lu 25 pages",
  "value": 25
}

// Response 200
{
  "completion": {
    "id": "uuid",
    "habit_id": "uuid",
    "completed_at": "2025-01-30T20:30:00Z",
    "xp_earned": 35,
    "bonuses": {
      "streak": 5,
      "time": 0
    }
  },
  "gamification": {
    "total_xp": 485,
    "level": 3,
    "level_up": false,
    "streak": 6,
    "badge_earned": null
  }
}
```

### H.3 Gamification Endpoints

#### GET /api/gamification/stats
```json
// Response 200
{
  "user": {
    "level": 3,
    "title": "Débutant",
    "total_xp": 485,
    "xp_to_next_level": 115,
    "next_level": 4
  },
  "streak": {
    "current": 6,
    "longest": 12,
    "is_at_risk": false,
    "freeze_available": true
  },
  "today": {
    "xp_earned": 35,
    "habits_completed": 2,
    "habits_total": 3
  }
}
```

#### GET /api/gamification/leaderboard/:type
```json
// type: 'global' | 'friends' | 'regional'

// Response 200
{
  "type": "friends",
  "period": "weekly",
  "updated_at": "2025-01-30T12:00:00Z",
  "entries": [
    {
      "rank": 1,
      "user": {
        "id": "uuid",
        "name": "Amira",
        "username": "amira_k",
        "avatar_url": "...",
        "level": 5
      },
      "xp": 1240,
      "is_current_user": false
    },
    {
      "rank": 2,
      "user": { ... },
      "xp": 485,
      "is_current_user": true
    }
  ],
  "user_rank": 2
}
```

### H.4 AI Endpoints

#### POST /api/ai/chat
```json
// Request
{
  "message": "J'ai du mal à rester motivé",
  "session_id": "uuid (optional)"
}

// Response 200
{
  "response": {
    "content": "Je comprends, Youssef. C'est normal d'avoir des hauts et des bas...",
    "language": "fr",
    "model": "gpt-4o"
  },
  "session_id": "uuid",
  "context": {
    "messages_remaining": 4,
    "is_premium": false
  }
}
```

#### GET /api/ai/suggestions
```json
// Response 200
{
  "habits": [
    {
      "id": "template_uuid",
      "name": "Lecture 20 min",
      "category": "learning",
      "confidence": 0.85,
      "reason": "Basé sur ton objectif d'apprentissage"
    }
  ],
  "optimal_times": [
    {
      "habit_category": "fitness",
      "suggested_time": "18:00",
      "confidence": 0.78,
      "reason": "Tu complètes 85% de tes habitudes sportives entre 17h et 19h"
    }
  ]
}
```

### H.5 Billing Endpoints

#### GET /api/billing/subscription
```json
// Response 200
{
  "status": "free",
  "tier": null,
  "features": {
    "max_habits": 3,
    "ai_messages_per_day": 5,
    "has_ads": true
  },
  "upgrade_options": [
    {
      "tier": "premium",
      "name": "Premium",
      "price_monthly": 19.90,
      "price_yearly": 179.00,
      "currency": "TND",
      "savings": "25%"
    }
  ]
}
```

#### POST /api/billing/subscribe
```json
// Request
{
  "tier": "premium",
  "billing_cycle": "monthly",
  "payment_method": "flouci"
}

// Response 200
{
  "subscription": {
    "id": "uuid",
    "tier": "premium",
    "status": "pending",
    "payment_url": "https://flouci.com/pay/..."
  }
}
```

### H.6 Webhook Endpoints

#### POST /api/webhooks/flouci
```json
// Flouci webhook payload
{
  "transaction_id": "flouci_txn_id",
  "status": "completed",
  "amount": 19.90,
  "currency": "TND",
  "metadata": {
    "user_id": "uuid",
    "subscription_id": "uuid"
  }
}

// Response 200
{
  "received": true,
  "subscription_activated": true
}
```

---

## Section I: Implementation Roadmap

### I.1 Phase 1: MVP (Months 1-4)

**Goal**: Core habit tracking with basic gamification

**Deliverables**

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| 1-2 | Foundation | Project setup, auth, database schema |
| 3-4 | Habits Core | CRUD, completion tracking, basic UI |
| 5-6 | Gamification v1 | XP, levels, basic badges, streaks |
| 7-8 | UI Polish | Mobile-first design, animations |
| 9-10 | Onboarding | 5-step flow, progressive tutorial |
| 11-12 | Testing & Launch | Beta with 100 users, bug fixes |
| 13-16 | Iteration | Feedback integration, performance |

**Success Criteria**
- 1,000 registered users
- 60% Day 1 retention
- 3% free-to-paid conversion
- Core habit tracking functional
- Basic gamification working

**Team Size**: 2-3 developers, 1 designer

### I.2 Phase 2: Growth (Months 5-8)

**Goal**: AI features, social elements, payment integration

**Deliverables**

| Month | Focus | Key Deliverables |
|-------|-------|------------------|
| 5 | AI Coach v1 | GPT-4o integration, chat interface |
| 6 | Social | Friends, leaderboards, challenges |
| 7 | Payments | D17/Flouci integration, subscriptions |
| 8 | Optimization | Performance, retention improvements |

**Success Criteria**
- 10,000 registered users
- 45% Day 7 retention
- 5% free-to-paid conversion
- 100 paid subscribers
- AI interactions: 3+ per user per day

**Team Size**: 3-4 developers, 1 designer, 1 PM

### I.3 Phase 3: Scale (Months 9-12)

**Goal**: Advanced features, market expansion, monetization optimization

**Deliverables**

| Month | Focus | Key Deliverables |
|-------|-------|------------------|
| 9 | Advanced AI | TunBERT integration, personalized insights |
| 10 | Content | Habit templates, educational content |
| 11 | Enterprise | B2B offering, team features |
| 12 | Expansion | Other Maghreb markets (Morocco, Algeria) |

**Success Criteria**
- 50,000 registered users
- 25% Day 30 retention
- 6% free-to-paid conversion
- 500 paid subscribers
- Break-even on unit economics

**Team Size**: 5-6 developers, 2 designers, 1 PM, 1 marketing

### I.4 Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Payment integration delays** | Medium | High | Start D17/Flouci discussions early; have Stripe as backup |
| **Low Tunisian Derja AI quality** | Medium | Medium | Invest in TunBERT fine-tuning; fallback to French |
| **Slow user acquisition** | Medium | High | Partner with Tunisian influencers; university ambassador program |
| **High churn** | Low | High | Focus on habit formation science; strong onboarding |
| **Competition from global apps** | Medium | Medium | Local differentiation; Tunisian community focus |
| **Technical debt** | Medium | Medium | Code reviews; automated testing from day 1 |

### I.5 Key Milestones

```
Month 1  ████ Foundation complete
Month 2  ████ MVP internal testing
Month 3  ████ Private beta (100 users)
Month 4  ████ Public launch
Month 5  ████ AI features beta
Month 6  ████ Social features live
Month 7  ████ Monetization active
Month 8  ████ 10K users milestone
Month 9  ████ Advanced AI launch
Month 12 ████ 50K users, break-even
```

---

## Parallel Execution Graph

### Wave 1: Foundation (Weeks 1-4) - START IMMEDIATELY

Parallel tasks that can begin simultaneously:

```
Wave 1A: Infrastructure (unspecified-high)
├── Task 1.1: Project setup & repository
├── Task 1.2: Database schema implementation
├── Task 1.3: Authentication system
└── Task 1.4: CI/CD pipeline

Wave 1B: Design System (visual-engineering)
├── Task 1.5: Design tokens & color system
├── Task 1.6: Base component library
├── Task 1.7: Mobile-first layouts
└── Task 1.8: Animation system

Wave 1C: Core Backend (unspecified-high)
├── Task 1.9: API structure & middleware
├── Task 1.10: User service
└── Task 1.11: Basic error handling
```

### Wave 2: Core Features (Weeks 5-8)

```
Wave 2A: Habit System (unspecified-high)
├── Task 2.1: Habit CRUD API
├── Task 2.2: Completion tracking
├── Task 2.3: Reminder system
└── Task 2.4: Habit UI components

Wave 2B: Gamification v1 (unspecified-high)
├── Task 2.5: XP calculation engine
├── Task 2.6: Level progression system
├── Task 2.7: Basic badges
└── Task 2.8: Streak tracking

Wave 2C: Dashboard (visual-engineering)
├── Task 2.9: Dashboard layout
├── Task 2.10: Progress widgets
└── Task 2.11: Mobile navigation
```

### Wave 3: User Experience (Weeks 9-12)

```
Wave 3A: Onboarding (visual-engineering)
├── Task 3.1: 5-step onboarding flow
├── Task 3.2: Goal selection UI
├── Task 3.3: Progressive tutorial
└── Task 3.4: First experience optimization

Wave 3B: Polish (visual-engineering)
├── Task 3.5: Micro-interactions
├── Task 3.6: Loading states
├── Task 3.7: Error states
└── Task 3.8: Push notification setup
```

### Wave 4: Advanced Features (Weeks 13-20)

```
Wave 4A: AI Integration (unspecified-high)
├── Task 4.1: GPT-4o integration
├── Task 4.2: Chat interface
├── Task 4.3: Context management
└── Task 4.4: Language detection

Wave 4B: Social Features (unspecified-high)
├── Task 4.5: Friends system
├── Task 4.6: Leaderboards
├── Task 4.7: Challenges
└── Task 4.8: Real-time updates

Wave 4C: Monetization (unspecified-high)
├── Task 4.9: D17 integration
├── Task 4.10: Flouci integration
├── Task 4.11: Subscription tiers
└── Task 4.12: Upgrade flows
```

### Wave 5: Optimization (Weeks 21-24)

```
Wave 5A: Performance (unspecified-high)
├── Task 5.1: Database optimization
├── Task 5.2: Caching strategy
├── Task 5.3: Bundle optimization
└── Task 5.4: Core Web Vitals

Wave 5B: Analytics (quick)
├── Task 5.5: Event tracking
├── Task 5.6: Dashboard analytics
└── Task 5.7: A/B testing framework
```

---

## Task Dependencies

### Critical Path

```
Task 1.1 (Project Setup)
    ↓
Task 1.2 (Database Schema)
    ↓
Task 1.3 (Authentication)
    ↓
Task 2.1 (Habit API) ←→ Task 2.5 (XP Engine)
    ↓                       ↓
Task 2.2 (Completion) → Task 2.8 (Streaks)
    ↓
Task 2.9 (Dashboard)
    ↓
Task 3.1 (Onboarding)
    ↓
Task 4.1 (AI Integration)
    ↓
Task 4.9 (Payments)
    ↓
LAUNCH
```

### Dependency Matrix

| Task | Depends On | Blocks | Parallel With |
|------|------------|--------|---------------|
| 1.2 Database | 1.1 | 1.3, 2.1, 2.5 | 1.5, 1.9 |
| 1.3 Auth | 1.2 | 2.1, 2.9, 3.1 | 1.6, 1.10 |
| 2.1 Habit API | 1.3 | 2.2, 2.4 | 2.5, 2.9 |
| 2.5 XP Engine | 1.2 | 2.6, 2.8 | 2.1, 2.9 |
| 2.9 Dashboard | 1.3, 2.1 | 3.1 | 2.2, 2.6 |
| 3.1 Onboarding | 2.9 | 4.1 | 3.5 |
| 4.1 AI | 3.1 | 4.4 | 4.5, 4.9 |
| 4.9 Payments | 3.1 | LAUNCH | 4.5, 4.1 |

---

## Skill Assignments

### Task Categories & Recommended Skills

#### Category: visual-engineering
**Best For**: Frontend UI/UX, design system, animations
**Model**: google/gemini-3-pro

**Tasks**:
- Task 1.5-1.8: Design system
- Task 2.9-2.11: Dashboard UI
- Task 3.1-3.4: Onboarding flows
- Task 3.5-3.8: Polish & interactions

**Recommended Skills**:
- `frontend-ui-ux`: Essential for all visual tasks
- `typescript-programmer`: Type-safe component development
- `svelte-programmer`: If using Svelte components

**Skills Evaluation**:
- ✅ INCLUDED `frontend-ui-ux`: Core requirement for all UI work
- ✅ INCLUDED `typescript-programmer`: Type safety critical
- ❌ OMITTED `python-programmer`: Not relevant to frontend
- ❌ OMITTED `golang-tui-programmer`: Web app, not TUI

---

#### Category: unspecified-high
**Best For**: Complex backend, architecture, integrations
**Model**: anthropic/claude-opus-4-5

**Tasks**:
- Task 1.1-1.4: Infrastructure
- Task 1.9-1.11: Backend foundation
- Task 2.1-2.8: Core systems
- Task 4.1-4.12: Advanced features
- Task 5.1-5.7: Optimization

**Recommended Skills**:
- `typescript-programmer`: Backend TypeScript
- `python-programmer`: TunBERT integration, ML services
- `git-master`: Complex multi-service commits
- `data-scientist`: Analytics, gamification algorithms

**Skills Evaluation**:
- ✅ INCLUDED `typescript-programmer`: Primary backend language
- ✅ INCLUDED `python-programmer`: AI/ML microservices
- ✅ INCLUDED `git-master`: Atomic commits across services
- ✅ INCLUDED `data-scientist`: Gamification formulas, analytics
- ❌ OMITTED `svelte-programmer`: Backend focus

---

#### Category: quick
**Best For**: Small fixes, configuration, documentation
**Model**: anthropic/claude-haiku-4-5

**Tasks**:
- Configuration updates
- Environment setup
- Documentation
- Minor bug fixes

**Recommended Skills**:
- `git-master`: Clean commit history

---

### Detailed Task Assignments

```yaml
# Wave 1: Foundation
tasks:
  - id: "1.1"
    title: "Project Setup"
    category: "unspecified-high"
    skills: ["typescript-programmer", "git-master"]
    
  - id: "1.2"
    title: "Database Schema"
    category: "unspecified-high"
    skills: ["typescript-programmer", "data-scientist"]
    
  - id: "1.3"
    title: "Authentication System"
    category: "unspecified-high"
    skills: ["typescript-programmer", "git-master"]
    
  - id: "1.5"
    title: "Design System"
    category: "visual-engineering"
    skills: ["frontend-ui-ux", "typescript-programmer"]
    
  - id: "1.9"
    title: "API Structure"
    category: "unspecified-high"
    skills: ["typescript-programmer"]

# Wave 2: Core Features
  - id: "2.1"
    title: "Habit CRUD API"
    category: "unspecified-high"
    skills: ["typescript-programmer"]
    
  - id: "2.5"
    title: "XP Engine"
    category: "unspecified-high"
    skills: ["typescript-programmer", "data-scientist"]
    
  - id: "2.9"
    title: "Dashboard UI"
    category: "visual-engineering"
    skills: ["frontend-ui-ux", "typescript-programmer"]

# Wave 3: Experience
  - id: "3.1"
    title: "Onboarding Flow"
    category: "visual-engineering"
    skills: ["frontend-ui-ux", "typescript-programmer"]
    
  - id: "3.5"
    title: "Micro-interactions"
    category: "visual-engineering"
    skills: ["frontend-ui-ux"]

# Wave 4: Advanced
  - id: "4.1"
    title: "GPT-4o Integration"
    category: "unspecified-high"
    skills: ["typescript-programmer", "python-programmer"]
    
  - id: "4.4"
    title: "TunBERT Integration"
    category: "unspecified-high"
    skills: ["python-programmer"]
    
  - id: "4.9"
    title: "D17/Flouci Integration"
    category: "unspecified-high"
    skills: ["typescript-programmer", "git-master"]
```

---

## Success Criteria Summary

### Phase 1 (MVP) Success Metrics
- [ ] 1,000 registered users
- [ ] 60% Day 1 retention
- [ ] 3% free-to-paid conversion
- [ ] Core habit tracking functional
- [ ] Basic gamification (XP, levels, streaks)
- [ ] Mobile-first responsive design
- [ ] 5-step onboarding complete

### Phase 2 (Growth) Success Metrics
- [ ] 10,000 registered users
- [ ] 45% Day 7 retention
- [ ] 5% free-to-paid conversion
- [ ] 100 paid subscribers
- [ ] AI coach functional (5+ messages/day avg)
- [ ] Social features (friends, leaderboards)
- [ ] D17/Flouci payments working

### Phase 3 (Scale) Success Metrics
- [ ] 50,000 registered users
- [ ] 25% Day 30 retention
- [ ] 6% free-to-paid conversion
- [ ] 500 paid subscribers
- [ ] Break-even unit economics
- [ ] TunBERT integration for Derja
- [ ] Expansion to Morocco/Algeria planned

---

## Conclusion

This comprehensive plan provides a production-ready blueprint for building **Liftoff** - a gamified habit-tracking SaaS specifically designed for the Tunisian market. 

### Key Differentiators
1. **Local Payment Integration**: D17 and Flouci for seamless Tunisian payments
2. **Tunisian AI**: TunBERT integration for authentic Derja language support
3. **Mobile-First**: Designed for Tunisia's 85%+ mobile usage
4. **Cultural Relevance**: Ramadan mode, local social norms, Tunisian community

### Immediate Next Steps
1. **Start Wave 1**: Begin with project setup and database schema
2. **Payment Provider Contact**: Reach out to D17 and Flouci for API access
3. **TunBERT Setup**: Deploy Python microservice for Derja NLP
4. **Design System**: Establish visual foundation with "Modern Mediterranean" aesthetic

### Risk Mitigation
- Payment delays mitigated by early provider contact
- AI quality risks addressed through French fallback
- User acquisition through university ambassador program

---

**Plan Version**: 1.0  
**Last Updated**: January 30, 2025  
**Next Review**: After Phase 1 completion
