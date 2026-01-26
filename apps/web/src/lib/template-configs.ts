import { ResumeData } from '../types';

export type TemplateType = 'professional' | 'tech' | 'medical' | 'creative';

// Profile field configuration
export interface ProfileFieldConfig {
    id: string;
    label: string;
    placeholder: string;
    icon?: string;
    required?: boolean;
}

// Section configuration
export interface SectionConfig {
    enabled: boolean;
    label: string;
    description?: string;
}

// Template configuration
export interface TemplateConfig {
    id: TemplateType;
    name: string;
    description: string;
    icon: string;
    route: string;

    // Which sections are enabled and their labels
    sections: {
        summary: SectionConfig;
        education: SectionConfig;
        experience: SectionConfig;
        projects: SectionConfig;
        skills: SectionConfig;
        achievements: SectionConfig;
        extracurricular: SectionConfig;
        vocationalCertifications: SectionConfig;
        coursework: SectionConfig;
        declaration: SectionConfig;
    };

    // Profile/contact fields for this template
    profileFields: ProfileFieldConfig[];

    // Template-specific placeholder data
    placeholderData: Partial<ResumeData>;
}

// ================================
// TECHNICAL / DEVELOPER TEMPLATE
// ================================
export const TECH_TEMPLATE_CONFIG: TemplateConfig = {
    id: 'tech',
    name: 'TECHNICAL',
    description: 'ATS-friendly format for engineers, developers, and tech professionals',
    icon: '💻',
    route: '/editor/technical',

    sections: {
        summary: { enabled: true, label: 'Professional Summary' },
        education: { enabled: true, label: 'Education' },
        experience: { enabled: true, label: 'Work Experience' },
        projects: { enabled: true, label: 'Projects', description: 'Showcase your technical projects' },
        skills: { enabled: true, label: 'Technical Skills' },
        achievements: { enabled: true, label: 'Achievements & Awards' },
        extracurricular: { enabled: true, label: 'Extracurricular Activities' },
        vocationalCertifications: { enabled: true, label: 'Certifications' },
        coursework: { enabled: true, label: 'Relevant Coursework' },
        declaration: { enabled: true, label: 'Declaration' },
    },

    profileFields: [
        { id: 'fullName', label: 'Full Name', placeholder: 'John Doe', required: true },
        { id: 'email', label: 'Email', placeholder: 'john@example.com', required: true },
        { id: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567' },
        { id: 'location', label: 'Location', placeholder: 'San Francisco, CA' },
        { id: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/johndoe' },
        { id: 'github', label: 'GitHub', placeholder: 'github.com/johndoe' },
        { id: 'website', label: 'Portfolio Website', placeholder: 'johndoe.dev' },
        { id: 'leetcode', label: 'LeetCode', placeholder: '@username (1800)' },
        { id: 'codeforces', label: 'Codeforces', placeholder: '@username (1600)' },
        { id: 'codechef', label: 'CodeChef', placeholder: '@username' },
    ],

    placeholderData: {
        personalInfo: {
            fullName: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            github: 'github.com/johndoe',
            linkedin: 'linkedin.com/in/johndoe',
            leetcode: 'leetcode.com/johndoe',
            leetcodeRating: '1850',
        },
        summary: 'Results-driven software engineer with 5+ years of experience building scalable web applications.',
    },
};

// ================================
// PROFESSIONAL / BUSINESS TEMPLATE
// ================================
export const PROFESSIONAL_TEMPLATE_CONFIG: TemplateConfig = {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and classic design for general business roles',
    icon: '💼',
    route: '/editor/professional',

    sections: {
        summary: { enabled: true, label: 'Professional Summary' },
        education: { enabled: true, label: 'Education' },
        experience: { enabled: true, label: 'Work Experience' },
        projects: { enabled: false, label: 'Projects' },
        skills: { enabled: true, label: 'Core Competencies' },
        achievements: { enabled: true, label: 'Key Achievements' },
        extracurricular: { enabled: false, label: 'Activities' },
        vocationalCertifications: { enabled: true, label: 'Professional Certifications' },
        coursework: { enabled: false, label: 'Coursework' },
        declaration: { enabled: false, label: 'Declaration' },
    },

    profileFields: [
        { id: 'fullName', label: 'Full Name', placeholder: 'Jane Smith', required: true },
        { id: 'title', label: 'Professional Title', placeholder: 'Senior Business Analyst' },
        { id: 'email', label: 'Email', placeholder: 'jane@company.com', required: true },
        { id: 'phone', label: 'Phone', placeholder: '+1 (555) 987-6543' },
        { id: 'location', label: 'Location', placeholder: 'New York, NY' },
        { id: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/janesmith' },
    ],

    placeholderData: {
        personalInfo: {
            fullName: 'Jane Smith',
            title: 'Senior Business Analyst',
            email: 'jane.smith@email.com',
            phone: '+1 (555) 987-6543',
            location: 'New York, NY',
            linkedin: 'linkedin.com/in/janesmith',
        },
        summary: 'Strategic business professional with 8+ years of experience driving operational excellence and revenue growth.',
    },
};

// ================================
// MEDICAL / HEALTHCARE TEMPLATE
// ================================
export const MEDICAL_TEMPLATE_CONFIG: TemplateConfig = {
    id: 'medical',
    name: 'Medical',
    description: 'Healthcare and medical professional design',
    icon: '🏥',
    route: '/editor/medical',

    sections: {
        summary: { enabled: true, label: 'Professional Profile' },
        education: { enabled: true, label: 'Medical Education & Training' },
        experience: { enabled: true, label: 'Clinical Experience' },
        projects: { enabled: false, label: 'Research Projects' },
        skills: { enabled: true, label: 'Specializations & Skills' },
        achievements: { enabled: true, label: 'Publications & Awards' },
        extracurricular: { enabled: false, label: 'Professional Memberships' },
        vocationalCertifications: { enabled: true, label: 'Medical Licenses & Certifications' },
        coursework: { enabled: false, label: 'Continuing Education' },
        declaration: { enabled: true, label: 'Declaration' },
    },

    profileFields: [
        { id: 'fullName', label: 'Full Name', placeholder: 'Dr. Sarah Johnson', required: true },
        { id: 'title', label: 'Designation', placeholder: 'Cardiologist' },
        { id: 'email', label: 'Email', placeholder: 'dr.johnson@hospital.com', required: true },
        { id: 'phone', label: 'Phone', placeholder: '+1 (555) 234-5678' },
        { id: 'location', label: 'Location', placeholder: 'Boston, MA' },
        { id: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/drsarah' },
    ],

    placeholderData: {
        personalInfo: {
            fullName: 'Dr. Sarah Johnson',
            title: 'Cardiologist',
            email: 'dr.johnson@hospital.com',
            phone: '+1 (555) 234-5678',
            location: 'Boston, MA',
        },
        summary: 'Board-certified cardiologist with 10+ years of clinical experience specializing in interventional cardiology.',
    },
};

// ================================
// CREATIVE / DESIGNER TEMPLATE
// ================================
export const CREATIVE_TEMPLATE_CONFIG: TemplateConfig = {
    id: 'creative',
    name: 'Creative',
    description: 'Elegant design for designers and artists',
    icon: '🎨',
    route: '/editor/creative',

    sections: {
        summary: { enabled: true, label: 'About Me' },
        education: { enabled: true, label: 'Education' },
        experience: { enabled: true, label: 'Experience' },
        projects: { enabled: true, label: 'Portfolio / Projects' },
        skills: { enabled: true, label: 'Skills & Tools' },
        achievements: { enabled: true, label: 'Awards & Recognition' },
        extracurricular: { enabled: false, label: 'Activities' },
        vocationalCertifications: { enabled: false, label: 'Certifications' },
        coursework: { enabled: false, label: 'Coursework' },
        declaration: { enabled: false, label: 'Declaration' },
    },

    profileFields: [
        { id: 'fullName', label: 'Full Name', placeholder: 'Alex Rivera', required: true },
        { id: 'title', label: 'Creative Title', placeholder: 'UI/UX Designer' },
        { id: 'email', label: 'Email', placeholder: 'alex@design.studio', required: true },
        { id: 'phone', label: 'Phone', placeholder: '+1 (555) 345-6789' },
        { id: 'location', label: 'Location', placeholder: 'Los Angeles, CA' },
        { id: 'website', label: 'Portfolio', placeholder: 'alexrivera.design' },
        { id: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/alexrivera' },
        { id: 'dribbble', label: 'Dribbble', placeholder: 'dribbble.com/alexrivera' },
        { id: 'behance', label: 'Behance', placeholder: 'behance.net/alexrivera' },
    ],

    placeholderData: {
        personalInfo: {
            fullName: 'Alex Rivera',
            title: 'UI/UX Designer',
            email: 'alex@design.studio',
            phone: '+1 (555) 345-6789',
            location: 'Los Angeles, CA',
            website: 'alexrivera.design',
        },
        summary: 'Creative UI/UX designer with 6+ years of experience crafting intuitive digital experiences for startups and Fortune 500 companies.',
    },
};

// All template configs
export const TEMPLATE_CONFIGS: Record<TemplateType, TemplateConfig> = {
    tech: TECH_TEMPLATE_CONFIG,
    professional: PROFESSIONAL_TEMPLATE_CONFIG,
    medical: MEDICAL_TEMPLATE_CONFIG,
    creative: CREATIVE_TEMPLATE_CONFIG,
};

// Get template config by ID
export const getTemplateConfig = (templateId: TemplateType): TemplateConfig => {
    return TEMPLATE_CONFIGS[templateId] || PROFESSIONAL_TEMPLATE_CONFIG;
};

// Get template from route path
export const getTemplateFromRoute = (path: string): TemplateType => {
    if (path.includes('/technical')) return 'tech';
    if (path.includes('/professional')) return 'professional';
    if (path.includes('/medical')) return 'medical';
    if (path.includes('/creative')) return 'creative';
    return 'professional';
};
