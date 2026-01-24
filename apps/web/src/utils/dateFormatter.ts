/**
 * Date formatting utilities for resume display
 */

/**
 * Formats a date string for display on resumes
 * @param dateString - Date in format "YYYY-MM-DD" or "YYYY-MM" or "YYYY"
 * @param style - 'short' for "Jan 2024" or 'long' for "January 2024"
 * @returns Formatted date string
 */
export function formatDate(dateString: string | undefined, style: 'short' | 'long' = 'short'): string {
    if (!dateString) return '';

    // Handle "Present" or "current" strings
    const lower = dateString.toLowerCase();
    if (lower === 'present' || lower === 'current' || lower === 'now') {
        return 'Present';
    }

    // Try to parse the date
    const parts = dateString.split('-');

    if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
        // Just year: "2024"
        return parts[0];
    }

    const year = parseInt(parts[0], 10);
    const month = parts.length > 1 ? parseInt(parts[1], 10) : null;

    if (isNaN(year)) return dateString;

    if (month && month >= 1 && month <= 12) {
        const monthNames = style === 'short'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return `${monthNames[month - 1]} ${year}`;
    }

    return String(year);
}

/**
 * Formats a date range for experience/education sections
 * @param startDate - Start date string
 * @param endDate - End date string (optional, defaults to "Present")
 * @returns Formatted range like "Jan 2022 - Mar 2024" or "Jan 2022 - Present"
 */
export function formatDateRange(startDate: string | undefined, endDate?: string): string {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';

    if (!start) return end;
    return `${start} - ${end}`;
}
