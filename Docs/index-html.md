# index.html

## Summary

`index.html` is the main HTML template that serves as the foundation for the React application. It includes all necessary CDN dependencies, Tailwind CSS configuration, CSS custom properties for theming, and the import map for ES modules.

## File Location

```
Resume-Builder-Test/index.html
```

## Structure Overview

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta tags, Title, CDN scripts, Styles, Import map -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## Key Sections

### 1. Meta Tags

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>AI Resume Forge</title>
```

- UTF-8 character encoding
- Responsive viewport configuration
- Application title

### 2. Tailwind CSS Configuration

```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: { sans: ['Inter', 'sans-serif'] },
        colors: { /* CSS variable mappings */ },
        borderRadius: { /* radius variables */ }
      }
    }
  }
</script>
```

- Uses Tailwind CSS via CDN for rapid development
- Custom theme extends default configuration
- Maps CSS variables to Tailwind color utilities

### 3. CSS Custom Properties (Theme System)

#### Light Mode (`:root`)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--background` | `0 0% 100%` | Page background |
| `--foreground` | `222.2 84% 4.9%` | Text color |
| `--primary` | `221.2 83.2% 53.3%` | Primary accent (blue) |
| `--muted` | `210 40% 96.1%` | Muted elements |
| `--destructive` | `0 84.2% 60.2%` | Error/delete actions |

#### Dark Mode (`.dark`)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--background` | `222.2 84% 4.9%` | Dark background |
| `--foreground` | `210 40% 98%` | Light text |
| `--primary` | `217.2 91.2% 59.8%` | Lighter primary |
| `--border` | `217.2 32.6% 17.5%` | Subtle borders |

### 4. Print Styles

```css
@media print {
  @page { margin: 0; }
  body { margin: 1.6cm; }
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  .print-break-inside-avoid { break-inside: avoid; }
}
```

- Removes default page margins
- Adds 1.6cm body margin for content
- Hides UI elements not needed in print
- Shows print-specific content

### 5. Import Map (ES Modules)

```json
{
  "imports": {
    "react/": "https://esm.sh/react@^19.2.3/",
    "react": "https://esm.sh/react@^19.2.3",
    "clsx": "https://esm.sh/clsx@^2.1.1",
    "tailwind-merge": "https://esm.sh/tailwind-merge@^3.4.0",
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
    "@google/genai": "https://esm.sh/@google/genai@^1.38.0",
    "lucide-react": "https://esm.sh/lucide-react@^0.562.0"
  }
}
```

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.3 | UI library |
| `react-dom` | ^19.2.3 | DOM rendering |
| `clsx` | ^2.1.1 | Conditional class names |
| `tailwind-merge` | ^3.4.0 | Tailwind class merging |
| `@google/genai` | ^1.38.0 | Gemini AI SDK |
| `lucide-react` | ^0.562.0 | Icon library |

### 6. Google Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- Loads Inter font family
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- `display=swap` ensures text remains visible during font load

## Body Configuration

```html
<body class="bg-background text-foreground antialiased min-h-screen font-sans">
  <div id="root"></div>
</body>
```

- Uses theme CSS variables
- Enables font antialiasing
- Sets minimum height to full viewport
- Uses Inter font family

## Lines of Code

- **Total Lines:** 130
- **File Size:** ~4.6 KB
