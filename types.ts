export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    title: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export enum GeneratorType {
  SUMMARY = 'SUMMARY',
  EXPERIENCE = 'EXPERIENCE',
}