/**
 * Professional/Business Resume Template Configuration
 * 
 * For general business, management, and corporate roles.
 */

export const professionalTemplateConfig = {
    id: 'professional',
    name: 'Professional',
    icon: '💼',

    // Sections for business professionals
    sections: [
        'personalInfo',
        'summary',
        'experience',
        'education',
        'skills',
        'certifications',
        'languages',
    ],

    // Skill Categories
    skillCategories: {
        business: [
            'Project Management', 'Strategic Planning', 'Business Development',
            'Financial Analysis', 'Market Research', 'Stakeholder Management'
        ],
        software: [
            'Microsoft Office', 'Excel', 'PowerPoint',
            'Salesforce', 'SAP', 'Tableau'
        ],
        softSkills: [
            'Leadership', 'Communication', 'Negotiation',
            'Team Building', 'Problem Solving', 'Time Management'
        ],
    },

    labels: {
        experience: 'Professional Experience',
        skills: 'Core Competencies',
        education: 'Education',
    },
};

export default professionalTemplateConfig;
