# tsconfig.json

## Summary

`tsconfig.json` configures TypeScript for the AI Resume Forge project, optimized for Vite + React.

## File Location

```
Resume-Builder-Test/tsconfig.json
```

## Key Settings

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | `ES2022` | Output JavaScript version |
| `module` | `ESNext` | ES module system |
| `jsx` | `react-jsx` | React 17+ JSX transform |
| `moduleResolution` | `bundler` | Vite-style resolution |
| `noEmit` | `true` | Vite handles compilation |

## Path Aliases

```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

Enables: `import { Button } from '@/components/ui/Button'`

## Lib Includes

- `ES2022` - Modern JS features
- `DOM` - Browser DOM types
- `DOM.Iterable` - Iterable collections

## Lines of Code

- **Total Lines:** 29
- **File Size:** ~570 bytes
