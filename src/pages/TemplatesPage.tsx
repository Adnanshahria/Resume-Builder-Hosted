import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, Zap, Star, Lock, Clock } from 'lucide-react';
import { SEOHead, SEO_CONFIG } from '../components/seo/SEOHead';
import { SettingsModal } from '../components/editor/SettingsModal';
import { ResumeTemplate } from '../components/resume/ResumeTemplate';
import { PLACEHOLDER_DATA } from '../contexts/EditorContext';
import { TEMPLATES, TemplateType } from '../config/templates';

/* ── Templates locked with Coming Soon ── */
const LOCKED_TEMPLATES = new Set<TemplateType>(['professional', 'medical', 'creative']);

/* ── Tag chips per template ── */
const TEMPLATE_TAGS: Record<TemplateType, string[]> = {
    professional: ['Business', 'Finance', 'Management', 'HR'],
    tech: ['Engineering', 'Developer', 'ATS-Optimized', 'SWE'],
    medical: ['Healthcare', 'Doctor', 'Nurse', 'Clinical'],
    creative: ['Designer', 'Artist', 'Portfolio', 'Creative'],
};

/* ── Color accent classes per template ── */
const TEMPLATE_ACCENTS: Record<TemplateType, {
    badge: string;
    glow: string;
    tag: string;
    border: string;
}> = {
    professional: {
        badge: 'from-blue-600 to-indigo-600',
        glow: 'from-blue-500/20 via-indigo-500/10 to-transparent',
        tag: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/40',
        border: 'hover:border-blue-400/60 dark:hover:border-blue-500/50',
    },
    tech: {
        badge: 'from-slate-700 to-slate-900',
        glow: 'from-slate-500/20 via-slate-600/10 to-transparent',
        tag: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60',
        border: 'hover:border-slate-400/60 dark:hover:border-slate-500/50',
    },
    medical: {
        badge: 'from-teal-600 to-emerald-600',
        glow: 'from-teal-500/20 via-emerald-500/10 to-transparent',
        tag: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/40',
        border: 'hover:border-teal-400/60 dark:hover:border-teal-500/50',
    },
    creative: {
        badge: 'from-violet-600 to-purple-600',
        glow: 'from-violet-500/20 via-purple-500/10 to-transparent',
        tag: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200/60 dark:border-violet-800/40',
        border: 'hover:border-violet-400/60 dark:hover:border-violet-500/50',
    },
};

