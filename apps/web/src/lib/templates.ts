// Template type definitions
export type TemplateType =
    | 'professional'       // General jobs
    | 'developer'          // Programmer/Tech jobs
    | 'software-engineer'  // Software Engineer (two-column)
    | 'technical'          // Engineering/Technical jobs
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
        id: 'software-engineer',
        name: 'Software Engineer',
        description: 'Two-column layout perfect for tech roles with skills sidebar',
        icon: '👨‍💻',
        primaryColor: '#2d3748',  // Dark charcoal gray
        accentColor: '#4a5568',   // Muted gray accent
        layout: 'two-column',
    },
    {
        id: 'developer',
        name: 'Developer',
        description: 'Modern tech-focused layout for programmers',
        icon: '💻',
        primaryColor: '#1a202c',  // Near black
        accentColor: '#2d3748',   // Dark gray
        layout: 'sidebar',
    },
    {
        id: 'technical',
        name: 'Technical',
        description: 'Engineering and technical specialist template',
        icon: '⚙️',
        primaryColor: '#2d3748',  // Dark charcoal
        accentColor: '#4a5568',   // Medium gray
        layout: 'two-column',
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
