/**
 * PDF Export utility using html2canvas + jspdf
 */

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { logger } from './logger';

/**
 * Exports a DOM element to PDF
 * @param element - The HTML element to export (resume preview container)
 * @param filename - Output filename (default: 'resume.pdf')
 */
export async function exportToPDF(
    element: HTMLElement,
    filename: string = 'resume.pdf'
): Promise<void> {
    // Show loading state
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    logger.info('PDFExport', 'Starting PDF export', { filename });

    try {
        // Capture the element as canvas
        const canvas = await html2canvas(element, {
            scale: 2, // Higher resolution
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
        });

        // Calculate PDF dimensions (A4 size)
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Download the PDF
        pdf.save(filename);
        logger.info('PDFExport', 'PDF exported successfully', { filename, pages: Math.ceil(imgHeight / pageHeight) });
    } catch (error) {
        logger.error('PDFExport', 'Failed to export PDF', error);
        throw new Error('Failed to export PDF. Please try again.');
    } finally {
        // Restore overflow
        document.body.style.overflow = originalOverflow;
    }
}
