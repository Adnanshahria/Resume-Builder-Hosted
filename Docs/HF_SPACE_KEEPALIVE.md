# Hugging Face Space Keep-Alive System

## Overview

Hugging Face Spaces on the free tier automatically go to sleep after **48 hours of inactivity**. This can cause delays when users try to access the AI features since the Space needs to wake up first.

To prevent this, we've implemented an automated keep-alive system using GitHub Actions.

## How It Works

The GitHub Actions workflow (`.github/workflows/keep-hf-space-alive.yml`) automatically pings your HF Space at regular intervals to prevent it from sleeping.

### Schedule

- **Frequency**: Every ~23 hours (well within the 48-hour sleep threshold)
- **Endpoints Pinged**:
  1. Main Space URL: `https://adnanshahria2019-my-qwen-coder.hf.space`
  2. API endpoint: `/api/generate` with a simple ping request

## Configuration

### Current Setup

| Setting | Value |
|---------|-------|
| Space URL | `https://adnanshahria2019-my-qwen-coder.hf.space` |
| Model | `gemma2:2b` |
| Ping Interval | Every 23 hours |

### Updating the Space URL

If you change your HF Space URL, update it in:

1. `.github/workflows/keep-hf-space-alive.yml` - Update the `HF_SPACE_URL` variable
2. `.env.local` - Update `VITE_HF_SPACE_URL`
3. `apps/web/src/services/huggingfaceService.ts` - Update the default URL

## Manual Trigger

You can manually trigger the keep-alive workflow:

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. Select **"Keep Hugging Face Space Alive"** workflow
4. Click **"Run workflow"**

## Troubleshooting

### Space Still Going to Sleep

If your Space is still going to sleep:

1. Check GitHub Actions logs to ensure the workflow is running
2. Verify the Space URL is correct
3. Ensure GitHub Actions is enabled for your repository

### Workflow Not Running

Make sure:

- The repository is public or you have GitHub Actions minutes available
- The workflow file is in `.github/workflows/` directory
- The cron syntax is correct

## Alternative Solutions

If GitHub Actions isn't suitable, consider:

1. **cron-job.org**: Free external cron service
2. **UptimeRobot**: Free monitoring service that pings URLs
3. **Hugging Face Pro**: Upgrade for "always-on" Spaces

## Related Files

- Workflow: [keep-hf-space-alive.yml](../.github/workflows/keep-hf-space-alive.yml)
- HF Service: [huggingfaceService.ts](../apps/web/src/services/huggingfaceService.ts)
- Feature Docs: [FEATURES.md](./FEATURES.md)
