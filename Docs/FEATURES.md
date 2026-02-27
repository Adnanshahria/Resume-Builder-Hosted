# Resume Builder - Feature Documentation

## Overview
AI Resume Forge is a modern resume builder with template-aware editing, AI enhancement, LaTeX export, and ATS-friendly options.

---

## Features Implemented

### 1. Template System
- **4 Templates**: Professional, Tech (ATS-friendly), Medical, Creative
- **Template-aware editor**: Shows different fields based on selected template
- **Visual previews**: Layout-aware thumbnail previews in template selector
- **Unified Tech template**: Consolidated Developer, Software Engineer, and Technical into one ATS-optimized format
- **All templates ATS-friendly**: No photos for maximum ATS compatibility

### 2. ATS Compliance
- **No photos**: All templates are photo-free for ATS parsing
- **Clean text-based layout**: Machine-readable formatting
- **LaTeX export**: Generate ATS-optimized PDFs via LaTeX compilation

### 3. Skills/Specializations
- **Structured categories**: Coursework, Programming Languages, Web Technologies, Databases, Tools, Languages, Interests
- **Tag-based input**: Add skills with Enter or comma
- **Remove functionality**: Click × to remove individual skills
- **Template-aware labels**: Shows "Skills" or "Specializations" based on template
- **Fallback support**: Uses legacy `skills[]` array if `skillsData` not provided


### 4. Medical Template Features
- **Dynamic licenses**: Add multiple medical licenses (BMDC, MCI, GMC, USMLE, etc.)
- **License types**: Dropdown with international license options
- **Custom license name**: When "Other" selected, input for custom license name
- **Primary license**: First license is required, additional are optional

### 5. Tech Template Features (NEW)
- **ATS-Optimized**: Based on Jake Gutierrez's industry-standard format
- **GitHub field**: Link to GitHub profile
- **Projects section**: Name, description, tech stack, links
- **Education-first layout**: Optimized for students and tech roles
- **No photos**: Maximizes ATS compatibility

### 6. Education Section
- **Add/Remove**: Dynamic education entries
- **Fields**: Institution, Degree, Field of Study, Graduation Year
- **Template-aware**: "Medical Education" for doctor templates

### 8. LaTeX Export (ENHANCED)
- **Download .tex files**: Click "LaTeX" button in navbar
- **ATS-friendly**: Standard LaTeX resume format based on Jake Gutierrez template
- **FontAwesome5 icons**: GitHub, LinkedIn, Email, Phone in header
- **All sections included**: Summary, Education, Vocational Certifications, Skills (structured categories), Experience, Projects, Achievements, Extracurricular Activities, Declaration
- **Competitive programming profiles**: LeetCode, Codeforces, CodeChef with ratings
- **Structured skills**: Uses skillsData categories (Coursework, Programming Languages, Web Technologies, Databases, Tools, Languages, Interests)
- **Clickable project links**: GitHub and Live links for projects
- **Multi-page support**: Resumes automatically span multiple pages
- **Compile with**: pdflatex, xelatex, or Overleaf

### 8. Platform Icons (NEW)
- **Original SVG icons**: GitHub, LinkedIn, Email, Phone, Location
- **Competitive programming**: Codeforces, LeetCode
- **Design**: Dribbble, StackOverflow

### 9. PDF Export (NEW)
- **One-click download**: Green PDF button in navbar
- **Visual PDF**: Creates image-based PDF from preview
- **Print for ATS**: Blue Print button for ATS-friendly text-based PDF

### 10. Enhanced Date Formatting (NEW)
- **Readable dates**: "Jan 2024" instead of "2024-01-15"
- **Automatic formatting**: Applied to all experience/education dates
- **Supports multiple formats**: YYYY-MM-DD, YYYY-MM, or YYYY

### 11. Complete PWA Support (NEW)
- **Multiple icon sizes**: 192px, 384px, 512px
- **Apple Touch Icon**: 180px for iOS devices
- **Installable**: Works as standalone app on mobile/desktop

### 12. Logging System (NEW)
- **Centralized logger**: `utils/logger.ts` for consistent logging
- **Dev/Prod modes**: Debug/info shown in dev only, errors always shown
- **Context-aware**: Logs include timestamps and component names
- **Optional persistence**: Can store logs in localStorage

### 13. ATS-Friendly LaTeX Template (NEW)
- **Jake Gutierrez template**: Industry-standard ATS-parsable format
- **Unicode support**: `\pdfgentounicode=1` ensures machine readability
- **Skill categorization**: Auto-groups into Languages/Tools/Frameworks
- **Education-first**: Layout optimized for technical roles
- **Date formatting**: "Sep. 2017 -- May 2021" format

### 14. Resume Section Ordering (NEW)
The resume sections are displayed in the following order:
1. **Header**: Name, contact info, GitHub, LinkedIn, etc.
2. **Summary**: Professional summary/bio
3. **Education**: Academic qualifications with CGPA
4. **Vocational Certifications**: Courses, bootcamps, online certifications
5. **Skills**: Technical skills and coursework
6. **Experience**: Work experience with duration calculation
7. **Projects**: Personal/professional projects with GitHub links
8. **Achievements**: Hackathon results, awards, competitions
9. **Extracurricular**: Clubs, research, leadership roles
10. **Declaration**: Optional formal declaration

### 15. Achievements Section (NEW)
- **Title**: Achievement name (e.g., "Hackathon Winner")
- **Organization**: Organizer name
- **Date**: When achieved
- **Description**: Details with AI enhancement

### 16. Extracurricular Activities Section (NEW)
- **Role**: Position held (e.g., "Vice-President")
- **Organization**: Club/committee name (displayed in italics)
- **Date Range**: Start date to end date with "Present" option
- **Duration**: Auto-calculated (e.g., "1 yr 5 mos")
- **Description**: Bullet-point formatted achievements
- **Month picker inputs**: Native month/year selectors

### 17. Declaration Section (NEW)
- **Toggle**: Enable/disable in editor
- **Standard text**: "I hereby declare that all the details furnished above are true to the best of my knowledge and belief."

### 18. Project Links Enhancement (NEW)
- **GitHub | Visit**: Blue clickable link for project repositories
- **Formatted display**: Project name with tech stack on same line

### 19. AI Enhancement System
- **Google Gemini**: Powered by Gemini 2.5 Flash Lite
- **Processing Popup**: Shows status while AI is working
- **Provider Display**: Shows which AI provider is being used

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
