import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SettingsModal } from '../editor/SettingsModal';
import {
    Sparkles, Settings, Menu, X, ArrowRight, Sun, Moon,
    RotateCcw, Download, Pencil, Eye, FileText, Zap
} from 'lucide-react';
import { useEditorOptional } from '../../contexts/EditorContext';
import { TEMPLATES } from '../../config/templates';

/* ─── tiny hook: whether the page is scrolled ─── */
function useScrolled(threshold = 8) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);
    return scrolled;
}

/* ─── Nav link with animated underline indicator ─── */
const NavLink = ({
    to, href, onClick, active, children
}: {
    to?: string; href?: string; onClick?: (e: React.MouseEvent) => void;
    active: boolean; children: React.ReactNode;
}) => {
    const baseClass = `relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group`;
    const activeClass = `text-teal-600 dark:text-teal-400`;
    const inactiveClass = `text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white`;

    const inner = (
        <>
            {children}
            {/* animated underline */}
            <span
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300 ${active ? 'w-4/5 opacity-100' : 'w-0 opacity-0 group-hover:w-3/5 group-hover:opacity-60'}`}
            />
        </>
    );

    if (href) {
        return <a href={href} onClick={onClick} className={`${baseClass} ${active ? activeClass : inactiveClass}`}>{inner}</a>;
    }
    if (to) {
        return <Link to={to} onClick={onClick as any} className={`${baseClass} ${active ? activeClass : inactiveClass}`}>{inner}</Link>;
    }
    return <button onClick={onClick} className={`${baseClass} ${active ? activeClass : inactiveClass}`}>{inner}</button>;
};

export const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const scrolled = useScrolled();

    const isEditorPage = location.pathname.startsWith('/editor');
    const isLockedTemplate = location.pathname !== '/editor';

    const [showSettings, setShowSettings] = useState(false);
    const [showLockedModal, setShowLockedModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    /* ── dark mode ── */
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) return saved === 'true';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', String(darkMode));
    }, [darkMode]);

    /* close mobile menu on route change */
    useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

    const editorContext = useEditorOptional();

    const handleResumeEditorClick = (e: React.MouseEvent) => {
        if (!isEditorPage) {
            e.preventDefault();
            setShowLockedModal(true);
        }
    };

    const handleTemplateSelect = (templateId: string) => {
        navigate(`/editor/${templateId}`);
        setShowLockedModal(false);
        setMobileMenuOpen(false);
    };

    /* ── Theme toggle pill ── */
    const ThemeToggle = ({ compact = false }: { compact?: boolean }) => (
        <div className={`flex items-center gap-0.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 ${compact ? '' : ''}`}>
            <button
                onClick={() => setDarkMode(false)}
                title="Light Mode"
                className={`p-1.5 rounded-lg transition-all duration-200 ${!darkMode
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-amber-500'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
                <Sun className="w-3.5 h-3.5" />
            </button>
            <button
                onClick={() => setDarkMode(true)}
                title="Dark Mode"
                className={`p-1.5 rounded-lg transition-all duration-200 ${darkMode
                    ? 'bg-slate-700 shadow-sm text-indigo-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
                <Moon className="w-3.5 h-3.5" />
            </button>
        </div>
    );

    return (
        <>
            {/* ════════════════════════════════════════
                FLOATING NAVBAR
            ════════════════════════════════════════ */}
            <header className="sticky top-3 z-50 px-3 sm:px-4">
                <div className={`
                    container mx-auto max-w-7xl
                    rounded-2xl px-3 py-2
                    transition-all duration-300
                    ${scrolled
                        ? 'bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-black/8 dark:shadow-black/40 border border-slate-200/80 dark:border-slate-700/70'
                        : 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg shadow-lg shadow-black/5 dark:shadow-black/20 border border-slate-200/60 dark:border-slate-700/50'
                    }
                `}>
                    <div className="flex items-center justify-between gap-2">

                        {/* ── Logo ── */}
                        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group pl-1">
                            <div className="relative">
                                <img
                                    src="/icon-512.png"
                                    alt="FreeMium Resume"
                                    className="w-9 h-9 rounded-xl group-hover:scale-105 transition-transform duration-200"
                                />
                                {/* glow on hover */}
                                <div className="absolute inset-0 rounded-xl bg-teal-400/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
                            </div>
                            <div className="hidden sm:block leading-none">
                                <span className="text-base font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
                                    FreeMium
                                </span>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 tracking-wide uppercase">
                                    Resume
                                </p>
                            </div>
                        </Link>

                        {/* ── Desktop Nav Links ── */}
                        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                            <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
                            <NavLink to="/templates" active={location.pathname === '/templates'}>Templates</NavLink>
                            <NavLink onClick={handleResumeEditorClick} active={isEditorPage}>Resume Editor</NavLink>
                            {!isEditorPage && (
                                <NavLink href="/#features" active={false}>Features</NavLink>
                            )}
                        </nav>

                        {/* ── Right: Actions ── */}
                        <div className="flex items-center gap-1.5 pr-1">

                            {/* Mobile editor controls */}
                            {isEditorPage && editorContext && (
                                <div className="flex lg:hidden items-center gap-1 mr-0.5">
                                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <button
                                            onClick={() => editorContext.setMobileView('edit')}
                                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${editorContext.mobileView === 'edit'
                                                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                                                : 'text-slate-500 dark:text-slate-400'}`}
                                        >
                                            <Pencil className="w-3.5 h-3.5" /><span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => editorContext.setMobileView('preview')}
                                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${editorContext.mobileView === 'preview'
                                                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                                                : 'text-slate-500 dark:text-slate-400'}`}
                                        >
                                            <Eye className="w-3.5 h-3.5" /><span>View</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={editorContext.handleDownloadLatex}
                                        className="flex items-center gap-1 px-2 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold border border-slate-700"
                                        title="LaTeX"
                                    >
                                        <FileText className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={editorContext.handleDownloadPDF}
                                        disabled={editorContext.exportingPDF}
                                        className="flex items-center gap-1 px-2 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold disabled:opacity-50 shadow-lg shadow-emerald-500/30"
                                        title="PDF"
                                    >
                                        <Download className={`w-3.5 h-3.5 ${editorContext.exportingPDF ? 'animate-pulse' : ''}`} />
                                    </button>
                                </div>
                            )}

                            {/* Desktop editor controls */}
                            {isEditorPage && editorContext && (
                                <div className="hidden sm:flex items-center gap-1.5">
                                    {!isLockedTemplate && (
                                        <button
                                            onClick={() => editorContext.setShowTemplates(!editorContext.showTemplates)}
                                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
                                        >
                                            <span>🎨</span>
                                            <span className="hidden md:inline">
                                                {editorContext.templates.find(t => t.id === editorContext.selectedTemplate)?.name || 'Template'}
                                            </span>
                                            <span className="md:hidden">Template</span>
                                            <span className="text-xs text-slate-400">▼</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={editorContext.handleReset}
                                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
                                        title="Reset"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={editorContext.handleDownloadLatex}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 text-sm font-semibold border border-slate-700 shadow-sm transition-all"
                                        title="LaTeX"
                                    >
                                        <FileText className="w-4 h-4" />
                                        <span>LaTeX</span>
                                    </button>
                                    <button
                                        onClick={editorContext.handleDownloadPDF}
                                        disabled={editorContext.exportingPDF}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] text-sm font-semibold disabled:opacity-50 shadow-md shadow-emerald-500/20 transition-all"
                                        title="PDF"
                                    >
                                        <Download className={`w-4 h-4 ${editorContext.exportingPDF ? 'animate-pulse' : ''}`} />
                                        <span>PDF</span>
                                    </button>
                                </div>
                            )}

                            {/* Separator */}
                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-0.5 hidden sm:block" />

                            {/* Theme toggle */}
                            <div className="hidden sm:block">
                                <ThemeToggle />
                            </div>

                            {/* 100% Free badge */}
                            {!isEditorPage && (
                                <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-200/70 dark:border-amber-700/40 shadow-sm">
                                    <Sparkles className="w-3 h-3" />
                                    100% Free
                                </div>
                            )}

                            {/* Separator */}
                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-0.5 hidden sm:block" />

                            {/* Settings */}
                            <button
                                onClick={() => setShowSettings(true)}
                                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-sm"
                                title="Settings"
                            >
                                <Settings className="w-4 h-4" />
                            </button>

                            {/* Get Started CTA (landing only) */}
                            {!isEditorPage && (
                                <Link
                                    to="/templates"
                                    className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 group"
                                >
                                    <Zap className="w-3.5 h-3.5" />
                                    Get Started
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                                </Link>
                            )}

                            {/* Hamburger */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-all"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Mobile Menu Drawer ── */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
                >
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
                        <nav className="p-4 flex flex-col gap-1">
                            {/* Mobile nav links */}
                            {[
                                { label: 'Home', to: '/', active: location.pathname === '/' },
                                { label: 'Templates', to: '/templates', active: location.pathname === '/templates' },
                            ].map(({ label, to, active }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active
                                        ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border border-teal-200/60 dark:border-teal-800/60'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                >
                                    {label}
                                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />}
                                </Link>
                            ))}
                            <button
                                onClick={(e) => { handleResumeEditorClick(e); setMobileMenuOpen(false); }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${isEditorPage
                                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border border-teal-200/60 dark:border-teal-800/60'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                            >
                                Resume Editor
                                {isEditorPage && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />}
                            </button>
                            {!isEditorPage && (
                                <a
                                    href="/#features"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                                >
                                    Features
                                </a>
                            )}

                            {/* Mobile editor controls */}
                            {isEditorPage && editorContext && (
                                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                                    {!isLockedTemplate && (
                                        <button
                                            onClick={() => { editorContext.setShowTemplates(!editorContext.showTemplates); setMobileMenuOpen(false); }}
                                            className="flex-1 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-semibold border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-1.5 transition-all"
                                        >
                                            🎨 Template
                                        </button>
                                    )}
                                    <button
                                        onClick={() => { editorContext.handleReset(); setMobileMenuOpen(false); }}
                                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                                        title="Reset"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => { editorContext.handleDownloadPDF(); setMobileMenuOpen(false); }}
                                        disabled={editorContext.exportingPDF}
                                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold disabled:opacity-50 shadow-md"
                                        title="Download PDF"
                                    >
                                        <Download className={`w-4 h-4 ${editorContext.exportingPDF ? 'animate-pulse' : ''}`} />
                                        PDF
                                    </button>
                                </div>
                            )}

                            {/* Mobile theme toggle + CTA */}
                            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Theme</span>
                                <ThemeToggle compact />
                            </div>

                            {!isEditorPage && (
                                <Link
                                    to="/templates"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm font-bold mt-2 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all"
                                >
                                    <Zap className="w-4 h-4" />
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

            {/* ── Template picker modal (locked nav) ── */}
            {showLockedModal && (
                <div
                    className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setShowLockedModal(false)}
                >
                    <div
                        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/60 dark:to-slate-900">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Select a Template</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Choose a template to start editing your resume.</p>
                            </div>
                            <button
                                onClick={() => setShowLockedModal(false)}
                                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Template grid */}
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto">
                            {TEMPLATES.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => handleTemplateSelect(template.id)}
                                    className="group relative flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500 bg-slate-50/80 dark:bg-slate-800/50 hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-all text-left hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                        {template.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{template.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{template.description}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                                </button>
                            ))}
                        </div>

                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                            <Link
                                to="/templates"
                                onClick={() => setShowLockedModal(false)}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                            >
                                View Detailed Previews
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
