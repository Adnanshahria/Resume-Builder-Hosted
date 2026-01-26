# EditorContext Component Documentation

## Overview
`EditorContext.tsx` provides a React Context for sharing editor state between the global `Navbar` and `EditorPage` components. This enables the navbar to display editor-specific controls (Template selector, Reset, Download) when on the `/editor` route.

## Location
`apps/web/src/contexts/EditorContext.tsx`

## Exports

### `EditorProvider`
A React context provider component that wraps the editor route to share state.

### `useEditor()`
Hook to access editor context. Throws error if used outside `EditorProvider`.

### `useEditorOptional()`
Hook that returns context or `null` if not within provider. Used by Navbar.

### `INITIAL_DATA`
Default empty resume data structure.

## Context Values

| Property | Type | Description |
|----------|------|-------------|
| `data` | `ResumeData` | Current resume data |
| `setData` | `Dispatch` | Update resume data |
| `selectedTemplate` | `TemplateType` | Currently selected template |
| `setSelectedTemplate` | `Dispatch` | Change template |
| `showTemplates` | `boolean` | Template modal visibility |
| `setShowTemplates` | `Dispatch` | Toggle template modal |
| `templates` | `Template[]` | Available template list |
| `handleReset` | `() => void` | Reset to initial data |
| `handleDownloadPDF` | `() => Promise` | Export resume as PDF |
| `exportingPDF` | `boolean` | PDF export loading state |
| `previewScale` | `number` | Resume preview zoom level |
| `mobileView` | `'edit' \| 'preview'` | Mobile view mode |
| `setMobileView` | `Dispatch` | Toggle mobile view |
| `containerRef` | `RefObject` | Preview container ref |

## Usage in App.tsx

```tsx
import { EditorProvider } from './contexts/EditorContext';

// Wrap editor route with provider
const EditorWithProvider = () => (
  <EditorProvider>
    <Navbar />
    <EditorPage />
  </EditorProvider>
);

// In routes
<Route path="/editor" element={<EditorWithProvider />} />
```

## Usage in Navbar

```tsx
import { useEditorOptional } from '../contexts/EditorContext';

const editorContext = useEditorOptional();

// Only show controls when context is available (on /editor)
{isEditorPage && editorContext && (
  <button onClick={editorContext.handleDownloadPDF}>Download</button>
)}
```

## Persistence
- Resume data saved to `localStorage` as `resumeData`
- Selected template saved as `selectedTemplate`
- Dark mode preference saved as `darkMode`
