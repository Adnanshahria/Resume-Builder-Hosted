import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env from project root (../../)
    const env = loadEnv(mode, path.resolve(__dirname, '../..'), '');
    return {
        server: {
            port: 6969,
            host: '0.0.0.0',
        },
        plugins: [react()],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@components': path.resolve(__dirname, './src/components'),
                '@services': path.resolve(__dirname, './src/services'),
                '@hooks': path.resolve(__dirname, './src/hooks'),
                '@stores': path.resolve(__dirname, './src/stores'),
                '@pages': path.resolve(__dirname, './src/pages'),
            }
        }
    };
});
