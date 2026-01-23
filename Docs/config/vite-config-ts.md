# vite.config.ts

## Summary

`vite.config.ts` configures Vite build tool for the AI Resume Forge project, including dev server settings, React plugin, environment variables, and path aliases.

## File Location

```
Resume-Builder-Test/vite.config.ts
```

## Configuration

```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, '.') }
    }
  };
});
```

## Key Settings

| Setting | Value | Purpose |
|---------|-------|---------|
| `server.port` | `3000` | Dev server port |
| `server.host` | `0.0.0.0` | Allow external access |
| `plugins` | `[react()]` | Enable React + HMR |

## Environment Variables

Loads `GEMINI_API_KEY` from `.env.local` and exposes it as `process.env.API_KEY`.

## Path Alias

```typescript
alias: { '@': path.resolve(__dirname, '.') }
```

Matches `tsconfig.json` path mapping.

## Lines of Code

- **Total Lines:** 24
- **File Size:** ~603 bytes
