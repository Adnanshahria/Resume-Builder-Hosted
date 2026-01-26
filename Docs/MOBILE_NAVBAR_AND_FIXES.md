# Mobile Navbar & Section Toggles Refinement

## Changes Overview

### 1. Mobile Navbar Redesign
- Integrated a **Segment Control** style toggle for "Editor" and "Preview" views on mobile, modeled after the system theme toggle.
- Added visible "PDF" text next to the download icon for better accessibility.
- Moved these controls from a floating bar into the main `Navbar` component for a cleaner layout.

### 2. Section Visibility & Toggle Fixes
- **Functional Toggles**: Fixed the "Select Sections for Your CV" UI so it correctly updates visibility. Previously, template defaults were overriding user selections.
- **Preview Sync**: Updated all resume templates (`Professional`, `Tech`, `Medical`, `Creative`) to respect the `enabledSections` state. Disabled sections are now correctly hidden in the real-time preview.
- **Accordion Fix**: Fixed a bug where adding a new item (e.g., a new job or education entry) would collapse the entire section. Now, the new item is expanded, and the section remains visible.

### 3. Code Cleanup
- Removed redundant mobile control logic from `EditorPage.tsx`.
- Resolved several lint warnings related to unused imports and variables.

## Technical Details
- Modified `apps/web/src/components/Navbar.tsx`
- Modified `apps/web/src/components/ResumeForm.tsx`
- Modified `apps/web/src/components/ResumeTemplate.tsx`
- Modified `apps/web/src/pages/EditorPage.tsx`
