/**
 * Centralized Logging System for Resume Builder
 * Features:
 * - Development mode: Full console output
 * - Production mode: Errors only
 * - Timestamps and context
 * - Optional localStorage persistence
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    context: string;
    message: string;
    data?: unknown;
}

class Logger {
    private isDev: boolean;
    private persistLogs: boolean;
    private maxStoredLogs: number;
    private storageKey: string;

    constructor() {
        this.isDev = import.meta.env.DEV;
        this.persistLogs = false; // Enable to store logs in localStorage
        this.maxStoredLogs = 100;
        this.storageKey = 'resume_builder_logs';
    }

    private formatTimestamp(): string {
        return new Date().toISOString();
    }

    private getStoredLogs(): LogEntry[] {
        if (!this.persistLogs) return [];
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    private storeLogs(logs: LogEntry[]): void {
        if (!this.persistLogs) return;
        try {
            const trimmed = logs.slice(-this.maxStoredLogs);
            localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
        } catch {
            // Storage full or unavailable
        }
    }

    private log(level: LogLevel, context: string, message: string, data?: unknown): void {
        const entry: LogEntry = {
            timestamp: this.formatTimestamp(),
            level,
            context,
            message,
            data,
        };

        // Console output
        const prefix = `[${entry.timestamp}] [${level.toUpperCase()}] [${context}]`;

        if (level === 'error') {
            console.error(prefix, message, data ?? '');
        } else if (level === 'warn') {
            console.warn(prefix, message, data ?? '');
        } else if (this.isDev) {
            // Only show debug/info in development
            if (level === 'debug') {
                console.debug(prefix, message, data ?? '');
            } else {
                console.info(prefix, message, data ?? '');
            }
        }

        // Persist if enabled
        if (this.persistLogs) {
            const logs = this.getStoredLogs();
            logs.push(entry);
            this.storeLogs(logs);
        }
    }

    /**
     * Debug level - only shown in development
     */
    debug(context: string, message: string, data?: unknown): void {
        this.log('debug', context, message, data);
    }

    /**
     * Info level - general information, dev only
     */
    info(context: string, message: string, data?: unknown): void {
        this.log('info', context, message, data);
    }

    /**
     * Warning level - shown in both dev and prod
     */
    warn(context: string, message: string, data?: unknown): void {
        this.log('warn', context, message, data);
    }

    /**
     * Error level - always shown
     */
    error(context: string, message: string, data?: unknown): void {
        this.log('error', context, message, data);
    }

    /**
     * Enable/disable log persistence to localStorage
     */
    enablePersistence(enable: boolean): void {
        this.persistLogs = enable;
        if (!enable) {
            localStorage.removeItem(this.storageKey);
        }
    }

    /**
     * Get all stored logs
     */
    getLogs(): LogEntry[] {
        return this.getStoredLogs();
    }

    /**
     * Clear stored logs
     */
    clearLogs(): void {
        localStorage.removeItem(this.storageKey);
    }
}

// Export singleton instance
export const logger = new Logger();

// Export types for external use
export type { LogEntry, LogLevel };
