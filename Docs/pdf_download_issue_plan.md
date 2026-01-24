# PDF Download Issue & Resolution Plan

## 1. Issue Description
Users are experiencing layout breakage when downloading the resume as a PDF. Specifically:
- **Contact Info Misalignment**: Icons (GitHub, LinkedIn, etc.) are floating above or misaligned with their text labels.
- **Spacing Issues**: The `gap` property and `flex` layout are not being rendered faithfully by the PDF generation engine.
- **Preview vs. Download Discrepancy**: The on-screen preview looks correct, but the generated PDF file is broken.

## 2. Technical Root Cause
The application uses **html2canvas** + **jspdf** to generate PDFs.
- **html2canvas Limitations**: This library essentially "screenshots" the DOM. It has known, well-documented struggles with modern CSS features, particularly consistently rendering:
    - `display: flex` / `inline-flex` combined with `gap`
    - Scaled SVGs within flex containers
    - complex CSS transforms or relative positioning during high-res capture (`scale: 2`)

## 3. Resolution Plan

### Strategy A: CSS Regression for Print (Recommended/Immediate)
Since `html2canvas` behaves better with older CSS models, we will create a specific "Print/Export" layout that avoids Flexbox for the problematic rows.

1. **Target specifically the PDF view**: We likely won't change the screen UI.
2. **Replace Flexbox with `inline-block`**:
    - Instead of `display: flex; gap: 4px`, use `display: inline-block; margin-right: 8px`.
    - Use `vertical-align: middle` to align icons and text.
3. **Table Fallback**: If `inline-block` fails, we will implement a hidden HTML `<table>` structure that only becomes visible during the export process. Tables are historically the most robust layout for PDF generation tools.

### Strategy B: Browser Native Print (Alternative)
If `html2canvas` proves too unstable:
- Use `window.print()` functionality with specific `@media print` CSS.
- This allows the user to "Save to PDF" using the browser's native engine (Chrome/Safari/Edge), which has 100% CSS parity.
- **Pros**: Perfect rendering.
- **Cons**: Less control over file name; user must manually select "Save as PDF" in the print dialog.

## 4. Implementation Steps (Strategy A)
1. **Remove `flex` & `gap` from print CSS**: Update `.rt-contact--tech` and `.rt-contact-link--tech` in `resume-templates.css` to use `inline-block` when in print media or specific export class.
2. **Hard-code spacing**: Replace `gap` property with explicit `margin` on chart elements.
3. **Verify SVG sizing**: Ensure SVGs have explicit `width` and `height` attributes (not just CSS styles).

## 5. Verification
- **Test**: Generate PDF download.
- **Success Criteria**:
    - Icons are vertically aligned with text.
    - No overlapping elements.
    - Consistent spacing between items.

---

## 6. Known Limitation: Clickable Links in PDF

### Issue
Links are clickable in the website preview but **NOT clickable** in the downloaded PDF.

### Root Cause
Browser print-to-PDF link preservation depends on:
1. **Browser Used**: Chrome/Edge preserve links, Firefox may not
2. **PDF Viewer**: Adobe Reader works best, browser built-in viewers may not support links

### Workarounds

**Option A: Use Chrome + Adobe Reader**
1. Print to PDF using Chrome
2. Open the PDF in Adobe Acrobat Reader (not browser)
3. Links should be clickable

**Option B: Manual Link Addition (Future Enhancement)**
Implement a dedicated PDF library like `@react-pdf/renderer` which generates true PDF documents with embedded hyperlinks. This would require significant refactoring.

### Recommendation
For now, users should:
- Use **Google Chrome** to print/save as PDF
- Open PDF in **Adobe Acrobat Reader**
- Links will appear blue and underlined for easy identification even if not clickable
