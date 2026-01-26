# Navbar Component Documentation

## Overview
`Navbar.tsx` is the universal navigation component that appears on all pages. It features:
- Eco-Haat style floating island design
- Global theme toggle (light/dark mode)
- Editor-specific controls when on `/editor` route
- Responsive mobile menu

## Location
`apps/web/src/components/Navbar.tsx`

## Features

### Universal Elements
- **Logo**: FreeMium Resume branding with icon
- **Navigation Links**: Home, Templates, Resume Editor, Features (hidden on editor)
- **Theme Toggle**: Sun/Moon buttons for light/dark mode
- **Settings Button**: Opens SettingsModal
- **Mobile Menu**: Hamburger menu for responsive navigation

### Editor-Specific Controls
When on the `/editor` route, the navbar shows:
- **Template Selector**: Opens template modal via EditorContext
- **Reset Button**: Clears resume data via EditorContext
- **Download Button**: Exports PDF via EditorContext

## Route Detection
Uses `useLocation()` from React Router to detect current route:
```tsx
const location = useLocation();
const isEditorPage = location.pathname === '/editor';
```

## Editor Context Integration
Uses `useEditorOptional()` to safely access editor state:
```tsx
const editorContext = useEditorOptional();

// Only renders when context exists
{isEditorPage && editorContext && (
  <button onClick={editorContext.handleDownloadPDF}>
    <Download />
  </button>
)}
```

## Active Route Highlighting
Navigation links show active state based on current pathname:
```tsx
className={location.pathname === '/' 
  ? 'text-teal-700 bg-teal-50 border-teal-200' 
  : 'text-slate-600 hover:bg-slate-50'}
```

## Styling
- Background color: `#D5E4EC` (light mode)
- Floating design with `rounded-2xl` and shadow
- Backdrop blur effect
- Consistent `rounded-xl` buttons

## Dark Mode
Global dark mode state with localStorage persistence:
```tsx
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
});

useEffect(() => {
  document.documentElement.classList.toggle('dark', darkMode);
  localStorage.setItem('darkMode', String(darkMode));
}, [darkMode]);
```
