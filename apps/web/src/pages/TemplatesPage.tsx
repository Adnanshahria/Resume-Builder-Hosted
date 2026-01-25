import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Stethoscope, GraduationCap, Briefcase, PenTool, Calculator, ArrowLeft, ArrowRight, Settings } from 'lucide-react';
import { SEOHead, SEO_CONFIG } from '../components/SEOHead';
import { SettingsModal } from '../components/SettingsModal';

const PROFESSION_TEMPLATES = [
    {
        id: 'developer',
        name: 'Software Developer',
        icon: Code,
        color: 'from-blue-500 to-cyan-500',
        description: 'For engineers, developers, and tech professionals. Highlights skills, projects, and technical experience.',
        template: 'tech'
    },
    {
        id: 'doctor',
        name: 'Healthcare Professional',
        icon: Stethoscope,
        color: 'from-red-500 to-pink-500',
        description: 'For doctors, nurses, and medical professionals. Emphasizes certifications, clinical experience, and education.',
        template: 'classic'
    },
    {
        id: 'student',
        name: 'Student / Recent Graduate',
        icon: GraduationCap,
        color: 'from-purple-500 to-indigo-500',
        description: 'For students and new grads. Focuses on education, coursework, internships, and extracurriculars.',
        template: 'academic'
    },
    {
        id: 'business',
        name: 'Business & Management',
        icon: Briefcase,
        color: 'from-amber-500 to-orange-500',
        description: 'For managers, executives, and business professionals. Showcases leadership, achievements, and KPIs.',
        template: 'executive'
    },
    {
        id: 'creative',
        name: 'Designer / Creative',
        icon: PenTool,
        color: 'from-pink-500 to-rose-500',
        description: 'For designers, artists, and creatives. Modern layout with portfolio links and visual appeal.',
        template: 'creative'
    },
    {
        id: 'finance',
        name: 'Finance & Accounting',
        icon: Calculator,
        color: 'from-green-500 to-emerald-500',
        description: 'For accountants, analysts, and finance professionals. Clean format highlighting certifications and metrics.',
        template: 'classic'
    }
];

export const TemplatesPage: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
            <SEOHead
                title={SEO_CONFIG.templates.title}
                description={SEO_CONFIG.templates.description}
                canonicalPath={SEO_CONFIG.templates.path}
            />

            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

            {/* Header */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        title="Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Choose Your Resume Template
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Select a template optimized for your profession. Each template is ATS-friendly and designed to highlight what matters most for your field.
                    </p>
                </div>

                {/* Template Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {PROFESSION_TEMPLATES.map((profession) => (
                        <ProfessionCard key={profession.id} profession={profession} />
                    ))}
                </div>

                {/* Custom Option */}
                <div className="text-center mt-12">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">Don't see your profession?</p>
                    <Link
                        to="/editor"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Start with a Blank Template
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

interface ProfessionCardProps {
    profession: typeof PROFESSION_TEMPLATES[0];
}

const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession }) => {
    const Icon = profession.icon;

    return (
        <Link
            to={`/editor?type=${profession.id}&template=${profession.template}`}
            className="group block p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 hover:border-transparent hover:shadow-xl transition-all duration-300"
        >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${profession.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                {profession.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {profession.description}
            </p>
            <div className="flex items-center gap-2 text-teal-500 font-medium text-sm">
                Use This Template
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
};

export default TemplatesPage;
