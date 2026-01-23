# ResumePreview.tsx

## Summary

`ResumePreview.tsx` renders a real-time, print-ready preview of the resume in a clean, professional layout. It displays personal information, professional summary, work experience, and skills in an A4-sized format with responsive scaling.

## File Location

```
Resume-Builder-Test/components/ResumePreview.tsx
```

## Dependencies

```typescript
import React from 'react';
import { ResumeData } from '../types';
import { MapPin, Mail, Phone, Linkedin, ExternalLink } from 'lucide-react';
```

| Import | Source | Purpose |
|--------|--------|---------|
| `React` | react | Component definition |
| `ResumeData` | `../types` | Resume data interface |
| Icons | `lucide-react` | Contact info icons |

## Props Interface

```typescript
interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ResumeData` | Required | Resume content to display |
| `scale` | `number` | `1` | Scale factor for responsive sizing |

## Scaling Implementation

```typescript
<div 
  style={{ 
    width: '210mm', 
    minHeight: '297mm',
    transform: `scale(${scale})`,
    marginBottom: `-${(1 - scale) * 297}mm` 
  }}
>
```

- **Width:** 210mm (A4 paper width)
- **Min Height:** 297mm (A4 paper height)
- **Transform:** CSS scale based on prop
- **Margin Adjustment:** Compensates for scaled element to prevent layout shift

## Component Structure

```
<div> (A4 Container - white background, shadow)
└── <div> (Content padding)
    │
    ├── <header> (Personal Info)
    │   ├── <h1> Full Name (4xl, uppercase)
    │   ├── <p> Job Title (xl, gray)
    │   └── <div> Contact Row (flex wrap)
    │       ├── Email (with icon)
    │       ├── Phone (with icon)
    │       ├── Location (with icon)
    │       └── LinkedIn (with icon)
    │
    ├── <section> Summary (conditional)
    │   ├── <h2> Section heading
    │   └── <p> Summary text
    │
    ├── <section> Experience (conditional)
    │   ├── <h2> Section heading
    │   └── <div> Experience list (flex column)
    │       └── Experience Item (map)
    │           ├── Role + Date range
    │           ├── Company name
    │           └── Description (pre-line)
    │
    └── <section> Skills
        ├── <h2> Section heading
        └── <div> Skills (bullet-separated)
```

## Conditional Rendering

### Summary Section

```typescript
{data.summary && (
  <section>
    <h2>Professional Summary</h2>
    <p>{data.summary}</p>
  </section>
)}
```

Only renders if summary exists.

### Experience Section

```typescript
{data.experience.length > 0 && (
  <section className="flex-1">
    {/* ... */}
  </section>
)}
```

Only renders if at least one experience entry exists.

### Contact Info Fields

```typescript
{data.personalInfo.email && (
  <div className="flex items-center gap-1">
    <Mail className="w-3 h-3" />
    <span>{data.personalInfo.email}</span>
  </div>
)}
```

Each contact field only shows if it has a value.

## Typography Styles

| Element | Classes | Result |
|---------|---------|--------|
| Full Name | `text-4xl font-bold uppercase tracking-wide text-gray-900` | Large, bold header |
| Job Title | `text-xl text-gray-600 font-medium` | Subtitle styling |
| Section Headers | `text-sm font-bold uppercase tracking-wider text-gray-800` | Small caps |
| Body Text | `text-sm text-gray-700 leading-relaxed` | Readable body |

## Section Header Pattern

```typescript
<h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 
               border-b border-gray-300 mb-3 pb-1">
  Section Title
</h2>
```

Consistent styling across all sections with:
- Small caps, bold text
- Bottom border separator
- Padding and margin for spacing

## Experience Entry Layout

```typescript
<div key={exp.id}>
  <div className="flex justify-between items-baseline mb-1">
    <h3 className="font-bold text-gray-900">{exp.role}</h3>
    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
      {exp.startDate} – {exp.endDate}
    </span>
  </div>
  <div className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</div>
  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line pl-1">
    {exp.description}
  </div>
</div>
```

- Role and dates aligned on same line (space-between)
- Company on separate line
- Description uses `whitespace-pre-line` for bullet formatting

## Skills Display

```typescript
<div className="text-sm text-gray-700 leading-relaxed">
  {data.skills.length > 0 ? data.skills.join(" • ") : "Add skills to see them here..."}
</div>
```

- Skills separated by bullet character (•)
- Fallback message if no skills added

## Print Considerations

- White background (`bg-white`)
- Black text (`text-black`)
- Shadow for screen differentiation (`shadow-2xl`)
- Used in App.tsx for print-only view with `scale={1}`

## Container Styling

```typescript
className="bg-white text-black shadow-2xl mx-auto origin-top 
           transition-transform duration-200"
```

- Centered horizontally
- Transform origin at top
- Smooth scale transitions

## Lines of Code

- **Total Lines:** 109
- **File Size:** ~4.2 KB
