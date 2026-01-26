import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead, SEO_CONFIG } from '../components/SEOHead';
import { SettingsModal } from '../components/SettingsModal';
import { ResumeTemplate } from '../components/ResumeTemplate';
import { PLACEHOLDER_DATA } from '../contexts/EditorContext';
import { TEMPLATES, TemplateType } from '../lib/templates';

export const TemplatesPage: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0b] relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[120px] -z-10" />

            <SEOHead
                title={SEO_CONFIG.templates.title}
                description={SEO_CONFIG.templates.description}
                canonicalPath={SEO_CONFIG.templates.path}
            />

            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

            {/* Header */}
            <div className="container mx-auto px-4 py-8">

                <div className="text-center mb-12 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Perfect Template</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Select a template optimized for your profession. Each template is ATS-friendly and designed to highlight what matters most for your field.
                    </p>
                </div>

                {/* Template Grid with CV Previews */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {TEMPLATES.map((template) => (
                        <TemplatePreviewCard key={template.id} templateId={template.id} templateName={template.name} templateDescription={template.description} />
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

interface TemplatePreviewCardProps {
    templateId: TemplateType;
    templateName: string;
    templateDescription: string;
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({ templateId, templateName, templateDescription }) => {
    // Map template ID to route path
    const routeMap: Record<string, string> = {
        'tech': 'technical',
        'professional': 'professional',
        'medical': 'medical',
        'creative': 'creative',
    };
    const routePath = routeMap[templateId] || templateId;

    return (
        <Link
            to={`/editor/${routePath}`}
            className="group block"
        >
            {/* CV Preview Container */}
            {/* CV Preview Container */}
            <div className="relative w-full bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/60 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-teal-900/20 group-hover:-translate-y-1"
                style={{ aspectRatio: '1/1.414' }} // Exact A4 ratio
            >
                {/* Mini Resume Preview */}
                <div className="absolute inset-0 overflow-hidden flex justify-center">
                    <div
                        className="origin-top"
                        style={{
                            transform: 'scale(0.24)',
                            width: '816px',
                            height: '1056px',
                        }}
                    >
                        <ResumeTemplate
                            data={PLACEHOLDER_DATA}
                            template={templateId}
                            scale={1}
                        />
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <span className="text-white text-sm font-bold px-6 py-3 bg-teal-600/90 backdrop-blur-sm rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Use This Template
                        <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>

            {/* Template Name */}
            <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                    {templateName}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {templateDescription}
                </p>
            </div>
        </Link>
    );
};

export default TemplatesPage;
