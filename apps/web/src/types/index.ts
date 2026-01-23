// Resume Data Types
export interface PersonalInfo {
    fullName: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
    photo?: string | null;  // Base64 encoded photo
    // Template-specific fields
    github?: string;          // For developer/tech templates
    dribbble?: string;        // For creative templates
    licenseNumber?: string;   // Legacy - kept for backwards compatibility
    // Enhanced medical fields
    medicalLicenses?: MedicalLicense[];    // Multiple licenses (1 mandatory + optional)
    medicalSpecializations?: string[];      // Specializations/subspecialties
    hospitalAffiliations?: string[];        // Hospital affiliations
}

// Medical License Types
export type MedicalLicenseType =
    | 'BMDC'           // Bangladesh Medical & Dental Council
    | 'MCI'            // Medical Council of India  
    | 'GMC'            // UK General Medical Council
    | 'USMLE'          // US Medical Licensing Exam
    | 'State Board'    // US State Medical Board
    | 'MCPS'           // Member of College of Physicians and Surgeons
    | 'FCPS'           // Fellow of College of Physicians and Surgeons
    | 'Other';         // Other international licenses

export interface MedicalLicense {
    id: string;
    type: MedicalLicenseType;
    customType?: string;    // Custom name when "Other" is selected
    number: string;
    country?: string;
    issueDate?: string;
    isPrimary?: boolean;  // First one is mandatory/primary
}

export interface ExperienceItem {
    id?: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    description: string;
}

export interface EducationItem {
    id?: string;
    institution: string;
    degree: string;
    field?: string;
    graduationYear: string;
}

// Certifications for professional templates
export interface CertificationItem {
    id?: string;
    name: string;
    issuer?: string;
    date?: string;
}

// Projects for developer templates
export interface ProjectItem {
    id?: string;
    name: string;
    description: string;
    techStack?: string[];
    link?: string;
    github?: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: string[];
    certifications?: CertificationItem[];  // Optional for some templates
    projects?: ProjectItem[];              // For developer/tech templates
}

// Template type (re-exported from lib/templates for convenience)
export type { TemplateType } from '../lib/templates';
