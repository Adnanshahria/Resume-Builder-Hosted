import { useEffect } from 'react';

interface SEOHeadProps {
    title: string;
    description: string;
    canonicalPath?: string;
    ogImage?: string;
}

/**
 * SEOHead component that updates document head for each page.
 * Since this is a React SPA, we use useEffect to update the head instead of react-helmet.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
    title,
    description,
    canonicalPath = '',
    ogImage = '/og-image.png'
}) => {
    const baseUrl = 'https://freemiumresume.online';
    const fullUrl = `${baseUrl}${canonicalPath}`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

    useEffect(() => {
        // Update title
        document.title = title;

        // Update meta description
        updateMetaTag('description', description, 'name');

        // Update Open Graph tags
        updateMetaTag('og:title', title, 'property');
        updateMetaTag('og:description', description, 'property');
        updateMetaTag('og:url', fullUrl, 'property');
        updateMetaTag('og:image', fullOgImage, 'property');

        // Update Twitter tags
        updateMetaTag('twitter:title', title, 'name');
        updateMetaTag('twitter:description', description, 'name');

        // Update canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.href = fullUrl;

        return () => {
            // Cleanup is optional since each page will update these anyway
        };
    }, [title, description, fullUrl, fullOgImage]);

    return null; // This component doesn't render anything
};

function updateMetaTag(key: string, value: string, attr: 'name' | 'property') {
    let meta = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, key);
        document.head.appendChild(meta);
    }
    meta.content = value;
}

// Pre-defined SEO configurations for each page
export const SEO_CONFIG = {
    landing: {
        title: 'FreeMium Resume - Free AI Resume Builder | ATS-Friendly Templates',
        description: 'Build professional ATS-friendly resumes for free. AI-powered content enhancement, multiple templates for developers, doctors, students & more. No credit card required.',
        path: '/'
    },
    templates: {
        title: 'Resume Templates - Choose Your Profession | FreeMium Resume',
        description: 'Select from professional resume templates designed for software developers, healthcare professionals, students, business managers, designers, and more.',
        path: '/templates'
    },
    editor: {
        title: 'Resume Editor - Create Your Resume | FreeMium Resume',
        description: 'Build and customize your professional resume with our easy-to-use editor. Real-time preview, AI content enhancement, and instant PDF download.',
        path: '/editor'
    },
    about: {
        title: 'About Us - FreeMium Resume',
        description: 'Learn about the developer behind FreeMium Resume - Mohammed Adnan Shahria, DVM student at Gazipur Agricultural University.',
        path: '/about'
    }
};

export default SEOHead;
