# Turso Database Setup Guide

## What is Turso?

Turso is a **serverless SQLite database** that runs at the edge. It's based on libSQL (a fork of SQLite) and offers:
- **Free tier:** 9GB storage, 500M rows read/month
- **Edge locations:** Data close to users globally
- **SQLite compatibility:** Same syntax you know

---

## Step 1: Install Turso CLI

### Windows (PowerShell)
```powershell
# Using scoop (recommended)
scoop install turso

# Or using winget
winget install Turso.TursoCLI
```

### macOS/Linux
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

---

## Step 2: Login to Turso

```bash
turso auth login
```

This opens your browser to authenticate with GitHub.

---

## Step 3: Create Database

```bash
# Create a new database
turso db create resume-forge

# Get the database URL
turso db show resume-forge --url
# Output: libsql://resume-forge-yourusername.turso.io
```

---

## Step 4: Create Auth Token

```bash
# Create a token for your database
turso db tokens create resume-forge

# Output: eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
```

---

## Step 5: Update Environment Variables

Edit `.env.local` in your project root:

```env
# Turso Database
TURSO_DATABASE_URL=libsql://resume-forge-yourusername.turso.io
TURSO_AUTH_TOKEN=your_token_from_step_4

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# API Secret (generate a random string)
JWT_SECRET=generate-a-random-32-char-string
```

---

## Step 6: Run Database Migrations

```bash
# Generate migration files
cd apps/api
npx drizzle-kit generate

# Push schema to Turso
npx drizzle-kit push
```

---

## Step 7: Verify Setup

```bash
# Open Drizzle Studio to view your database
npx drizzle-kit studio
```

This opens a web UI at `http://localhost:4983` to manage your data.

---

## Turso CLI Cheatsheet

| Command | Description |
|---------|-------------|
| `turso db list` | List all databases |
| `turso db show <name>` | Show database details |
| `turso db shell <name>` | Open SQL shell |
| `turso db tokens create <name>` | Create auth token |
| `turso db destroy <name>` | Delete database |

---

## Pricing Reference

| Plan | Storage | Rows Read | Price |
|------|---------|-----------|-------|
| **Starter (Free)** | 9 GB | 500M/month | $0 |
| Scaler | 12 GB | 1B/month | $29/month |
| Pro | 50 GB | 25B/month | $99/month |

The free tier is **more than enough** for a resume builder with thousands of users.

---

## Troubleshooting

### "Database not found"
```bash
turso db list  # Check if database exists
turso auth login  # Re-authenticate
```

### "Invalid token"
```bash
turso db tokens create resume-forge  # Generate new token
```

### Connection timeout
- Check if URL includes `libsql://` prefix
- Verify token is correct and not expired
