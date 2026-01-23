# Google Ads Integration Guide for Freemium Resume

## Overview
This guide explains how to integrate Google Ads (AdSense) into freemiumresume.online for monetization.

---

## Step 1: Sign Up for Google AdSense

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Click "Get Started"
3. Enter your website: `freemiumresume.online`
4. Enter your email and country
5. Accept terms and create account

---

## Step 2: Verify Site Ownership

1. After signup, Google provides a verification code snippet
2. Add it to `index.html` in the `<head>` section:

```html
<head>
    <!-- Google AdSense Verification -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
         crossorigin="anonymous"></script>
</head>
```

---

## Step 3: Wait for Approval

- Google reviews your site (can take 1-7 days)
- Your site needs:
  - 10-20 quality pages of content (we have templates, editor, etc.)
  - Privacy Policy page
  - About page
  - Contact information
  - Original content

---

## Step 4: Create Ad Units

After approval, create ads in AdSense dashboard:

### Recommended Ad Placements

1. **Top Banner** (after navbar)
   - Size: 728x90 (leaderboard) or responsive
   - Location: Below navbar, above editor

2. **Sidebar Ad** (if applicable)
   - Size: 300x250 or 160x600
   - Location: Beside the resume preview

3. **Bottom Banner**
   - Size: 728x90 or responsive
   - Location: Footer area

---

## Step 5: Add Ad Code to React App

### Create AdBanner Component

Create `apps/web/src/components/AdBanner.tsx`:

```tsx
import { useEffect } from 'react';

interface AdBannerProps {
    slot: string;          // Ad unit slot ID
    format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
    style?: React.CSSProperties;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
    slot, 
    format = 'auto',
    style = { display: 'block' }
}) => {
    useEffect(() => {
        try {
            (window as any).adsbygoogle = (window as any).adsbygoogle || [];
            (window as any).adsbygoogle.push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={style}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Replace with your publisher ID
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
        />
    );
};
```

### Use in App.tsx

```tsx
import { AdBanner } from './components/AdBanner';

// In the JSX, add after navbar:
<div className="ad-container no-print">
    <AdBanner slot="1234567890" format="horizontal" />
</div>
```

---

## Step 6: Required Pages for Approval

Create these pages:

### Privacy Policy (`/privacy`)
- Data collection practices
- Cookie usage
- Third-party ads disclosure

### Terms of Service (`/terms`)
- Usage terms
- Disclaimer

### About Page (`/about`)
- What the service does
- Contact information

---

## Ad Placement Best Practices

1. **Don't oversaturate** - Max 3-4 ads per page
2. **Don't block content** - Ads should not interfere with resume creation
3. **Hide during print** - Use `no-print` class on all ad containers
4. **Mobile responsive** - Use responsive ad units
5. **Fast loading** - Lazy load ads if possible

---

## Expected Revenue

| Traffic/Month | Est. RPM | Est. Revenue |
|---------------|----------|--------------|
| 1,000 visits  | $1-3     | $1-3/month   |
| 10,000 visits | $1-3     | $10-30/month |
| 100,000 visits| $1-3     | $100-300/month |

*RPM varies based on geography, niche, and ad engagement*

---

## Alternative Revenue Options

1. **Premium Features** (Freemium model)
   - More templates
   - AI enhancement limits
   - Export options

2. **Affiliate Marketing**
   - Job board links
   - Resume review services
   - Career coaching

3. **Sponsored Templates**
   - Company-branded templates

---

## Environment Variables

Add to `.env`:

```env
VITE_GOOGLE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

Then reference in code:
```tsx
data-ad-client={import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT}
```
