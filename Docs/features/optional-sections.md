# Optional Sections & Template Preview Enhancement

## Overview
This document describes the implementation of optional resume sections with toggle checkboxes, placeholder preview data, and the redesigned template selector with CV preview thumbnails.

## Features Implemented

### 1. Section Visibility System
- **SectionVisibility Interface**: Controls which sections appear in the resume
- **DEFAULT_ENABLED_SECTIONS**: Configures default enabled/disabled sections
- **toggleSection()**: Context function to toggle individual sections

### 2. Placeholder Preview
- Shows sample resume data until user edits any field
- `hasUserEdited` flag tracks if user has started editing
- `getPreviewData()` returns placeholder or real data based on edit state

### 3. SectionToggle Component
Location: `src/components/SectionToggle.tsx`

A grid of toggle buttons for enabling/disabling resume sections. Features:
- Color-coded enabled/disabled states
- Template-aware section display
- Persisted in localStorage

### 4. PDF Export Warning
When downloading PDF with empty sections:
- Modal displays list of empty sections
- Options: "Go Back & Edit" or "Download Anyway"
- Helps users avoid incomplete resumes

### 5. Template Selector Redesign
Location: `src/components/TemplateSelector.tsx`

New design shows actual CV preview thumbnails:
- Renders mini ResumeTemplate at 0.22 scale
- Uses PLACEHOLDER_DATA for consistent preview
- Hover effects and selection indicators
- Template name and description below preview

## Usage

### Toggle Sections
```tsx
const { enabledSections, toggleSection } = useEditor();
toggleSection('projects'); // Toggle projects section
```

### Check Edit State
```tsx
const { hasUserEdited, markAsEdited, getPreviewData } = useEditor();
const previewData = getPreviewData(); // Returns placeholder or real data
```

## Related Files
- `src/types/index.ts` - SectionVisibility interface
- `src/contexts/EditorContext.tsx` - State management
- `src/components/SectionToggle.tsx` - Toggle UI
- `src/pages/EditorPage.tsx` - PDF warning modal
- `src/components/TemplateSelector.tsx` - Template preview cards
