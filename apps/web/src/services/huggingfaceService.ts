/**
 * Hugging Face Space Service - Calls Ollama running on HF Space
 * Space URL: https://adnanshahria2019-my-qwen-coder.hf.space
 */

import { logger } from '../utils/logger';

// Configuration
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN || '';
const HF_SPACE_URL = import.meta.env.VITE_HF_SPACE_URL || 'https://adnanshahria2019-my-qwen-coder.hf.space';
// Default to 'huggingface' as per user request to enable it
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'huggingface';

// Check if HF is configured
export const isHuggingFaceEnabled = (): boolean => {
    // If securely configured in env, or if we are forcing it (assuming token might be hardcoded/proxy)
    // For now, we trust configuration. 
    return AI_PROVIDER === 'huggingface';
};

// Get current provider name
export const getCurrentProvider = (): string => {
    return isHuggingFaceEnabled() ? 'Hugging Face (Gemma 2B)' : 'Gemini';
};

/**
 * Call the Ollama API running on HF Space
 */
export const generateWithHuggingFace = async (prompt: string): Promise<string> => {
    if (!isHuggingFaceEnabled()) {
        throw new Error('Hugging Face not configured. Please set VITE_HF_TOKEN in .env');
    }

    logger.info('HuggingFaceService', 'Calling Ollama on HF Space', {
        spaceUrl: HF_SPACE_URL,
        promptLength: prompt.length
    });

    try {
        // Ollama API endpoint
        const response = await fetch(`${HF_SPACE_URL}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HF_TOKEN}`,
            },
            body: JSON.stringify({
                model: 'gemma2:2b', // Gemma 2 2B model
                prompt: prompt,
                stream: false,
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            logger.error('HuggingFaceService', 'API error', { status: response.status, error: errorText });
            throw new Error(`HF Space API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        logger.info('HuggingFaceService', 'Response received', { responseLength: data.response?.length });

        return data.response || '';
    } catch (error) {
        logger.error('HuggingFaceService', 'Failed to call HF Space', error);
        throw error;
    }
};

/**
 * Alternative: Use Gradio client API format (if Space uses Gradio interface)
 */
export const generateWithGradio = async (prompt: string): Promise<string> => {
    if (!isHuggingFaceEnabled()) {
        throw new Error('Hugging Face not configured');
    }

    logger.info('HuggingFaceService', 'Calling Gradio API', { spaceUrl: HF_SPACE_URL });

    try {
        // Gradio API format
        const response = await fetch(`${HF_SPACE_URL}/api/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${HF_TOKEN}`,
            },
            body: JSON.stringify({
                data: [prompt],
            }),
        });

        if (!response.ok) {
            throw new Error(`Gradio API error: ${response.status}`);
        }

        const data = await response.json();
        return data.data?.[0] || '';
    } catch (error) {
        logger.error('HuggingFaceService', 'Gradio API failed', error);
        throw error;
    }
};

/**
 * Keep-alive ping to prevent HF Space from sleeping
 */
export const keepAlive = async (): Promise<void> => {
    if (!isHuggingFaceEnabled()) return;

    try {
        // Simple GET request to root or health endpoint to keep the space active
        // Using no-cors to avoid CORS errors since we just want to hit the server
        await fetch(HF_SPACE_URL, {
            method: 'GET',
            mode: 'no-cors',
        });
        // logger.info('HuggingFaceService', 'Keep-alive ping sent');
    } catch (error) {
        // Silent fail for ping
        console.debug('HF Ping failed', error);
    }
};
