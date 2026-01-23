import { Hono } from 'hono';
import { z } from 'zod';
import { Argon2id } from 'oslo/password';

const argon2id = new Argon2id();
import { generateId } from 'lucia';
import { createDb } from '../db';
import { users, sessions } from '../db/schema';
import { eq } from 'drizzle-orm';

type Bindings = {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
    JWT_SECRET: string;
};

export const authRoutes = new Hono<{ Bindings: Bindings }>();

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

// Register
authRoutes.post('/register', async (c) => {
    try {
        const body = await c.req.json();
        const { email, password, name } = registerSchema.parse(body);

        const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

        // Check if user exists
        const existing = await db.select().from(users).where(eq(users.email, email)).get();
        if (existing) {
            return c.json({ error: 'Email already registered' }, 400);
        }

        // Hash password and create user
        const passwordHash = await argon2id.hash(password);
        const userId = generateId(15);

        await db.insert(users).values({
            id: userId,
            email,
            passwordHash,
            name: name || null,
        });

        // Create session
        const sessionId = generateId(40);
        const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 30 days

        await db.insert(sessions).values({
            id: sessionId,
            userId,
            expiresAt,
        });

        return c.json({
            success: true,
            data: {
                user: { id: userId, email, name },
                token: sessionId,
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ error: error.errors }, 400);
        }
        console.error(error);
        return c.json({ error: 'Registration failed' }, 500);
    }
});

// Login
authRoutes.post('/login', async (c) => {
    try {
        const body = await c.req.json();
        const { email, password } = loginSchema.parse(body);

        const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

        const user = await db.select().from(users).where(eq(users.email, email)).get();
        if (!user) {
            return c.json({ error: 'Invalid credentials' }, 401);
        }

        const validPassword = await argon2id.verify(user.passwordHash, password);
        if (!validPassword) {
            return c.json({ error: 'Invalid credentials' }, 401);
        }

        // Create session
        const sessionId = generateId(40);
        const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;

        await db.insert(sessions).values({
            id: sessionId,
            userId: user.id,
            expiresAt,
        });

        return c.json({
            success: true,
            data: {
                user: { id: user.id, email: user.email, name: user.name },
                token: sessionId,
            }
        });
    } catch (error) {
        console.error(error);
        return c.json({ error: 'Login failed' }, 500);
    }
});

// Logout
authRoutes.post('/logout', async (c) => {
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return c.json({ error: 'No token provided' }, 401);
    }

    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);
    await db.delete(sessions).where(eq(sessions.id, token));

    return c.json({ success: true });
});

// Get current user
authRoutes.get('/me', async (c) => {
    const token = c.req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return c.json({ error: 'Not authenticated' }, 401);
    }

    const db = createDb(c.env.TURSO_DATABASE_URL, c.env.TURSO_AUTH_TOKEN);

    const session = await db.select().from(sessions).where(eq(sessions.id, token)).get();
    if (!session || session.expiresAt < Math.floor(Date.now() / 1000)) {
        return c.json({ error: 'Session expired' }, 401);
    }

    const user = await db.select().from(users).where(eq(users.id, session.userId)).get();
    if (!user) {
        return c.json({ error: 'User not found' }, 404);
    }

    return c.json({
        success: true,
        data: { id: user.id, email: user.email, name: user.name }
    });
});
