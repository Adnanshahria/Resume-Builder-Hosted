# AI Resume Forge - Documentation

A professional AI-powered resume builder with multiple templates, Gemini AI integration, and cloud sync.

## 🏗️ Project Structure

```
Resume-Builder-Test/
├── apps/
│   ├── web/                # React + Vite frontend
│   │   ├── src/
│   │   │   ├── components/ # React components
│   │   │   ├── lib/        # Template definitions
│   │   │   ├── services/   # API services
│   │   │   ├── styles/     # CSS files
│   │   │   └── types/      # TypeScript types
│   │   └── index.html
│   └── api/                # Hono.js backend
│       ├── src/
│       │   ├── routes/     # API routes
│       │   └── db/         # Database schema
│       └── wrangler.toml
├── packages/
│   └── shared/             # Shared types
└── Docs/                   # Documentation
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev:web

# Open http://localhost:6969
```

## 📚 Documentation Index

### Setup Guides
- [Turso Database Setup](./TURSO_SETUP.md)
- [Google Ads Integration](./GOOGLE_ADS_INTEGRATION.md)

### Architecture
- [Implementation Plan](./IMPLEMENTATION_PLAN.md)

### Components
- [ResumeForm](./components/ResumeForm-tsx.md)
- [ResumePreview](./components/ResumePreview-tsx.md)
- [Button](./components/ui/Button-tsx.md)

### Services
- [Gemini AI Service](./services/geminiService-ts.md)

### Configuration
- [Package.json](./config/package-json.md)
- [TypeScript Config](./config/tsconfig-json.md)
- [Vite Config](./config/vite-config-ts.md)

## 🎨 Resume Templates

1. **Professional** - Clean, classic design for business roles
2. **Developer** - Modern tech-focused with sidebar
3. **Technical** - Engineering grid layout
4. **Medical** - Healthcare professional design
5. **Creative** - Bold, expressive for designers

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite + TypeScript |
| Backend | Hono.js on Cloudflare Workers |
| Database | Turso (libSQL) |
| AI | Google Gemini 2.5 Flash |
| Styling | Tailwind CSS |

## 💰 Google Ads

See [GOOGLE_ADS_INTEGRATION.md](./GOOGLE_ADS_INTEGRATION.md) for complete setup guide.

## 📄 License

MIT
