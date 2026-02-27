# Resume Builder

A modern AI-powered resume builder with template-aware editing, LaTeX export, and ATS-friendly formatting.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **AI**: Google Gemini API
- **Export**: LaTeX (.tex), PDF, Print
- **Deployment**: Vercel

## Project Structure

```
resume-builder/
├── src/
│   ├── components/    (common, editor, layout, resume, seo)
│   ├── config/        (template configs)
│   ├── contexts/      (editor context)
│   ├── pages/         (Landing, Templates, Editor)
│   ├── services/      (Gemini AI, LaTeX)
│   ├── styles/        (CSS modules)
│   ├── types/         (TypeScript types)
│   └── utils/         (logger, date, pdf)
├── public/            (favicons, manifest, SEO assets)
├── Docs/              (feature documentation)
├── index.html
├── vite.config.ts
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` at root with your API key:
   ```
   GEMINI_API_KEY=your_key_here
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

## Documentation

See [Docs/FEATURES.md](Docs/FEATURES.md) for complete feature documentation.
