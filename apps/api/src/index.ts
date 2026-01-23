import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { authRoutes } from './routes/auth';
import { resumeRoutes } from './routes/resumes';
import { aiRoutes } from './routes/ai';
import { shareRoutes } from './routes/share';

type Bindings = {
    TURSO_DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
    GEMINI_API_KEY: string;
    JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('*', logger());
app.use('*', cors({
    origin: ['http://localhost:6969', 'https://resume-forge.pages.dev'],
    credentials: true,
}));

// Health check
app.get('/', (c) => {
    return c.json({
        message: 'AI Resume Forge API',
        version: '1.0.0',
        status: 'healthy'
    });
});

// Routes
app.route('/api/auth', authRoutes);
app.route('/api/resumes', resumeRoutes);
app.route('/api/ai', aiRoutes);
app.route('/api/share', shareRoutes);

// 404 handler
app.notFound((c) => {
    return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
    console.error(`Error: ${err.message}`);
    return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
