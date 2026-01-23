import { Hono } from 'hono';
import { generateId } from 'lucia';
import { createDb } from '../db';
import { resumeShares, resumes, sessions } from '../db/schema';
import { eq, and } from 'drizzle-orm';

type Bindings = {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
};

export const shareRoutes = new Hono<{ Bindings: Bindings }>();

async function getUserId(c: any): Promise<string | null> {
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return null;

    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
    const session = await db.select().from(sessions).where(eq(sessions.id, token)).get();

    if (!session || session.expiresAt < Math.floor(Date.now() / 1000)) return null;
    return session.userId;
}

function generateSlug(): string {
    return generateId(8).toLowerCase();
}

// Create share link
shareRoutes.post('/:resumeId', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    const resumeId = c.req.param('resumeId');
    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

    // Verify resume belongs to user
    const resume = await db.select().from(resumes)
        .where(and(eq(resumes.id, resumeId), eq(resumes.userId, userId)))
        .get();

    if (!resume) return c.json({ error: 'Resume not found' }, 404);

    // Check existing share
    const existing = await db.select().from(resumeShares)
        .where(eq(resumeShares.resumeId, resumeId))
        .get();

    if (existing) {
        return c.json({ success: true, data: { slug: existing.slug, id: existing.id } });
    }

    // Create new share
    const id = generateId(15);
    const slug = generateSlug();

    await db.insert(resumeShares).values({ id, resumeId, slug });

    return c.json({ success: true, data: { slug, id } }, 201);
});

// Get shared resume (public)
shareRoutes.get('/:slug', async (c) => {
    const slug = c.req.param('slug');
    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

    const share = await db.select().from(resumeShares)
        .where(eq(resumeShares.slug, slug))
        .get();

    if (!share) return c.json({ error: 'Resume not found' }, 404);

    // Increment views
    await db.update(resumeShares)
        .set({ views: (share.views || 0) + 1 })
        .where(eq(resumeShares.id, share.id));

    const resume = await db.select().from(resumes)
        .where(eq(resumes.id, share.resumeId))
        .get();

    if (!resume) return c.json({ error: 'Resume not found' }, 404);

    return c.json({
        success: true,
        data: {
            title: resume.title,
            template: resume.template,
            data: resume.data,
            views: (share.views || 0) + 1,
        }
    });
});

// Delete share link
shareRoutes.delete('/:id', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    const id = c.req.param('id');
    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

    // Get share and verify ownership
    const share = await db.select().from(resumeShares)
        .where(eq(resumeShares.id, id))
        .get();

    if (!share) return c.json({ error: 'Share not found' }, 404);

    const resume = await db.select().from(resumes)
        .where(and(eq(resumes.id, share.resumeId), eq(resumes.userId, userId)))
        .get();

    if (!resume) return c.json({ error: 'Unauthorized' }, 401);

    await db.delete(resumeShares).where(eq(resumeShares.id, id));

    return c.json({ success: true });
});
