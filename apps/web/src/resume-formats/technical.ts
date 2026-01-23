/**
 * Technical/Engineering Resume Template Configuration
 * 
 * For engineers, technicians, and technical specialists.
 */

export const technicalTemplateConfig = {
    id: 'technical',
    name: 'Technical Specialist',
    icon: '⚙️',

    // Technical Platforms
    platforms: [
        { id: 'github', label: 'GitHub', placeholder: 'github.com/username' },
        { id: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username' },
        { id: 'researchgate', label: 'ResearchGate', placeholder: 'researchgate.net/profile' },
    ],

    // Skill Categories
    skillCategories: {
        technical: [
            'CAD/CAM', 'MATLAB', 'AutoCAD', 'SolidWorks',
            'Finite Element Analysis', 'Circuit Design'
        ],
        programming: [
            'Python', 'C/C++', 'VHDL', 'LabVIEW',
            'R', 'Assembly'
        ],
        certifications: [
            'PE (Professional Engineer)', 'PMP', 'Six Sigma',
            'ISO 9001', 'Lean Manufacturing'
        ],
    },

    // Engineering-specific sections
    sections: [
        'personalInfo',
        'summary',
        'experience',
        'projects',        // Technical projects
        'education',
        'skills',
        'certifications',
        'publications',    // For research engineers
    ],

    labels: {
        experience: 'Engineering Experience',
        skills: 'Technical Skills',
        education: 'Education & Training',
    },
};

export default technicalTemplateConfig;
