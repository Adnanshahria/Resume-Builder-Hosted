/**
 * Doctor Resume Template Configuration
 * 
 * This file defines the fields and settings specific to medical professional resumes.
 */

export const doctorTemplateConfig = {
    id: 'medical',
    name: 'Medical Professional',
    icon: '🏥',

    // License Types Available
    licenseTypes: [
        { value: 'BMDC', label: 'BMDC (Bangladesh Medical & Dental Council)' },
        { value: 'MCI', label: 'MCI (Medical Council of India)' },
        { value: 'GMC', label: 'GMC (UK General Medical Council)' },
        { value: 'USMLE', label: 'USMLE (US Medical Licensing Exam)' },
        { value: 'State Board', label: 'State Medical Board License' },
        { value: 'MCPS', label: 'MCPS (Member of College of Physicians and Surgeons)' },
        { value: 'FCPS', label: 'FCPS (Fellow of College of Physicians and Surgeons)' },
        { value: 'MRCP', label: 'MRCP (Member of Royal College of Physicians)' },
        { value: 'Other', label: 'Other International License' },
    ],

    // Suggested Specializations
    suggestedSpecializations: [
        'Internal Medicine',
        'Cardiology',
        'Neurology',
        'Pediatrics',
        'Surgery',
        'Orthopedics',
        'Dermatology',
        'Psychiatry',
        'Radiology',
        'Anesthesiology',
        'Emergency Medicine',
        'Family Medicine',
        'Oncology',
        'Gastroenterology',
        'Endocrinology',
    ],

    // Required Sections
    sections: [
        'personalInfo',
        'summary',
        'licenses',        // Multiple license support
        'experience',
        'education',
        'specializations',
        'certifications',
        'publications',    // Optional for doctors
        'affiliations',    // Hospital affiliations
    ],

    // Field Labels (Medical-specific)
    labels: {
        experience: 'Clinical Experience',
        skills: 'Specializations',
        education: 'Medical Education & Training',
    },
};

export default doctorTemplateConfig;
