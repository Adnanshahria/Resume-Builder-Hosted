import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(request: VercelRequest, response: VercelResponse) {
    // Config
    const HF_SPACE_URL = process.env.VITE_HF_SPACE_URL || 'https://adnanshahria2019-my-qwen-coder.hf.space';

    try {
        console.log(`[Cron] Pinging Hugging Face Space: ${HF_SPACE_URL}`);

        const res = await fetch(HF_SPACE_URL);

        console.log(`[Cron] Response Status: ${res.status}`);

        return response.status(200).json({
            success: true,
            message: `Ping sent to ${HF_SPACE_URL}`,
            status: res.status
        });
    } catch (error: any) {
        console.error('[Cron] Ping failed:', error);
        return response.status(500).json({
            success: false,
            error: error.message
        });
    }
}
