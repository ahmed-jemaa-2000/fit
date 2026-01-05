# Deployment Guide - Nutrition Coach

Complete guide to deploying your Nutrition Coach application to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Railway/Render account (for backend)
- Supabase account (for database)
- Gemini API key

## Step 1: Database Setup (Supabase)

### 1.1 Create Supabase Project

```bash
1. Go to https://supabase.com
2. Sign in / Create account
3. Click "New Project"
4. Fill in:
   - Name: nutrition-coach
   - Database Password: (generate strong password)
   - Region: (closest to users)
5. Wait for setup to complete
```

### 1.2 Get Database URL

```bash
1. Go to Project Settings → Database
2. Scroll to "Connection string"
3. Copy "Connection string" (with password)
4. Format: postgresql://postgres:[password]@[host]:5432/postgres
```

### 1.3 Initialize Database

```bash
# From your local machine
cd nutrition-coach/backend
# Update .env with Supabase DATABASE_URL
npx prisma generate
npx prisma db push
```

## Step 2: Backend Deployment (Railway)

### 2.1 Push Code to GitHub

```bash
# Initialize git (if not done)
cd nutrition-coach
git init
git add .
git commit -m "Initial commit - Nutrition Coach"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/nutrition-coach.git
git branch -M main
git push -u origin main
```

### 2.2 Deploy to Railway

```bash
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your nutrition-coach repository
6. Select "backend" folder as root directory
```

### 2.3 Configure Environment Variables

In Railway dashboard:

```
DATABASE_URL=your-supabase-connection-string
JWT_SECRET=your-generated-secret (use: openssl rand -base64 32)
GEMINI_API_KEY=your-gemini-api-key
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 2.4 Deploy

```bash
1. Railway will auto-deploy
2. Wait for build to complete
3. Copy the generated URL (e.g., nutrition-coach-production.up.railway.app)
4. Test: https://your-backend-url/health
```

## Step 3: Frontend Deployment (Vercel)

### 3.1 Deploy to Vercel

```bash
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import nutrition-coach repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
```

### 3.2 Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-railway-backend-url/api
```

### 3.3 Deploy

```bash
1. Click "Deploy"
2. Wait for deployment
3. Visit your app URL
```

## Step 4: Update Backend CORS

Update Railway backend environment:

```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Redeploy backend after updating.

## Step 5: Verification Checklist

```
✅ Backend health check: GET https://your-backend-url/health
✅ Backend API: POST https://your-backend-url/api/auth/signup (test user creation)
✅ Frontend loads: https://your-vercel-app.vercel.app
✅ Login works
✅ Profile setup works
✅ Meal logging works
✅ AI coach responds
✅ Charts display data
```

## Step 6: Custom Domain (Optional)

### Backend (Railway)

```
1. Railway Settings → Domains
2. Click "Generate Domain" or add custom domain
3. Update FRONTEND_URL env var with new domain
```

### Frontend (Vercel)

```
1. Vercel Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update VITE_API_URL to use backend custom domain
```

## Production Checklist

### Security

- [ ] All environment variables set correctly
- [ ] JWT_SECRET is strong and secure (32+ characters)
- [ ] Database password is strong
- [ ] CORS configured correctly
- [ ] No .env files in GitHub
- [ ] API keys not exposed in frontend

### Performance

- [ ] Database indexes created (Prisma handles this)
- [ ] Frontend build optimized (Vite handles this)
- [ ] Images optimized
- [ ] API responses cached where appropriate

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Set up log aggregation

### Backup

- [ ] Database backups enabled (Supabase auto-backs up)
- [ ] Code pushed to GitHub

## Troubleshooting

### Backend won't start

```
1. Check Railway logs
2. Verify DATABASE_URL is correct
3. Verify all env vars are set
4. Check Prisma schema is pushed to database
```

### Frontend can't reach backend

```
1. Verify VITE_API_URL is correct
2. Check CORS settings in backend
3. Verify backend is running (health check)
```

### Database connection failed

```
1. Verify DATABASE_URL format
2. Check Supabase project is running
3. Verify IP whitelist (Supabase allows all by default)
```

## Cost Estimate (Free Tier)

- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Railway**: Free ($5 credit/month, ~500 hours)
- **Vercel**: Free (100GB bandwidth, unlimited sites)
- **Gemini API**: Free tier available

**Total**: $0/month for small personal use!

## Scaling Up

When you need more resources:

- **Database**: Supabase Pro ($25/month) - 8GB, backups
- **Backend**: Railway Pro ($20/month) - More resources
- **Frontend**: Vercel Pro ($20/month) - More bandwidth

## Continuous Deployment

Both Railway and Vercel auto-deploy on git push:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push

# Auto-deploys to:
# - Railway (backend)
# - Vercel (frontend)
```

## Alternative Platforms

### Backend Alternatives

- **Render** (similar to Railway)
- **Heroku** (paid only now)
- **DigitalOcean App Platform**

### Frontend Alternatives

- **Netlify** (similar to Vercel)
- **Cloudflare Pages**
- **GitHub Pages** (static only)

### Database Alternatives

- **PlanetScale** (MySQL)
- **Railway PostgreSQL**
- **AWS RDS** (more complex)

## Security Best Practices

1. **Environment Variables**: Never commit .env files
2. **API Keys**: Rotate periodically
3. **JWT Secrets**: Use strong random strings
4. **HTTPS**: Enforced by default on all platforms
5. **Rate Limiting**: Add if experiencing abuse
6. **Input Validation**: Already implemented with Zod

## Monitoring & Analytics

### Recommended Tools

- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Google Analytics**: Usage tracking
- **UptimeRobot**: Uptime monitoring
- **Vercel Analytics**: Frontend performance

## Backup Strategy

### Automated

- Supabase: Auto daily backups (retained 7 days on free tier)
- GitHub: Code versioned
- Railway: Deployment history

### Manual

```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Backup uploads/assets
# (none in current implementation)
```

## Support

If issues arise:

1. Check logs (Railway/Vercel dashboards)
2. Review error messages
3. Verify environment variables
4. Test locally first
5. Check service status pages

---

**Your app is production-ready! Deploy and start tracking nutrition!** 🚀
