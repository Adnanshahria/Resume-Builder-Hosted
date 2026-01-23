import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    email: text('email').unique().notNull(),
    passwordHash: text('password_hash').notNull(),
    name: text('name'),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Sessions table (for Lucia auth)
export const sessions = sqliteTable('sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: integer('expires_at').notNull(),
});

// Resumes table
export const resumes = sqliteTable('resumes', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull().default('Untitled Resume'),
    template: text('template').default('professional'),
    data: text('data', { mode: 'json' }).notNull(),
    isPrimary: integer('is_primary', { mode: 'boolean' }).default(false),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').default('CURRENT_TIMESTAMP'),
});

// Resume shares table
export const resumeShares = sqliteTable('resume_shares', {
    id: text('id').primaryKey(),
    resumeId: text('resume_id').notNull().references(() => resumes.id, { onDelete: 'cascade' }),
    slug: text('slug').unique().notNull(),
    views: integer('views').default(0),
    expiresAt: text('expires_at'),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

// AI usage tracking
export const aiUsage = sqliteTable('ai_usage', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id),
    action: text('action').notNull(),
    tokensUsed: integer('tokens_used').default(0),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

// Type exports for Drizzle
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Resume = typeof resumes.$inferSelect;
export type NewResume = typeof resumes.$inferInsert;
export type Session = typeof sessions.$inferSelect;
