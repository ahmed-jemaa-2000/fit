# Nutrition Coach - AI-Powered Meal Planning & Tracking

A complete full-stack web application that helps you stick to your meal plans with AI-powered nutrition coaching. Built with modern technologies and integrated with Google Gemini AI for personalized guidance.

## Features

### Core Functionality
- **User Authentication** - Secure signup/login with JWT
- **User Profile & Goals** - Personalized nutrition targets based on metrics
- **Meal Tracking** - Log meals with complete nutrition breakdown
- **AI Personal Coach** - Chat with AI nutritionist for advice and motivation
- **Meal Suggestions** - AI-generated meal ideas based on your goals
- **Progress Analytics** - Visual charts and statistics
- **Daily Nutrition Summary** - Track calories, macros, and goals
- **Streak Tracking** - Stay motivated with logging streaks

### AI Features (Gemini Integration)
- Personalized nutrition coaching
- Context-aware meal suggestions
- Weekly progress analysis
- Evidence-based advice
- Dietary restriction support

## Tech Stack

### Backend
- **Node.js** + **Express** - API server
- **TypeScript** - Type-safe development
- **PostgreSQL** - Relational database
- **Prisma** - Modern ORM with migrations
- **JWT** - Authentication
- **Gemini AI** - AI coaching (Google Generative AI)
- **Zod** - Request validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS
- **React Router** - Navigation
- **Zustand** - State management
- **React Query** - Server state management
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Database Schema
- Users & Profiles
- Meals with nutrition data
- Food items library
- AI chat history
- Daily nutrition aggregates

## Prerequisites

- Node.js 18+ (with npm/yarn)
- PostgreSQL 14+ database
- Gemini API key (https://makersuite.google.com/app/apikey)

## Installation & Setup

### 1. Clone/Navigate to Project

```bash
cd nutrition-coach
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your configuration:
# - DATABASE_URL: Your PostgreSQL connection string
# - JWT_SECRET: Random secure string (generate with: openssl rand -base64 32)
# - GEMINI_API_KEY: Your Gemini API key
# - Other settings as needed

# Initialize database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env (usually defaults are fine for local development)

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## Database Setup

### Option 1: Local PostgreSQL

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE nutrition_coach;
```

3. Update `backend/.env`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/nutrition_coach"
```

### Option 2: Supabase (Free Cloud Database)

1. Sign up at https://supabase.com
2. Create new project
3. Copy connection string from Settings → Database
4. Update `backend/.env` with Supabase connection string

## API Documentation

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Profile
- `POST /api/profile` - Create/update profile
- `GET /api/profile` - Get profile
- `PATCH /api/profile` - Update profile

### Meals
- `POST /api/meals` - Log meal
- `GET /api/meals` - Get meals (optional: ?date=YYYY-MM-DD)
- `GET /api/meals/:id` - Get specific meal
- `PATCH /api/meals/:id` - Update meal
- `DELETE /api/meals/:id` - Delete meal

### Nutrition
- `GET /api/nutrition/daily` - Daily summary
- `GET /api/nutrition/weekly` - Weekly data
- `GET /api/nutrition/stats` - Overall stats

### AI Coach
- `POST /api/ai/chat` - Chat with AI coach
- `GET /api/ai/chat/history` - Get chat history
- `POST /api/ai/suggest-meals` - Get meal suggestions
- `GET /api/ai/progress-analysis` - Get progress analysis

## Usage Flow

1. **Sign Up** - Create your account
2. **Setup Profile** - Enter age, weight, height, activity level, and goals
3. **Log Meals** - Track what you eat throughout the day
4. **Get AI Coaching** - Chat with your AI nutritionist for advice
5. **View Progress** - Check daily/weekly stats and charts
6. **Get Meal Ideas** - Ask AI for meal suggestions based on remaining macros

## Development

### Backend Commands
```bash
npm run dev          # Start development server with watch mode
npm run build        # Compile TypeScript to JavaScript
npm run start        # Run production build
npm run prisma:studio # Open Prisma Studio (database GUI)
npm run prisma:migrate # Create and run migrations
```

### Frontend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Structure

```
nutrition-coach/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── src/
│   │   ├── config/               # Environment & database config
│   │   ├── controllers/          # Request handlers
│   │   ├── middleware/           # Auth, error handling
│   │   ├── routes/               # API routes
│   │   ├── services/             # Business logic (Gemini AI)
│   │   ├── utils/                # Helpers (JWT, password, nutrition calc)
│   │   └── server.ts             # Express app entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── pages/                # Route pages
│   │   ├── lib/                  # API client, utilities
│   │   ├── hooks/                # Custom React hooks
│   │   ├── store/                # Zustand state management
│   │   ├── types/                # TypeScript types
│   │   └── App.tsx               # Main app component
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── README.md
```

## Nutrition Calculation

The app uses scientifically-based formulas:

1. **BMR** (Basal Metabolic Rate) - Mifflin-St Jeor Equation
2. **TDEE** (Total Daily Energy Expenditure) - BMR × Activity multiplier
3. **Goal Adjustment** - Calorie surplus/deficit based on goal
4. **Macro Distribution** - Protein/carbs/fat ratios optimized for goal

## Deployment

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect Railway/Render to repository
3. Add environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect Vercel/Netlify to repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy

### Database (Supabase)
- Already cloud-hosted if using Supabase
- For production PostgreSQL, use Railway, Render, or managed providers

## Security Notes

- **NEVER commit .env files**
- Use strong JWT_SECRET (32+ characters random string)
- Use HTTPS in production
- Rotate API keys periodically
- Validate all user inputs (Zod schemas handle this)

## Troubleshooting

### Database connection fails
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Ensure database exists
- Check firewall/network settings

### Prisma errors
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Generate Prisma client
npx prisma generate

# Push schema without migrations
npx prisma db push
```

### CORS errors
- Check FRONTEND_URL in backend/.env matches frontend URL
- Verify backend is running

### Gemini API errors
- Verify API key is valid
- Check you haven't exceeded rate limits
- Ensure proper billing is set up

## Contributing

This is a personal project, but improvements are welcome!

## License

MIT

## Author

Built with love for health and technology

## Support

For issues or questions:
1. Check this README
2. Review error messages carefully
3. Check environment variables
4. Verify all services are running

---

**Happy tracking and stay healthy!** 💪🥗
