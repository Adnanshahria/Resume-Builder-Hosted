/**
 * PDF Export utility
 * 
 * Provides two methods:
 * 1. LaTeX-based PDF (high quality, clickable links) - uses external API
 * 2. Browser native print (fallback) - works offline
 */

import { ResumeData } from '../types';
import { downloadLatexPDF } from '../services/latexService';
import { logger } from './logger';

/**
 * Export resume to PDF using LaTeX compilation (recommended)
 * Uses free API: latex.ytotech.com
 */
export async function exportToLatexPDF(
    data: ResumeData,
    filename: string = 'resume'
): Promise<void> {
    logger.info('PDFExport', 'Starting LaTeX PDF export', { filename });
    await downloadLatexPDF(data, filename);
}

/**
 * Fallback: Export using browser's native print dialog
 * Use this if LaTeX API fails or user is offline
 */
export async function exportToBrowserPrint(
    _element: HTMLElement
): Promise<void> {
    logger.info('PDFExport', 'Starting browser print export');

    const printStyle = document.createElement('style');
    printStyle.id = 'print-pdf-styles';
    printStyle.textContent = `
        @media print {
            body * { visibility: hidden !important; }
            .resume-template-wrapper, .resume-template-wrapper * { visibility: visible !important; }
            .resume-template-wrapper {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                max-width: 816px !important;
                margin: 0 auto !important;
                box-shadow: none !important;
            }
            @page { size: A4; margin: 0; }
        }
    `;
    document.head.appendChild(printStyle);

    await new Promise(resolve => setTimeout(resolve, 100));
    window.print();

    setTimeout(() => {
        const styleEl = document.getElementById('print-pdf-styles');
        if (styleEl) styleEl.remove();
    }, 1000);
}

/**
 * Main export function - tries LaTeX first, falls back to browser print
 */
export async function exportToPDF(
    data: ResumeData,
    element: HTMLElement,
    filename: string = 'resume'
): Promise<{ success: boolean; method: 'latex' | 'browser' }> {
    try {
        await exportToLatexPDF(data, filename);
        return { success: true, method: 'latex' };
    } catch (error) {
        logger.warn('PDFExport', 'LaTeX export failed, falling back to browser print', error);
        await exportToBrowserPrint(element);
        return { success: true, method: 'browser' };
    }
}
