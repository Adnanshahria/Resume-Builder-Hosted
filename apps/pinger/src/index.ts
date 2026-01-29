import dotenv from 'dotenv';
import https from 'https';
import http from 'http';

// Load environment variables
dotenv.config();

interface Config {
    targets: string[];
    intervalMinutes: number;
}

const loadConfig = (): Config => {
    const urls = process.env.TARGET_URLS ? process.env.TARGET_URLS.split(',').map(u => u.trim()) : [];
    const interval = parseInt(process.env.MSG_INTERVAL_MINUTES || '23', 10); // Default 23 minutes (Wait, user said 23 sec earlier but changed to 23 hours? Let's assume hours per last request, but offer flexible config)
    // Actually, user said 23 HOURS in the previous turn. But "custom time for any need" suggests flexibility.

    // Let's use MINUTES as the base unit in env for easier math, or allow full cron expression later.
    // For now, simpler: INTERVAL_MS or INTERVAL_HOURS.

    // User requested "custom server by bustom time".

    return {
        targets: urls,
        intervalMinutes: interval
    };
};

const ping = (url: string) => {
    const protocol = url.startsWith('https') ? https : http;
    const start = Date.now();

    const req = protocol.get(url, (res) => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ✅ Ping ${url} - Status: ${res.statusCode} (${duration}ms)`);

        // Consume response to free memory
        res.resume();
    });

    req.on('error', (err) => {
        console.error(`[${new Date().toISOString()}] ❌ Ping failed for ${url}:`, err.message);
    });

    req.on('timeout', () => {
        req.destroy();
        console.error(`[${new Date().toISOString()}] ⏰ Ping timeout for ${url}`);
    });

    req.setTimeout(10000); // 10s timeout
};

const config = loadConfig();
// Use PING_INTERVAL_MS env var directly if provided, otherwise convert from HOURS
const intervalMs = process.env.PING_INTERVAL_MS
    ? parseInt(process.env.PING_INTERVAL_MS, 10)
    : (parseInt(process.env.PING_INTERVAL_HOURS || '23', 10) * 60 * 60 * 1000);

if (config.targets.length === 0) {
    console.error('❌ No targets configured! Set TARGET_URLS in .env (comma separated)');
    process.exit(1);
}

console.log(`🚀 Pinger started!`);
console.log(`🎯 Targets:`, config.targets);
console.log(`⏱️  Interval: ${(intervalMs / 1000 / 60 / 60).toFixed(2)} hours (${intervalMs}ms)`);

// Initial ping
config.targets.forEach(target => ping(target));

// Schedule
setInterval(() => {
    config.targets.forEach(target => ping(target));
}, intervalMs);
