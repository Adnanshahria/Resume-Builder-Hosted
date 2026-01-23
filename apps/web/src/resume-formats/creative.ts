/**
 * Creative Professional Resume Template Configuration
 * 
 * For designers, artists, and creative professionals.
 */

export const creativeTemplateConfig = {
    id: 'creative',
    name: 'Creative Professional',
    icon: '🎨',

    // Portfolio Platforms
    portfolioPlatforms: [
        { id: 'behance', label: 'Behance', placeholder: 'behance.net/username', icon: 'behance' },
        { id: 'dribbble', label: 'Dribbble', placeholder: 'dribbble.com/username', icon: 'dribbble' },
        { id: 'portfolio', label: 'Portfolio', placeholder: 'yoursite.com', icon: 'globe' },
        { id: 'instagram', label: 'Instagram', placeholder: '@username', icon: 'instagram' },
        { id: 'pinterest', label: 'Pinterest', placeholder: 'pinterest.com/username', icon: 'pinterest' },
    ],

    // Skill Categories
    skillCategories: {
        design: [
            'UI/UX Design', 'Graphic Design', 'Brand Identity',
            'Typography', 'Illustration', 'Motion Graphics'
        ],
        tools: [
            'Figma', 'Adobe Photoshop', 'Adobe Illustrator',
            'Sketch', 'After Effects', 'InDesign', 'Canva'
        ],
        softSkills: [
            'Creative Thinking', 'Visual Communication',
            'Attention to Detail', 'Client Collaboration'
        ],
    },

    // Sections
    sections: [
        'personalInfo',
        'summary',
        'portfolio',      // Portfolio projects
        'experience',
        'education',
        'skills',
        'awards',         // Design awards
    ],

    labels: {
        experience: 'Work Experience',
        skills: 'Skills & Tools',
        education: 'Education',
    },
};

export default creativeTemplateConfig;
