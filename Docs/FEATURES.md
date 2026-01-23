# Resume Builder - Feature Documentation

## Overview
AI Resume Forge is a modern resume builder with template-aware editing, AI enhancement, LaTeX export, and ATS-friendly options.

---

## Features Implemented

### 1. Template System
- **6 Templates**: Professional, Software Engineer, Developer, Technical, Medical, Creative
- **Template-aware editor**: Shows different fields based on selected template
- **Visual previews**: Layout-aware thumbnail previews in template selector

### 2. Photo System
- **Photo upload**: Drag-drop or click to upload profile picture
- **Auto-resize**: Images automatically optimized for storage
- **ATS Toggle**: "With Photo" / "ATS Friendly" button to hide photo for ATS compatibility

### 3. Skills/Specializations
- **Tag-based input**: Add skills with Enter or comma
- **Remove functionality**: Click × to remove individual skills
- **Template-aware labels**: Shows "Skills" or "Specializations" based on template

### 4. Medical Template Features
- **Dynamic licenses**: Add multiple medical licenses (BMDC, MCI, GMC, USMLE, etc.)
- **License types**: Dropdown with international license options
- **Custom license name**: When "Other" selected, input for custom license name
- **Primary license**: First license is required, additional are optional

### 5. Developer Template Features  
- **GitHub field**: Link to GitHub profile
- **Portfolio/Website**: Link to personal site
- **Projects section**: Name, description, tech stack, GitHub, live demo
- **Technical focus**: Skills displayed as tech stack

### 6. Education Section
- **Add/Remove**: Dynamic education entries
- **Fields**: Institution, Degree, Field of Study, Graduation Year
- **Template-aware**: "Medical Education" for doctor templates

### 7. LaTeX Export (NEW)
- **Download .tex files**: Click "LaTeX" button in navbar
- **ATS-friendly**: Standard LaTeX resume format
- **FontAwesome5 icons**: GitHub, LinkedIn, Email, Phone in LaTeX
- **Compile with**: pdflatex, xelatex, or Overleaf

### 8. Platform Icons (NEW)
- **Original SVG icons**: GitHub, LinkedIn, Email, Phone, Location
- **Competitive programming**: Codeforces, LeetCode
- **Design**: Dribbble, StackOverflow

---

## Resume Formats Folder

Located at: `apps/web/src/resume-formats/`

| File | Description |
|------|-------------|
| `doctors.ts` | Medical professional configuration (licenses, specializations) |
| `developers.ts` | Web developer configuration (platforms, skill categories) |
| `creative.ts` | Creative professional configuration (portfolio platforms) |
| `professional.ts` | Business/corporate configuration |
| `technical.ts` | Engineering/technical configuration |

---

## API Endpoints (Backend)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/resumes` | GET/POST | List/Create resumes |
| `/api/resumes/:id` | GET/PUT/DELETE | CRUD operations |
| `/api/ai/enhance` | POST | AI-enhance text |
| `/api/ai/summary` | POST | Generate summary |

---

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **AI**: Google Gemini API
- **Storage**: LocalStorage (client-side), Turso (cloud DB)
- **Export**: LaTeX (.tex) for ATS-friendly PDFs

---

## How to Use LaTeX Export

1. Fill in your resume details in the editor
2. Click the **LaTeX** button in the navbar
3. A `.tex` file will download
4. Compile with:
   - **pdflatex**: `pdflatex resume.tex`
   - **Overleaf**: Upload to [overleaf.com](https://overleaf.com)
5. Result: Professional, ATS-friendly PDF

**Requirements**: LaTeX installation with `fontawesome5` package for icons.
