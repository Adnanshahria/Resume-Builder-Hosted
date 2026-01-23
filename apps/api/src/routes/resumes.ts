import { Hono } from 'hono';
import { z } from 'zod';
import { generateId } from 'lucia';
import { createDb } from '../db';
import { resumes, sessions } from '../db/schema';
import { eq, and } from 'drizzle-orm';

type Bindings = {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
};

export const resumeRoutes = new Hono<{ Bindings: Bindings }>();

// Middleware to get user from token
async function getUserId(c: any): Promise<string | null> {
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return null;

    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
    const session = await db.select().from(sessions).where(eq(sessions.id, token)).get();

    if (!session || session.expiresAt < Math.floor(Date.now() / 1000)) {
        return null;
    }
    return session.userId;
}

const resumeSchema = z.object({
    title: z.string().min(1).max(100),
    template: z.enum(['professional', 'modern', 'minimal', 'creative', 'executive']).optional(),
    data: z.any(),
    isPrimary: z.boolean().optional(),
});

// List all resumes for user
resumeRoutes.get('/', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
    const userResumes = await db.select().from(resumes).where(eq(resumes.userId, userId));

    return c.json({ success: true, data: userResumes });
});

// Get single resume
resumeRoutes.get('/:id', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

    const resume = await db.select().from(resumes)
        .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
        .get();

    if (!resume) return c.json({ error: 'Resume not found' }, 404);

    return c.json({ success: true, data: resume });
});

// Create resume
resumeRoutes.post('/', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    try {
        const body = await c.req.json();
        const { title, template, data, isPrimary } = resumeSchema.parse(body);

        const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
        const id = generateId(15);

        await db.insert(resumes).values({
            id,
            userId,
            title,
            template: template || 'professional',
            data: JSON.stringify(data),
            isPrimary: isPrimary || false,
        });

        return c.json({ success: true, data: { id } }, 201);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ error: error.errors }, 400);
        }
        return c.json({ error: 'Failed to create resume' }, 500);
    }
});

// Update resume
resumeRoutes.put('/:id', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');

    try {
        const body = await c.req.json();
        const updates = resumeSchema.partial().parse(body);

        const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

        await db.update(resumes)
            .set({
                ...updates,
                data: updates.data ? JSON.stringify(updates.data) : undefined,
                updatedAt: new Date().toISOString(),
            })
            .where(and(eq(resumes.id, id), eq(resumes.userId, userId)));

        return c.json({ success: true });
    } catch (error) {
        return c.json({ error: 'Failed to update resume' }, 500);
    }
});

// Delete resume
resumeRoutes.delete('/:id', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

    await db.delete(resumes).where(and(eq(resumes.id, id), eq(resumes.userId, userId)));

    return c.json({ success: true });
});
