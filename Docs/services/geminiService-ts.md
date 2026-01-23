# geminiService.ts

## Summary

`geminiService.ts` is the AI service layer that integrates with Google's Gemini AI API. It provides functions to generate professional resume summaries and enhance work experience descriptions using the Gemini 2.5 Flash model.

## File Location

```
Resume-Builder-Test/services/geminiService.ts
```

## Dependencies

```typescript
import { GoogleGenAI } from "@google/genai";
import { ResumeData, ExperienceItem } from "../types";
```

| Import | Source | Purpose |
|--------|--------|---------|
| `GoogleGenAI` | `@google/genai` | Gemini AI SDK client |
| `ResumeData` | `../types` | Resume data interface |
| `ExperienceItem` | `../types` | Experience item interface |

## Configuration

```typescript
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = "gemini-2.5-flash";
```

- Uses API key from environment variable `process.env.API_KEY`
- Targets Gemini 2.5 Flash model for fast responses

## Exported Functions

### 1. generateResumeSummary

```typescript
export const generateResumeSummary = async (data: ResumeData): Promise<string>
```

**Purpose:** Generates a professional executive summary based on the user's resume data.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `data` | `ResumeData` | Complete resume data object |

**Returns:** `Promise<string>` - Generated summary text

**Validation:**
```typescript
if (!data.personalInfo.title && data.experience.length === 0) {
  throw new Error("Please add a Job Title or Experience first.");
}
```

**Prompt Template:**
```
You are an expert resume writer. Write a professional, punchy, and modern 
executive summary (max 3-4 sentences) for a resume based on the following details.

Job Title: {title}
Skills: {skills}
Experience Count: {count} roles

Key Experience:
- {role} at {company}
...

Do not use first person pronouns heavily. Focus on achievements and professional value.
```

**API Configuration:**
```typescript
const response = await ai.models.generateContent({
  model: MODEL_NAME,
  contents: prompt,
  config: {
    thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for speed
  }
});
```

---

### 2. enhanceExperienceDescription

```typescript
export const enhanceExperienceDescription = async (item: ExperienceItem): Promise<string>
```

**Purpose:** Enhances a job description by converting basic text into professional, results-oriented bullet points.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `item` | `ExperienceItem` | Single experience entry |

**Returns:** `Promise<string>` - Enhanced description with bullet points

**Validation:**
```typescript
if (!item.role || !item.company) {
  throw new Error("Please fill in Role and Company fields first.");
}
```

**Prompt Template:**
```
You are an expert resume writer. Enhance the following job description for a 
{role} at {company}. Convert it into 3-5 punchy, results-oriented bullet points 
using action verbs.

Current Description (might be empty or basic):
"{description}"

Return ONLY the bullet points, starting each with a bullet character (•). 
Do not add introductory text.
```

## Error Handling

Both functions implement try-catch blocks:

```typescript
try {
  const response = await ai.models.generateContent({...});
  return response.text || "";
} catch (error) {
  console.error("Gemini API Error:", error);
  throw new Error("Failed to generate summary. Please check your API key or try again.");
}
```

**Error Scenarios:**
- Invalid/missing API key
- Network failures
- API rate limits
- Model availability issues

## API Configuration Details

| Setting | Value | Purpose |
|---------|-------|---------|
| `model` | `gemini-2.5-flash` | Fast, capable model |
| `thinkingBudget` | `0` | Disables "thinking" for faster responses |

## Usage Examples

### Generating Summary

```typescript
import { generateResumeSummary } from './services/geminiService';

const handleGenerate = async () => {
  try {
    const summary = await generateResumeSummary(resumeData);
    setData({ ...data, summary });
  } catch (error) {
    alert(error.message);
  }
};
```

### Enhancing Experience

```typescript
import { enhanceExperienceDescription } from './services/geminiService';

const handleEnhance = async (expItem: ExperienceItem) => {
  try {
    const enhanced = await enhanceExperienceDescription(expItem);
    updateExperience(expItem.id, 'description', enhanced);
  } catch (error) {
    alert(error.message);
  }
};
```

## Environment Setup

Requires `GEMINI_API_KEY` in `.env.local`:

```env
GEMINI_API_KEY=your_api_key_here
```

Mapped in `vite.config.ts`:
```typescript
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

## Lines of Code

- **Total Lines:** 70
- **File Size:** ~2.5 KB
