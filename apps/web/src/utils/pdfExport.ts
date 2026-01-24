/**
 * PDF Export utility using browser's native print functionality
 * 
 * This approach creates real PDFs with:
 * - Clickable hyperlinks (preserved by browser)
 * - Perfect CSS rendering
 * - High resolution (vector graphics)
 * - Selectable text
 */

import { logger } from './logger';

/**
 * Exports a DOM element to PDF using browser's print dialog
 * User selects "Save as PDF" in the print dialog
 */
export async function exportToPDF(
    element: HTMLElement,
    _filename: string = 'resume.pdf'
): Promise<void> {
    logger.info('PDFExport', 'Starting PDF export via browser print');

    // Store original styles
    const originalTransform = element.style.transform;

    try {
        // Create print-specific stylesheet
        const printStyle = document.createElement('style');
        printStyle.id = 'print-pdf-styles';
        printStyle.textContent = `
            @media print {
                /* Hide everything except the resume */
                body * {
                    visibility: hidden !important;
                }
                
                /* Show only the resume wrapper and its contents */
                .resume-template-wrapper,
                .resume-template-wrapper * {
                    visibility: visible !important;
                }
                
                /* Position the resume at the top */
                .resume-template-wrapper {
                    position: absolute !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100% !important;
                    max-width: 816px !important;
                    margin: 0 auto !important;
                    transform: none !important;
                    box-shadow: none !important;
                }
                
                /* Reset transforms */
                .resume-template {
                    transform: none !important;
                }
                
                /* Ensure links are styled and visible */
                a {
                    color: #0066cc !important;
                    text-decoration: underline !important;
                }
                
                /* Page settings */
                @page {
                    size: A4;
                    margin: 0;
                }
                
                html, body {
                    width: 210mm;
                    height: 297mm;
                    margin: 0 !important;
                    padding: 0 !important;
                }
            }
        `;
        document.head.appendChild(printStyle);

        // Reset transforms for accurate printing
        element.style.transform = 'none';

        // Allow styles to apply
        await new Promise(resolve => setTimeout(resolve, 100));

        // Trigger print dialog
        window.print();

        logger.info('PDFExport', 'Print dialog opened');

        // Cleanup after delay
        setTimeout(() => {
            const styleEl = document.getElementById('print-pdf-styles');
            if (styleEl) styleEl.remove();
            element.style.transform = originalTransform;
        }, 1000);

    } catch (error) {
        logger.error('PDFExport', 'Failed to export PDF', error);
        throw new Error('Failed to open print dialog. Please try again.');
    }
}
