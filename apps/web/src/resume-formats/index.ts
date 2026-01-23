/**
 * Resume Format Configurations
 * 
 * This folder contains profession-specific resume configurations.
 * Each file defines the fields, sections, and settings for that profession.
 */

export { doctorTemplateConfig } from './doctors';
export { developerTemplateConfig } from './developers';
export { creativeTemplateConfig } from './creative';
export { professionalTemplateConfig } from './professional';
export { technicalTemplateConfig } from './technical';

// Template configuration type
export interface TemplateConfig {
    id: string;
    name: string;
    icon: string;
    sections: string[];
    labels: Record<string, string>;
}

// License type for medical professionals
export interface LicenseOption {
    value: string;
    label: string;
}

// Get license options for medical template
export const getMedicalLicenseTypes = (): LicenseOption[] => [
    { value: 'BMDC', label: 'BMDC (Bangladesh Medical & Dental Council)' },
    { value: 'MCI', label: 'MCI (Medical Council of India)' },
    { value: 'GMC', label: 'GMC (UK General Medical Council)' },
    { value: 'USMLE', label: 'USMLE (US Medical Licensing Exam)' },
    { value: 'State Board', label: 'State Medical Board License' },
    { value: 'MCPS', label: 'MCPS (Member of College of Physicians)' },
    { value: 'FCPS', label: 'FCPS (Fellow of College of Physicians)' },
    { value: 'MRCP', label: 'MRCP (Royal College of Physicians)' },
    { value: 'Other', label: 'Other International License' },
];