/* ════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════ */
export const TemplatesPage: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#07080f] relative overflow-x-hidden">

            {/* Background orbs */}
            <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
                <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.14) 0%, transparent 70%)' }} />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
            </div>

            <SEOHead
                title={SEO_CONFIG.templates.title}
                description={SEO_CONFIG.templates.description}
                canonicalPath={SEO_CONFIG.templates.path}
            />
            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

            <div className="relative z-10 container mx-auto px-4 py-10 lg:py-14 max-w-7xl">

                {/* ── Hero header ── */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 text-teal-600 dark:text-teal-400 text-xs font-semibold tracking-wide uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        {TEMPLATES.length} Professional Templates · ATS Certified
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                        Choose Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500">
                            Perfect Template
                        </span>
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Every template is ATS-optimized and tailored for your profession — built to get past filters and impress recruiters.
                    </p>

                    {/* Trust row */}
                    <div className="flex flex-wrap justify-center gap-4 pt-1">
                        {[
                            { icon: <CheckCircle className="w-4 h-4 text-emerald-500" />, text: 'ATS Tested' },
                            { icon: <Zap className="w-4 h-4 text-amber-500" />, text: 'Instant Download' },
                            { icon: <Star className="w-4 h-4 text-violet-500" />, text: 'No Watermarks' },
                            { icon: <Sparkles className="w-4 h-4 text-blue-500" />, text: 'AI Enhanced' },
                        ].map(({ icon, text }) => (
                            <span key={text} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full backdrop-blur">
                                {icon}{text}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Template Grid ── */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {TEMPLATES.map((template) => (
                        <TemplatePreviewCard
                            key={template.id}
                            templateId={template.id}
                            templateName={template.name}
                            templateDescription={template.description}
                            templateIcon={template.icon}
                            tags={TEMPLATE_TAGS[template.id]}
                            accent={TEMPLATE_ACCENTS[template.id]}
                            locked={LOCKED_TEMPLATES.has(template.id)}
                        />
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="mt-16 relative">
                    {/* gradient separator */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm shadow-sm">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                Don't see your profession?
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Start from a blank canvas and build something completely your own.
                            </p>
                        </div>
                        <Link
                            to="/editor"
                            className="group shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
                        >
                            Start with Blank Template
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ════════════════════════════════════════════════
   TEMPLATE CARD
════════════════════════════════════════════════ */
interface TemplatePreviewCardProps {
    templateId: TemplateType;
    templateName: string;
    templateDescription: string;
    templateIcon: string;
    tags: string[];
    accent: { badge: string; glow: string; tag: string; border: string };
    locked: boolean;
}

const RESUME_W = 816;
const RESUME_H = 1056;

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({
    templateId, templateName, templateDescription, templateIcon,
    tags, accent, locked
}) => {
    const routeMap: Record<string, string> = {
        tech: 'technical', professional: 'professional',
        medical: 'medical', creative: 'creative',
    };
    const routePath = routeMap[templateId] || templateId;

    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.37);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            setScale(entry.contentRect.width / RESUME_W);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const previewH = Math.round(RESUME_H * scale);

    /* ── Card inner content (shared between locked & unlocked) ── */
    const cardContent = (
        <>
            {/* ── Preview area ── */}
            <div
                ref={containerRef}
                className="relative w-full bg-slate-100 dark:bg-slate-800/60 overflow-hidden"
                style={{ height: previewH }}
            >
                {/* Bottom glow */}
                <div className={`absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t ${accent.glow} z-10`} />

                {/* Scaled resume */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: RESUME_W,
                        height: RESUME_H,
                        transformOrigin: 'top left',
                        transform: `scale(${scale})`,
                        filter: locked ? 'blur(2px) grayscale(0.4)' : 'none',
                    }}
                >
                    <ResumeTemplate
                        data={PLACEHOLDER_DATA}
                        template={templateId}
                        scale={1}
                    />
                </div>

                {/* Icon badge */}
                <div className={`absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r ${accent.badge} text-white text-xs font-bold shadow-lg`}>
                    <span>{templateIcon}</span>
                    <span>{templateName}</span>
                </div>

                {locked ? (
                    /* ── Coming Soon overlay (always visible) ── */
                    <div className="absolute inset-0 z-30 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-amber-400" />
                        </div>
                        <div className="text-center">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-bold">
                                <Clock className="w-3.5 h-3.5" />
                                Coming Soon
                            </span>
                        </div>
                    </div>
                ) : (
                    /* ── Hover overlay (unlocked only) ── */
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                        <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Use This Template
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                )}
            </div>

            {/* ── Info area ── */}
            <div className={`p-4 flex flex-col gap-2.5 flex-1 ${locked ? 'opacity-50' : ''}`}>
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200 capitalize">
                        {templateName.toLowerCase() === 'technical' ? 'Technical' : templateName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {templateDescription}
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {tags.map(tag => (
                        <span key={tag} className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${accent.tag}`}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-auto pt-1 flex items-center justify-between">
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" /> ATS Ready
                    </span>
                    {locked ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
                            <Lock className="w-3 h-3" /> Locked
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-teal-600 dark:text-teal-400">
                            Select <ArrowRight className="w-3 h-3" />
                        </span>
                    )}
                </div>
            </div>
        </>
    );

    /* Locked → renders as a non-clickable div; Unlocked → renders as Link */
    if (locked) {
        return (
            <div
                className="group flex flex-col rounded-3xl border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900/60 backdrop-blur-sm overflow-hidden cursor-not-allowed"
            >
                {cardContent}
            </div>
        );
    }

    return (
        <Link
            to={`/editor/${routePath}`}
            className={`group flex flex-col rounded-3xl border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 ${accent.border} hover:shadow-2xl hover:-translate-y-1.5`}
        >
            {cardContent}
        </Link>
    );
};

export default TemplatesPage;

