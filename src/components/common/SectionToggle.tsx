import React from 'react';
import { SectionVisibility } from '../../types';
import { ToggleLeft, ToggleRight } from 'lucide-react';

interface SectionToggleProps {
    enabledSections: SectionVisibility;
    onToggle: (section: keyof SectionVisibility) => void;
    template?: string;
}

const sectionLabels: Record<keyof SectionVisibility, { label: string; icon: string; description: string }> = {
    summary: { label: 'Professional Summary', icon: '📝', description: 'Brief overview of your skills and goals' },
    education: { label: 'Education', icon: '🎓', description: 'Your academic background' },
    experience: { label: 'Work Experience', icon: '💼', description: 'Your employment history' },
    projects: { label: 'Projects', icon: '🚀', description: 'Personal or professional projects' },
    skills: { label: 'Skills', icon: '⚡', description: 'Your technical and soft skills' },
    achievements: { label: 'Achievements', icon: '🏆', description: 'Awards, hackathons, competitions' },
    extracurricular: { label: 'Extracurricular', icon: '🎯', description: 'Clubs, volunteer work, activities' },
    vocationalCertifications: { label: 'Certifications', icon: '📜', description: 'Online courses, professional certs' },
    coursework: { label: 'Coursework', icon: '📚', description: 'Relevant academic courses' },
    declaration: { label: 'Declaration', icon: '✍️', description: 'Signature and declaration' },
};

export const SectionToggle: React.FC<SectionToggleProps> = ({ enabledSections, onToggle, template }) => {
    // Filter sections based on template
    const isTechTemplate = ['tech', 'developer', 'software-engineer'].includes(template || '');

    const sectionsToShow: (keyof SectionVisibility)[] = isTechTemplate
        ? ['summary', 'education', 'vocationalCertifications', 'skills', 'coursework', 'experience', 'projects', 'achievements', 'extracurricular', 'declaration']
        : ['summary', 'education', 'experience', 'skills', 'projects', 'achievements', 'extracurricular', 'declaration'];

    return (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 rounded-xl p-4 border border-blue-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    Select Sections for Your CV
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                    {Object.values(enabledSections).filter(Boolean).length} sections enabled
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sectionsToShow.map((section) => {
                    const { label, icon } = sectionLabels[section];
                    const isEnabled = enabledSections[section];

                    return (
                        <button
                            key={section}
                            onClick={() => onToggle(section)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all text-sm
                                ${isEnabled
                                    ? 'bg-teal-500 text-white shadow-md hover:bg-teal-600'
                                    : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-500'
                                }`}
                        >
                            <span className="text-base">{icon}</span>
                            <span className="font-medium truncate flex-1">{label}</span>
                            {isEnabled ? (
                                <ToggleRight className="w-4 h-4 flex-shrink-0" />
                            ) : (
                                <ToggleLeft className="w-4 h-4 flex-shrink-0 opacity-50" />
                            )}
                        </button>
                    );
                })}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                💡 Disabled sections won't appear in your resume preview or PDF
            </p>
        </div>
    );
};

export default SectionToggle;
