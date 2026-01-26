// Resume Data Types
export interface PersonalInfo {
    fullName: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    linkedinUsername?: string;    // Display username (e.g., @adnanshahria)
    website?: string;
    photo?: string | null;  // Base64 encoded photo
    // Template-specific fields
    github?: string;          // For developer/tech templates
    githubUsername?: string;  // Display username (e.g., @adnanshahria)
    // Competitive programming profiles
    leetcode?: string;        // LeetCode profile URL
    leetcodeUsername?: string; // Display username
    leetcodeRating?: string;  // LeetCode rating (optional)
    codeforces?: string;      // Codeforces profile URL
    codeforcesUsername?: string; // Display username
    codeforcesRating?: string; // Codeforces rating (optional)
    codechef?: string;        // CodeChef profile URL
    codechefUsername?: string; // Display username
    codechefRating?: string;  // CodeChef rating (optional)
    dribbble?: string;        // For creative templates
    behance?: string;         // For creative templates
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
    location?: string;  // City, State for ATS format
    description: string;
}

export interface EducationItem {
    id?: string;
    institution: string;
    degree: string;
    field?: string;
    startDate?: string;   // For date range display
    graduationYear: string;
    cgpa?: string;
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

// Vocational Certifications - courses from online/offline platforms
export interface VocationalCertificationItem {
    id?: string;
    name: string;                    // Certificate/Course name
    provider: string;                // Provider (e.g., Programming Hero, CoderVhai, Udemy)
    date?: string;                   // Completion date
    description?: string;            // What they learned
    credentialUrl?: string;          // Link to certificate
}

// Achievements - hackathons, awards, competitions
export interface AchievementItem {
    id?: string;
    title: string;                   // e.g., "1st Place - XYZ Hackathon"
    organization?: string;           // e.g., "IEEE", "Google"
    date?: string;
    description?: string;
}

// Extracurricular - clubs, research, publications
export interface ExtracurricularItem {
    id?: string;
    organization: string;            // e.g., "IEEE Student Branch", "MIT AI Lab"
    role: string;                    // e.g., "Vice President", "Research Assistant"
    startDate?: string;              // e.g., "2022-03" or "03/2022"
    endDate?: string;                // e.g., "2024-01" or "Present"
    isCurrent?: boolean;             // If currently active
    description?: string;
}

// Skills structured data
export interface SkillsData {
    coursework?: string[];           // Relevant coursework
    programmingLanguages?: string[]; // Python, Java, etc.
    webTechnologies?: string[];      // React, Node.js, etc.
    databases?: string[];            // MySQL, MongoDB, etc.
    tools?: string[];                // Git, Docker, etc.
    languages?: string[];            // English, Bengali, etc.
    interests?: string[];            // Optional hobbies/interests
}

// Section visibility config - which sections to include in CV
export interface SectionVisibility {
    summary: boolean;
    education: boolean;
    experience: boolean;
    projects: boolean;
    skills: boolean;
    achievements: boolean;
    extracurricular: boolean;
    vocationalCertifications: boolean;
    coursework: boolean;
    declaration: boolean;
}

// Default enabled sections
export const DEFAULT_ENABLED_SECTIONS: SectionVisibility = {
    summary: true,
    education: true,
    experience: true,
    projects: true,
    skills: true,
    achievements: false,
    extracurricular: false,
    vocationalCertifications: false,
    coursework: false,
    declaration: false,
};

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    education: EducationItem[];
    vocationalCertifications?: VocationalCertificationItem[];  // Online/offline course certifications
    skills: string[];                                          // Legacy simple skills array
    skillsData?: SkillsData;                                   // Structured skills
    coursework?: string[];                                     // Relevant coursework for tech templates
    experience: ExperienceItem[];
    projects?: ProjectItem[];                                  // For developer/tech templates
    achievements?: AchievementItem[];                          // Hackathons, awards
    extracurricular?: ExtracurricularItem[];                   // Clubs, research, publications
    showDeclaration?: boolean;                                 // Toggle for declaration section
    certifications?: CertificationItem[];                      // Legacy - kept for backwards compatibility
    enabledSections?: SectionVisibility;                       // Which sections are enabled
    hasUserEdited?: boolean;                                   // Has user started editing
}

// Template type (re-exported from lib/templates for convenience)
export type { TemplateType } from '../lib/templates';


