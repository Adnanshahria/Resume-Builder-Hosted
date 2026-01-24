# ResumeForm.tsx

## Summary

`ResumeForm.tsx` is the main form component for editing resume data. It provides an organized, collapsible interface for entering personal information, professional summary, and work experience. It integrates with the Gemini AI service for smart content generation.

## File Location

```
Resume-Builder-Test/components/ResumeForm.tsx
```

## Dependencies

```typescript
import React, { useState } from 'react';
import { ResumeData, ExperienceItem, EducationItem } from '../types';
import { Plus, Trash2, Wand2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/Button';
import { generateResumeSummary, enhanceExperienceDescription } from '../services/geminiService';
```

| Import | Source | Purpose |
|--------|--------|---------|
| `useState` | React | Component state management |
| Types | `../types` | Data interfaces |
| Icons | `lucide-react` | UI icons |
| `Button` | `./ui/Button` | Styled button component |
| AI functions | `../services/geminiService` | Content generation |

## Props Interface

```typescript
interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}
```

| Prop | Type | Description |
|------|------|-------------|
| `data` | `ResumeData` | Current resume data |
| `onChange` | Function | Callback to update resume data |

## Component State

```typescript
const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
const [generatingExpId, setGeneratingExpId] = useState<string | null>(null);
const [expandedSection, setExpandedSection] = useState<string | null>('personal');
```

| State | Type | Purpose |
|-------|------|---------|
| `isGeneratingSummary` | `boolean` | Summary generation loading state |
| `generatingExpId` | `string \| null` | ID of experience being enhanced |
| `expandedSection` | `string \| null` | Currently expanded form section |

## Key Functions

### 1. updatePersonalInfo

```typescript
const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
  onChange({
    ...data,
    personalInfo: { ...data.personalInfo, [field]: value }
  });
};
```

Updates a single personal info field while preserving other data.

---

### 2. handleGenerateSummary

```typescript
const handleGenerateSummary = async () => {
  setIsGeneratingSummary(true);
  try {
    const summary = await generateResumeSummary(data);
    onChange({ ...data, summary });
  } catch (e) {
    alert((e as Error).message);
  } finally {
    setIsGeneratingSummary(false);
  }
};
```

Calls Gemini AI to generate professional summary with loading state management.

---

### 3. Experience CRUD Operations

```typescript
// Add new experience
const addExperience = () => {
  const newExp: ExperienceItem = {
    id: crypto.randomUUID(),
    company: '', role: '', startDate: '', endDate: '', description: ''
  };
  onChange({ ...data, experience: [newExp, ...data.experience] });
  setExpandedSection(`exp-${newExp.id}`);
};

// Update experience field
const updateExperience = (id: string, field: keyof ExperienceItem, value: string) => {
  onChange({
    ...data,
    experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
  });
};

// Remove experience
const removeExperience = (id: string) => {
  onChange({
    ...data,
    experience: data.experience.filter(e => e.id !== id)
  });
};
```

---

### 4. handleEnhanceExperience

```typescript
const handleEnhanceExperience = async (id: string) => {
  const item = data.experience.find(e => e.id === id);
  if (!item) return;
  
  setGeneratingExpId(id);
  try {
    const enhanced = await enhanceExperienceDescription(item);
    updateExperience(id, 'description', enhanced);
  } catch (e) {
    alert((e as Error).message);
  } finally {
    setGeneratingExpId(null);
  }
};
```

Uses AI to enhance a specific experience description.

---

### 5. toggleSection

```typescript
const toggleSection = (section: string) => {
  setExpandedSection(expandedSection === section ? null : section);
};
```

Accordion-style section expansion/collapse.

## Form Structure

Each section has a left border divider for visual separation:

```tsx
className="space-y-4 border-l-2 border-slate-200 dark:border-slate-700 pl-4"
```

```
<div> (Card container)
├── Section 1: Personal Details (left border divider)
│   ├── Header (numbered badge + title + chevron)
│   └── Grid (6 input fields)
│       ├── Full Name
│       ├── Job Title
│       ├── Email
│       ├── Phone
│       ├── Location
│       └── LinkedIn
│
├── <hr> (Divider)
│
├── Section 2: Professional Summary (left border divider)
│   ├── Header (numbered badge + title + chevron)
│   ├── "Generate with Gemini" Button (AI integration)
│   └── Textarea
│
├── <hr> (Divider)
│
├── Section 3: Experience (left border divider)
│   ├── Header (numbered badge + title + Add Role button)
│   ├── Serial numbers for each entry (blue circle)
│   ├── Duration calculation (years/months)
│   └── Experience Cards (map)
│       ├── Card Header (role @ company + expand/delete)
│       └── Expanded Content (grid)
│           ├── Role Input
│           ├── Company Input
│           ├── Start Date Input (native date picker)
│           ├── End Date Input (native date picker)
│           ├── Description Header + "Enhance with AI" Button
│           └── Description Textarea
│
├── <hr> (Divider)
│
├── Section 4: Skills (left border divider)
│   ├── Header (numbered badge + title + chevron)
│   └── Skill tags with add/remove
│
├── <hr> (Divider)
│
├── Section 5: Education (left border divider)
│   ├── Header (numbered badge + title + Add button)
│   └── Education cards
│
├── <hr> (Divider)
│
└── Section 6: Projects (left border divider, tech/creative templates only)
    ├── Header (numbered badge + title + Add button)
    └── Project cards
```

## UI Features

### Collapsible Sections

- Click header to expand/collapse
- Only one section expanded at a time
- Chevron icon indicates state

### AI Integration Buttons

| Button | Location | Action |
|--------|----------|--------|
| "Generate with Gemini" | Summary section | Generates entire summary |
| "Enhance with AI" | Each experience | Improves description bullets |

### Loading States

- Buttons show spinner when processing
- Specific experience shows loading only for that item
- All buttons disabled during API calls

### Experience Cards

- Accordion pattern
- New experiences added at top
- Auto-expand when created
- Delete with confirmation needed? (No, direct delete)

## Input Styling

All inputs use consistent Tailwind classes:

```tsx
className="flex h-10 w-full rounded-md border border-input bg-background 
           px-3 py-2 text-sm ring-offset-background 
           placeholder:text-muted-foreground focus-visible:outline-none 
           focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

## Animation Classes

- `animate-in` - Entry animation
- `fade-in` - Opacity transition
- `slide-in-from-top-2` - Slide down effect
- `duration-200` - 200ms transition

## Lines of Code

- **Total Lines:** 325
- **File Size:** ~14.4 KB
