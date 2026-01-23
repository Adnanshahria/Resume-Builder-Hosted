import React, { useEffect, useRef } from 'react';

interface GoogleAdProps {
    /** Your AdSense ad slot ID */
    adSlot: string;
    /** Ad format - auto is recommended for responsive ads */
    adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
    /** Whether the ad should take full width */
    fullWidth?: boolean;
    /** Additional CSS class names */
    className?: string;
    /** Custom styles */
    style?: React.CSSProperties;
}

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

/**
 * Google AdSense Ad Component
 * 
 * Usage:
 * ```tsx
 * <GoogleAd 
 *   adSlot="1234567890" 
 *   adFormat="auto"
 *   className="my-ad"
 * />
 * ```
 * 
 * Make sure to:
 * 1. Add the AdSense script to your index.html
 * 2. Replace the publisher ID in this component
 * 3. Create ad units in your AdSense dashboard
 */
export const GoogleAd: React.FC<GoogleAdProps> = ({
    adSlot,
    adFormat = 'auto',
    fullWidth = true,
    className = '',
    style,
}) => {
    const adRef = useRef<HTMLModElement>(null);
    const isLoaded = useRef(false);

    useEffect(() => {
        // Only push to adsbygoogle once per component instance
        if (isLoaded.current) return;

        try {
            // Initialize adsbygoogle array if it doesn't exist
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
            isLoaded.current = true;
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`google-ad-container ${className}`} style={style}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                    display: 'block',
                    width: fullWidth ? '100%' : 'auto',
                }}
                data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your publisher ID
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive="true"
            />
        </div>
    );
};

/**
 * Predefined Ad Placements
 */
export const HeaderAd: React.FC<{ adSlot: string }> = ({ adSlot }) => (
    <GoogleAd
        adSlot={adSlot}
        adFormat="horizontal"
        className="ad-header"
    />
);

export const SidebarAd: React.FC<{ adSlot: string }> = ({ adSlot }) => (
    <GoogleAd
        adSlot={adSlot}
        adFormat="rectangle"
        className="ad-sidebar"
        fullWidth={false}
    />
);

export const BetweenSectionsAd: React.FC<{ adSlot: string }> = ({ adSlot }) => (
    <GoogleAd
        adSlot={adSlot}
        adFormat="horizontal"
        className="ad-between-sections"
    />
);

export default GoogleAd;
