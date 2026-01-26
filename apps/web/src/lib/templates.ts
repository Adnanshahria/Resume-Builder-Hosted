// Template type definitions - Simplified to 4 core templates
export type TemplateType =
    | 'professional'       // General/Business jobs
    | 'tech'               // Developer/Engineer/Technical (ATS-friendly)
    | 'medical'            // Doctor/Healthcare jobs
    | 'creative';          // Design/Creative jobs

export interface TemplateInfo {
    id: TemplateType;
    name: string;
    description: string;
    icon: string;
    primaryColor: string;
    accentColor: string;
    // Visual preview hints
    layout: 'single' | 'two-column' | 'sidebar';
}

export const TEMPLATES: TemplateInfo[] = [
    {
        id: 'professional',
        name: 'Professional',
        description: 'Clean and classic design for general business roles',
        icon: '💼',
        primaryColor: '#1a365d',  // Dark navy - professional
        accentColor: '#2b6cb0',   // Muted blue
        layout: 'single',
    },
    {
        id: 'tech',
        name: 'TECHNICAL',
        description: 'ATS-friendly format for engineers, developers, and tech professionals',
        icon: '💻',
        primaryColor: '#1a202c',  // Near black
        accentColor: '#2d3748',   // Dark gray
        layout: 'single',
    },
    {
        id: 'medical',
        name: 'Medical',
        description: 'Healthcare and medical professional design',
        icon: '🏥',
        primaryColor: '#234e52',  // Dark teal
        accentColor: '#319795',   // Muted teal
        layout: 'two-column',
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'Elegant design for designers and artists',
        icon: '🎨',
        primaryColor: '#2d3748',  // Dark gray
        accentColor: '#553c9a',   // Muted purple
        layout: 'single',
    },
];
