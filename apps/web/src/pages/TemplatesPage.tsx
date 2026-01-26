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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
            <SEOHead
                title={SEO_CONFIG.templates.title}
                description={SEO_CONFIG.templates.description}
                canonicalPath={SEO_CONFIG.templates.path}
            />

            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

            {/* Header */}
            <div className="container mx-auto px-4 py-8">

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Choose Your Resume Template
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
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
            <div className="relative w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-slate-200 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500 transition-all duration-300 hover:shadow-xl"
                style={{ aspectRatio: '8.5/11' }} // A4 ratio
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white text-sm font-medium px-5 py-2 bg-teal-500 rounded-full flex items-center gap-2">
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
