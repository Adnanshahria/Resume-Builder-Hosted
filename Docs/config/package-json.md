# package.json

## Summary

`package.json` is the npm configuration file that defines the project metadata, scripts, and dependencies for the AI Resume Forge application.

## File Location

```
Resume-Builder-Test/package.json
```

## Configuration Overview

```json
{
  "name": "ai-resume-forge",
  "private": true,
  "version": "0.0.0",
  "type": "module"
}
```

| Field | Value | Description |
|-------|-------|-------------|
| `name` | `ai-resume-forge` | Package identifier |
| `private` | `true` | Not published to npm |
| `version` | `0.0.0` | Initial version |
| `type` | `module` | ES modules (import/export) |

## NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start development server with HMR |
| `build` | `vite build` | Create production build |
| `preview` | `vite preview` | Preview production build locally |

### Running Scripts

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Build to dist/ folder
npm run preview  # Preview built app
```

## Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0",
    "@google/genai": "^1.38.0",
    "lucide-react": "^0.562.0"
  }
}
```

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.3 | Core UI library |
| `react-dom` | ^19.2.3 | React DOM renderer |
| `clsx` | ^2.1.1 | Conditional class names utility |
| `tailwind-merge` | ^3.4.0 | Smart Tailwind class merging |
| `@google/genai` | ^1.38.0 | Google Gemini AI SDK |
| `lucide-react` | ^0.562.0 | Modern icon library |

### Package Descriptions

#### React & React-DOM
- React 19.x with concurrent features
- Latest stable release
- Used for component-based UI

#### clsx
- Utility for constructing className strings conditionally
- Lightweight alternative to classnames
- Example: `clsx('base', { active: isActive })`

#### tailwind-merge
- Merge Tailwind CSS classes without conflicts
- Later classes override earlier ones intelligently
- Example: `twMerge('p-2', 'p-4')` → `'p-4'`

#### @google/genai
- Official Google Gemini AI SDK
- Used for AI-powered content generation
- Requires API key for authentication

#### lucide-react
- Modern fork of Feather Icons
- Tree-shakeable (only imports used icons)
- React components for each icon

## Dev Dependencies

```json
{
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0"
  }
}
```

| Package | Version | Purpose |
|---------|---------|---------|
| `@types/node` | ^22.14.0 | Node.js type definitions |
| `@vitejs/plugin-react` | ^5.0.0 | Vite React plugin (JSX, HMR) |
| `typescript` | ~5.8.2 | TypeScript compiler |
| `vite` | ^6.2.0 | Build tool and dev server |

### Package Descriptions

#### @types/node
- TypeScript definitions for Node.js APIs
- Enables types for `process.env`, `path`, etc.

#### @vitejs/plugin-react
- Enables React Fast Refresh (HMR)
- JSX runtime transformation
- React-specific optimizations

#### TypeScript
- Static type checking
- Enhanced IDE support
- Compile-time error detection

#### Vite
- Fast development server
- Lightning-fast HMR
- Optimized production builds
- ES module-based architecture

## Version Ranges

| Symbol | Meaning | Example |
|--------|---------|---------|
| `^` | Compatible with version | `^19.2.3` → 19.x.x |
| `~` | Approximately equivalent | `~5.8.2` → 5.8.x |

## Lines of Code

- **Total Lines:** 26
- **File Size:** ~554 bytes
