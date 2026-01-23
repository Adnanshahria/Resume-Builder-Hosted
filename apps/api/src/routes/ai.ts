import { Hono } from 'hono';
import { z } from 'zod';
import { generateId } from 'lucia';
import { createDb } from '../db';
import { aiUsage, sessions } from '../db/schema';
import { eq, and, gte } from 'drizzle-orm';

type Bindings = {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
    GEMINI_API_KEY: string;
};

export const aiRoutes = new Hono<{ Bindings: Bindings }>();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const DAILY_LIMIT = 50; // AI requests per day per user

async function getUserId(c: any): Promise<string | null> {
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return null;

    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
    const session = await db.select().from(sessions).where(eq(sessions.id, token)).get();

    if (!session || session.expiresAt < Math.floor(Date.now() / 1000)) return null;
    return session.userId;
}

async function checkRateLimit(c: any, userId: string): Promise<boolean> {
    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
    const today = new Date().toISOString().split('T')[0];

    const usage = await db.select().from(aiUsage)
        .where(and(eq(aiUsage.userId, userId), gte(aiUsage.createdAt, today)));

    return usage.length < DAILY_LIMIT;
}

async function logUsage(c: any, userId: string, action: string) {
    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
    await db.insert(aiUsage).values({
        id: generateId(15),
        userId,
        action,
        tokensUsed: 0,
    });
}

async function callGemini(apiKey: string, prompt: string): Promise<string> {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    });

    if (!response.ok) {
        throw new Error('Gemini API request failed');
    }

    const data = await response.json() as any;
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// Generate summary
aiRoutes.post('/summary', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    if (!(await checkRateLimit(c, userId))) {
        return c.json({ error: 'Daily AI limit reached' }, 429);
    }

    try {
        const { title, skills, experience } = await c.req.json();

        const prompt = `You are an expert resume writer. Write a professional, punchy, and modern executive summary (max 3-4 sentences) for a resume.

Job Title: ${title || 'Professional'}
Skills: ${skills?.join(', ') || 'Not specified'}
Experience: ${experience?.map((e: any) => `${e.role} at ${e.company}`).join(', ') || 'Not specified'}

Write in third person. Focus on achievements and professional value. Do not use generic phrases.`;

        const summary = await callGemini(c.env.GEMINI_API_KEY, prompt);
        await logUsage(c, userId, 'summary');

        return c.json({ success: true, data: { summary } });
    } catch (error) {
        return c.json({ error: 'Failed to generate summary' }, 500);
    }
});

// Enhance experience
aiRoutes.post('/enhance', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    if (!(await checkRateLimit(c, userId))) {
        return c.json({ error: 'Daily AI limit reached' }, 429);
    }

    try {
        const { role, company, description } = await c.req.json();

        const prompt = `You are an expert resume writer. Enhance this job description for a ${role} at ${company}.

Current description: "${description || 'No description provided'}"

Convert into 3-5 punchy, results-oriented bullet points using action verbs. Return ONLY bullet points starting with •. No introductory text.`;

        const enhanced = await callGemini(c.env.GEMINI_API_KEY, prompt);
        await logUsage(c, userId, 'enhance');

        return c.json({ success: true, data: { enhanced } });
    } catch (error) {
        return c.json({ error: 'Failed to enhance description' }, 500);
    }
});

// Suggest skills
aiRoutes.post('/suggest-skills', async (c) => {
    const userId = await getUserId(c);
    if (!userId) return c.json({ error: 'Unauthorized' }, 401);

    if (!(await checkRateLimit(c, userId))) {
        return c.json({ error: 'Daily AI limit reached' }, 429);
    }

    try {
        const { title, currentSkills } = await c.req.json();

        const prompt = `For a ${title || 'professional'} role, suggest 10 relevant technical and soft skills.

Current skills: ${currentSkills?.join(', ') || 'None'}

Return skills as a JSON array of strings. Only return the JSON array, nothing else.`;

        const result = await callGemini(c.env.GEMINI_API_KEY, prompt);
        await logUsage(c, userId, 'suggest-skills');

        const skills = JSON.parse(result.replace(/```json|```/g, '').trim());
        return c.json({ success: true, data: { skills } });
    } catch (error) {
        return c.json({ error: 'Failed to suggest skills' }, 500);
    }
});
