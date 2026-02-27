import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResumeData, SectionVisibility, DEFAULT_ENABLED_SECTIONS } from '../types';
import { TemplateType, TEMPLATES } from '../config/templates';
import { exportToPDF } from '../utils/pdfExport';
import { downloadLatex } from '../services/latexService';

const INITIAL_DATA: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        location: '',
        title: '',
    },
    summary: '',
    education: [],
    vocationalCertifications: [],
    skills: [],
    coursework: [],
    experience: [],
    projects: [],
    achievements: [],
    extracurricular: [],
    showDeclaration: false,
    hasUserEdited: false,
};

// Placeholder data shown before user starts editing - includes ALL sections for comprehensive preview
const PLACEHOLDER_DATA: ResumeData = {
    personalInfo: {
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/johndoe',
        linkedinUsername: '@johndoe',
        github: 'github.com/johndoe',
        githubUsername: '@johndoe',
        location: 'San Francisco, CA',
        title: 'Senior Software Engineer',
        website: 'johndoe.dev',
        leetcode: 'leetcode.com/johndoe',
        leetcodeRating: '1850',
        codeforces: 'codeforces.com/profile/johndoe',
        codeforcesRating: '1600',
    },
    summary: 'Results-driven software engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Passionate about clean code and mentoring junior developers.',
    education: [
        {
            id: 'placeholder-edu-1',
            institution: 'Stanford University',
            degree: 'Master of Science',
            field: 'Computer Science',
            startDate: '2018-09',
            endDate: '2020',
            cgpa: '3.9/4.0',
        },
        {
            id: 'placeholder-edu-2',
            institution: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2014-09',
            endDate: '2018',
            cgpa: '3.7/4.0',
        }
    ],
    vocationalCertifications: [
        {
            id: 'placeholder-cert-1',
            name: 'AWS Solutions Architect Professional',
            provider: 'Amazon Web Services',
            date: '2023-06',
            description: '• Mastered AWS architecture design patterns\n• Learned cloud security best practices',
        },
        {
            id: 'placeholder-cert-2',
            name: 'Full Stack Web Development',
            provider: 'Udemy',
            date: '2022-01',
            description: '• Built 10+ projects using MERN stack',
        }
    ],
    skills: ['JavaScript', 'TypeScript', 'Python', 'Go', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
    skillsData: {
        programmingLanguages: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Java'],
        webTechnologies: ['React', 'Next.js', 'Node.js', 'Express', 'GraphQL'],
        databases: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB'],
        tools: ['Git', 'Docker', 'Kubernetes', 'AWS', 'Terraform'],
        languages: ['English (Native)', 'Spanish (Conversational)'],
    },
    coursework: ['Data Structures & Algorithms', 'Machine Learning', 'Distributed Systems', 'Database Design', 'Cloud Computing'],
    experience: [
        {
            id: 'placeholder-exp-1',
            company: 'Google',
            role: 'Senior Software Engineer',
            startDate: '2022-01',
            endDate: '',
            location: 'Mountain View, CA',
            description: '• Led development of microservices handling 10M+ daily requests\n• Mentored 5 junior engineers and conducted code reviews\n• Reduced API latency by 40% through optimization',
        },
        {
            id: 'placeholder-exp-2',
            company: 'Meta',
            role: 'Software Engineer',
            startDate: '2020-06',
            endDate: '2021-12',
            location: 'Menlo Park, CA',
            description: '• Built React components for News Feed used by 2B+ users\n• Implemented A/B testing framework for feature rollouts',
        }
    ],
    projects: [
        {
            id: 'placeholder-proj-1',
            name: 'E-Commerce Platform',
            description: '• Built full-stack e-commerce platform with payment integration\n• Implemented real-time inventory management\n• Deployed on AWS with auto-scaling',
            techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
            link: 'https://demo-ecommerce.com',
            github: 'https://github.com/johndoe/ecommerce',
        },
        {
            id: 'placeholder-proj-2',
            name: 'AI Chat Assistant',
            description: '• Developed conversational AI using GPT-4 API\n• Built custom fine-tuning pipeline',
            techStack: ['Python', 'FastAPI', 'OpenAI', 'React'],
            github: 'https://github.com/johndoe/ai-chat',
        }
    ],
    achievements: [
        {
            id: 'placeholder-ach-1',
            title: '1st Place - Google Hackathon 2023',
            organization: 'Google',
            date: '2023-09',
            description: 'Built an AI-powered accessibility tool for visually impaired users',
        },
        {
            id: 'placeholder-ach-2',
            title: 'Best Paper Award',
            organization: 'IEEE Conference',
            date: '2022-05',
            description: 'Research paper on distributed systems optimization',
        }
    ],
    extracurricular: [
        {
            id: 'placeholder-ext-1',
            organization: 'Code for America',
            role: 'Volunteer Developer',
            startDate: '2021-01',
            isCurrent: true,
            description: 'Building civic tech solutions for local communities',
        },
        {
            id: 'placeholder-ext-2',
            organization: 'Stanford ACM',
            role: 'Vice President',
            startDate: '2019-09',
            endDate: '2020-05',
            description: 'Organized weekly coding workshops and tech talks',
        }
    ],
    showDeclaration: true,
    hasUserEdited: false,
    enabledSections: {
        summary: true,
        education: true,
        experience: true,
        projects: true,
        skills: true,
        achievements: true,
        extracurricular: true,
        vocationalCertifications: true,
        coursework: true,
        declaration: true,
    },
};

interface EditorContextType {
    // Resume data
    data: ResumeData;
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;

    // Section visibility
    enabledSections: SectionVisibility;
    setEnabledSections: React.Dispatch<React.SetStateAction<SectionVisibility>>;
    toggleSection: (section: keyof SectionVisibility) => void;

    // Template
    selectedTemplate: TemplateType;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
    showTemplates: boolean;
    setShowTemplates: React.Dispatch<React.SetStateAction<boolean>>;
    templates: typeof TEMPLATES;

    // Actions
    handleReset: () => void;
    handleDownloadPDF: () => Promise<void>;
    handleDownloadLatex: () => void;
    exportingPDF: boolean;

    // Preview
    previewScale: number;
    mobileView: 'edit' | 'preview';
    setMobileView: React.Dispatch<React.SetStateAction<'edit' | 'preview'>>;
    containerRef: React.RefObject<HTMLDivElement | null>;

    // PDF Warning
    showPdfWarning: boolean;
    setShowPdfWarning: React.Dispatch<React.SetStateAction<boolean>>;
    emptySectionsWarning: string[];
    confirmPdfDownload: () => Promise<void>;

    // Placeholder
    getPreviewData: () => ResumeData;
    hasUserEdited: boolean;
    markAsEdited: () => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
};

// Optional hook that returns null if not in editor context (for Navbar)
export const useEditorOptional = () => {
    return useContext(EditorContext);
};

interface EditorProviderProps {
    children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
    const [searchParams] = useSearchParams();
    const initialTemplate = (searchParams.get('template') as TemplateType) || 'tech';

    const [data, setData] = useState<ResumeData>(() => {
        const saved = localStorage.getItem('resumeData');
        if (saved) {
            const parsed = JSON.parse(saved);
            return { ...parsed, hasUserEdited: parsed.hasUserEdited ?? false };
        }
        return INITIAL_DATA;
    });

    const [enabledSections, setEnabledSections] = useState<SectionVisibility>(() => {
        const saved = localStorage.getItem('enabledSections');
        return saved ? JSON.parse(saved) : DEFAULT_ENABLED_SECTIONS;
    });

    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(() => {
        const saved = localStorage.getItem('selectedTemplate');
        return (saved as TemplateType) || initialTemplate;
    });

    const [showTemplates, setShowTemplates] = useState(false);
    const [previewScale, setPreviewScale] = useState(0.6);
    const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
    const [exportingPDF, setExportingPDF] = useState(false);
    const [showPdfWarning, setShowPdfWarning] = useState(false);
    const [emptySectionsWarning, setEmptySectionsWarning] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const hasUserEdited = data.hasUserEdited ?? false;

    // Persist data
    useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        localStorage.setItem('enabledSections', JSON.stringify(enabledSections));
    }, [enabledSections]);

    useEffect(() => {
        localStorage.setItem('selectedTemplate', selectedTemplate);
    }, [selectedTemplate]);

    // Handle resize for preview scale
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                const isMobile = window.innerWidth < 1024;
                if (isMobile) {
                    setPreviewScale(1);
                } else {
                    const scale = Math.min((width - 40) / 816, 0.8);
                    setPreviewScale(Math.max(scale, 0.3));
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileView]);

    const markAsEdited = () => {
        if (!data.hasUserEdited) {
            setData(prev => ({ ...prev, hasUserEdited: true }));
        }
    };

    const toggleSection = (section: keyof SectionVisibility) => {
        setEnabledSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleReset = () => {
        setData(INITIAL_DATA);
        setEnabledSections(DEFAULT_ENABLED_SECTIONS);
    };

    // Check which enabled sections are empty
    const getEmptySections = (): string[] => {
        const empty: string[] = [];
        const sectionNames: Record<keyof SectionVisibility, string> = {
            summary: 'Professional Summary',
            education: 'Education',
            experience: 'Experience',
            projects: 'Projects',
            skills: 'Skills',
            achievements: 'Achievements',
            extracurricular: 'Extracurricular',
            vocationalCertifications: 'Certifications',
            coursework: 'Coursework',
            declaration: 'Declaration',
        };

        if (enabledSections.summary && !data.summary?.trim()) {
            empty.push(sectionNames.summary);
        }
        if (enabledSections.education && data.education.length === 0) {
            empty.push(sectionNames.education);
        }
        if (enabledSections.experience && data.experience.length === 0) {
            empty.push(sectionNames.experience);
        }
        if (enabledSections.projects && (!data.projects || data.projects.length === 0)) {
            empty.push(sectionNames.projects);
        }
        if (enabledSections.skills && data.skills.length === 0) {
            empty.push(sectionNames.skills);
        }
        if (enabledSections.achievements && (!data.achievements || data.achievements.length === 0)) {
            empty.push(sectionNames.achievements);
        }
        if (enabledSections.extracurricular && (!data.extracurricular || data.extracurricular.length === 0)) {
            empty.push(sectionNames.extracurricular);
        }
        if (enabledSections.vocationalCertifications && (!data.vocationalCertifications || data.vocationalCertifications.length === 0)) {
            empty.push(sectionNames.vocationalCertifications);
        }
        if (enabledSections.coursework && (!data.coursework || data.coursework.length === 0)) {
            empty.push(sectionNames.coursework);
        }

        return empty;
    };

    const handleDownloadPDF = async () => {
        const empty = getEmptySections();
        if (empty.length > 0) {
            setEmptySectionsWarning(empty);
            setShowPdfWarning(true);
            return;
        }
        await performPdfExport();
    };

    const confirmPdfDownload = async () => {
        setShowPdfWarning(false);
        await performPdfExport();
    };

    const formatFilename = (type: 'Pdf' | 'Latex') => {
        const name = (data.personalInfo.fullName || 'User').replace(/\s+/g, '_');
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}_${String(now.getMonth() + 1).padStart(2, '0')}_${now.getFullYear()}`;
        return `${name}_FreeMiumResume_CV_${dateStr}_${type}`;
    };

    const performPdfExport = async () => {
        const resumeElement = document.querySelector('.resume-template-wrapper') as HTMLElement;
        if (!resumeElement) {
            alert('Resume preview not found');
            return;
        }
        setExportingPDF(true);
        try {
            const filename = formatFilename('Pdf');
            const result = await exportToPDF(data, resumeElement, filename);
            if (result.method === 'browser') {
                console.log('Used browser print fallback');
            }
        } catch (error) {
            console.error('PDF export failed:', error);
            alert('Failed to export PDF. Please check your internet connection and try again.');
        } finally {
            setExportingPDF(false);
        }
    };

    // Get data for preview (placeholder if not edited)
    const getPreviewData = (): ResumeData => {
        if (!hasUserEdited) {
            return PLACEHOLDER_DATA;
        }
        return data;
    };

    const value: EditorContextType = {
        data,
        setData,
        enabledSections,
        setEnabledSections,
        toggleSection,
        selectedTemplate,
        setSelectedTemplate,
        showTemplates,
        setShowTemplates,
        templates: TEMPLATES,
        handleReset,
        handleDownloadPDF,
        exportingPDF,
        previewScale,
        mobileView,
        setMobileView,
        containerRef,
        showPdfWarning,
        setShowPdfWarning,
        emptySectionsWarning,
        confirmPdfDownload,
        getPreviewData,
        hasUserEdited,
        markAsEdited,
        handleDownloadLatex: () => {
            const name = (data.personalInfo.fullName || 'User').replace(/\s+/g, '_');
            const now = new Date();
            const dateStr = `${String(now.getDate()).padStart(2, '0')}_${String(now.getMonth() + 1).padStart(2, '0')}_${now.getFullYear()}`;
            const filename = `${name}_FreeMiumResume_CV_${dateStr}_Latex`;
            downloadLatex(data, filename);
        },
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};

export { INITIAL_DATA, PLACEHOLDER_DATA };
