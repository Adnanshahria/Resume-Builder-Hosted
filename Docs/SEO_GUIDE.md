# SEO Implementation Guide

## Overview

This document describes the SEO configuration for the Freemium Resume website at `https://freemiumresume.online/`.

## SEO Files

| File | Location | Purpose |
|------|----------|---------|
| `robots.txt` | `/public/robots.txt` | Crawler guidance |
| `sitemap.xml` | `/public/sitemap.xml` | Search engine indexing |
| `index.html` | `/index.html` | Meta tags & structured data |

## Meta Tags

### Primary Tags
- **Title**: `Freemium Resume - Free AI Resume Builder | Create Professional Resumes Online`
- **Description**: Emphasizes free AI assistance, ATS-friendly templates, and export options
- **Keywords**: Resume-related terms for discoverability

### Open Graph (Facebook/LinkedIn)
- Image size: 1200x630 pixels
- Image URL: `https://freemiumresume.online/og-image.png`

### Twitter Cards
- Card type: `summary_large_image`
- Same image as OG

## JSON-LD Structured Data

Two schemas are implemented:

1. **SoftwareApplication** - For rich search results showing app features and ratings
2. **WebSite** - For site recognition

## How to Update

### Adding Search Console Verification

Uncomment and add your codes in `index.html`:
```html
<meta name="google-site-verification" content="YOUR_CODE" />
<meta name="msvalidate.01" content="YOUR_CODE" />
```

### Updating Sitemap

Edit `/apps/web/public/sitemap.xml` and update the `<lastmod>` date when making significant changes.

### Creating OG Image

Create a 1200x630 PNG image named `og-image.png` and place it in `/apps/web/public/`.

**Design recommendations:**
- Blue-to-teal gradient background (#3B82F6 → #14B8A6)
- "Freemium Resume" title
- "Free AI-Powered Resume Builder" subtitle
- Clean, professional aesthetic

## Verification Tools

After deployment, test with:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

## Submitting to Search Engines

1. **Google Search Console**: https://search.google.com/search-console
2. **Bing Webmaster Tools**: https://www.bing.com/webmasters
