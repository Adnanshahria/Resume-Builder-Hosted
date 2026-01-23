# App.tsx

## Summary

`App.tsx` is the main application component that serves as the root of the AI Resume Forge application. It orchestrates the overall layout, manages global state, and handles the print functionality.

## File Location

```
Resume-Builder-Test/App.tsx
```

## Dependencies

- **React**: `useState`, `useRef`, `useEffect` hooks
- **Types**: `ResumeData` from `./types`
- **Components**: `ResumeForm`, `ResumePreview`, `Button`
- **Icons**: `FileDown`, `LayoutTemplate`, `Printer` from `lucide-react`

## Key Features

### 1. State Management

```typescript
const [data, setData] = useState<ResumeData>(() => {
  const saved = localStorage.getItem('resumeData');
  return saved ? JSON.parse(saved) : INITIAL_DATA;
});
```

- Uses React's `useState` with lazy initialization
- Loads saved data from `localStorage` on mount
- Falls back to `INITIAL_DATA` if no saved data exists

### 2. Auto-save to LocalStorage

```typescript
useEffect(() => {
  localStorage.setItem('resumeData', JSON.stringify(data));
}, [data]);
```

- Automatically persists resume data whenever it changes
- Ensures users don't lose their work

### 3. Responsive Preview Scaling

```typescript
useEffect(() => {
  const handleResize = () => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      const scale = Math.min((width - 40) / 794, 0.8);
      setPreviewScale(Math.max(scale, 0.3));
    }
  };
  // ...
}, []);
```

- Dynamically adjusts the resume preview scale based on container width
- A4 paper width (210mm ≈ 794px) is used as reference
- Scale is clamped between 0.3 and 0.8

### 4. Print Functionality

```typescript
const handlePrint = () => {
  window.print();
};
```

- Simple print handler using `window.print()`
- CSS media queries hide editor and show print-only content

## Component Structure

```
<div> (Root - min-h-screen)
├── <nav> (Navbar - sticky)
│   ├── Logo + Brand Name
│   └── Action Buttons (Clear, Print)
├── <main> (Editor area - grid layout)
│   ├── <div> (Left: Editor)
│   │   └── <ResumeForm />
│   └── <div> (Right: Preview)
│       └── <ResumePreview />
└── <div> (Print View - hidden normally)
    └── <ResumePreview scale={1} />
```

## Initial Data Structure

```typescript
const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    title: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "AI Integration"],
};
```

## CSS Classes Used

- `min-h-screen`, `bg-background`, `text-foreground` - Root styling
- `no-print` - Elements hidden during print
- `print-only` - Elements shown only during print
- `backdrop-blur`, `supports-[backdrop-filter]` - Glassmorphism effects

## Props Passed to Children

| Component | Props |
|-----------|-------|
| `ResumeForm` | `data`, `onChange` |
| `ResumePreview` | `data`, `scale` |

## Lines of Code

- **Total Lines:** 115
- **File Size:** ~4.2 KB
