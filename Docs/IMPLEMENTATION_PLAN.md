# AI Resume Forge - Professional Implementation Plan

## Current State Analysis

### ✅ What's Working
- **Frontend:** React 19 + TypeScript + Vite
- **Gemini AI Integration:** Using `gemini-2.5-flash` for:
  - Professional summary generation
  - Experience description enhancement
- **Styling:** Tailwind CSS with dark/light theme
- **Local Storage:** Auto-save resume data

### ❌ What's Missing for Production
- No user authentication
- No database (only localStorage)
- No backend API
- No resume templates
- No PDF export
- No user accounts/saved resumes

---

## Proposed Architecture (Low-Cost, Future-Proof)

### Tech Stack

| Layer | Technology | Cost | Why |
|-------|------------|------|-----|
| **Frontend** | React + Vite | FREE | Already built |
| **Database** | Turso (libSQL) | FREE tier: 9GB | Edge-native, serverless SQLite |
| **Backend** | Hono.js on Cloudflare Workers | FREE tier: 100k req/day | Lightweight, no Express, edge-native |
| **Auth** | Lucia Auth + Turso | FREE | Open-source, works with Turso |
| **Hosting** | Cloudflare Pages | FREE | Static + edge functions |
| **AI** | Gemini API | FREE tier: 15 RPM | Already integrated |
| **PDF Export** | React-PDF / html2pdf.js | FREE | Client-side generation |

### Why NOT Express.js?
- Express requires always-on server ($5-20/month minimum)
- Cloudflare Workers are serverless + edge = FREE + fast
- Hono.js is Express-like syntax but runs on Workers

---

## Database Schema (Turso/libSQL)

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Resumes table
CREATE TABLE resumes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  template TEXT DEFAULT 'professional',
  data JSON NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Resume shares (public links)
CREATE TABLE resume_shares (
  id TEXT PRIMARY KEY,
  resume_id TEXT NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  views INTEGER DEFAULT 0,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AI usage tracking (for rate limiting)
CREATE TABLE ai_usage (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Hosting Cost Breakdown

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| Cloudflare Pages | Unlimited sites, 500 builds/mo | - |
| Cloudflare Workers | 100k req/day | $5/mo for 10M req |
| Turso | 9GB storage, 500M rows read | $29/mo starter |
| Gemini API | 15 req/min, free | $0.075/1M tokens |
| **Total** | **$0/month** | ~$5-34/month at scale |

---

## Next Steps

See the full implementation plan in the artifact for:
- Complete project structure
- API routes
- Implementation phases
- Security considerations
- Future enhancements
