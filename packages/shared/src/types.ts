// Shared types for AI Resume Forge

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    title: string;
    website?: string;
    github?: string;
}

export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
    location?: string;
    isCurrentRole?: boolean;
}

export interface EducationItem {
    id: string;
    school: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    achievements?: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: string[];
    certifications?: CertificationItem[];
    projects?: ProjectItem[];
    languages?: LanguageItem[];
}

export interface CertificationItem {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
}

export interface ProjectItem {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
}

export interface LanguageItem {
    id: string;
    language: string;
    proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

// Resume template types
export type ResumeTemplate = 'professional' | 'modern' | 'minimal' | 'creative' | 'executive';

// User types
export interface User {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// Resume document type (stored in DB)
export interface Resume {
    id: string;
    userId: string;
    title: string;
    template: ResumeTemplate;
    data: ResumeData;
    isPrimary: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// API response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// Auth types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
}

export interface AuthSession {
    user: User;
    token: string;
}
