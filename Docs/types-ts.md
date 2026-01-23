# types.ts

## Summary

`types.ts` contains all TypeScript type definitions and interfaces used throughout the AI Resume Forge application. It defines the data structure for resume information, experience items, education items, and an enum for AI generation types.

## File Location

```
Resume-Builder-Test/types.ts
```

## Type Definitions

### 1. ResumeData Interface

```typescript
export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    title: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}
```

**Main resume data structure containing:**

| Property | Type | Description |
|----------|------|-------------|
| `personalInfo` | Object | User's contact and professional info |
| `summary` | `string` | Professional summary/bio |
| `experience` | `ExperienceItem[]` | Work history array |
| `education` | `EducationItem[]` | Educational background |
| `skills` | `string[]` | List of skills |

**Personal Info Fields:**

| Field | Type | Example |
|-------|------|---------|
| `fullName` | `string` | "John Doe" |
| `email` | `string` | "john@example.com" |
| `phone` | `string` | "+1 (555) 000-0000" |
| `linkedin` | `string` | "linkedin.com/in/johndoe" |
| `location` | `string` | "New York, NY" |
| `title` | `string` | "Senior Software Engineer" |

---

### 2. ExperienceItem Interface

```typescript
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}
```

**Work experience entry:**

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier (UUID) |
| `company` | `string` | Company name |
| `role` | `string` | Job title/position |
| `startDate` | `string` | Start date (e.g., "Jan 2022") |
| `endDate` | `string` | End date (e.g., "Present") |
| `description` | `string` | Role description (bullet points) |

---

### 3. EducationItem Interface

```typescript
export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}
```

**Education entry:**

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `school` | `string` | Institution name |
| `degree` | `string` | Degree/certification |
| `startDate` | `string` | Start year |
| `endDate` | `string` | Graduation year |

---

### 4. GeneratorType Enum

```typescript
export enum GeneratorType {
  SUMMARY = 'SUMMARY',
  EXPERIENCE = 'EXPERIENCE',
}
```

**AI generation operation types:**

| Value | Purpose |
|-------|---------|
| `SUMMARY` | Generate professional summary |
| `EXPERIENCE` | Enhance experience descriptions |

## Usage Examples

### Creating Resume Data

```typescript
const resume: ResumeData = {
  personalInfo: {
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555-0123",
    linkedin: "linkedin.com/in/janesmith",
    location: "San Francisco, CA",
    title: "Product Manager"
  },
  summary: "Experienced product manager...",
  experience: [],
  education: [],
  skills: ["Product Strategy", "Agile", "Data Analysis"]
};
```

### Adding Experience

```typescript
const newExp: ExperienceItem = {
  id: crypto.randomUUID(),
  company: "Tech Corp",
  role: "Senior PM",
  startDate: "Jan 2020",
  endDate: "Present",
  description: "• Led product initiatives..."
};
```

## Imports in Other Files

```typescript
// In App.tsx
import { ResumeData } from './types';

// In ResumeForm.tsx
import { ResumeData, ExperienceItem, EducationItem } from '../types';

// In geminiService.ts
import { ResumeData, ExperienceItem } from "../types";
```

## Lines of Code

- **Total Lines:** 36
- **File Size:** ~671 bytes
