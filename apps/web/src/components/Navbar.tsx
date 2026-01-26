import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SettingsModal } from './SettingsModal';
import { Sparkles, Settings, Menu, X, ArrowRight, Sun, Moon, RotateCcw, Download, Pencil, Eye } from 'lucide-react';
import { useEditorOptional } from '../contexts/EditorContext';
import { TEMPLATES } from '../lib/templates';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Check if path starts with /editor to include /editor/technical etc.
    const isEditorPage = location.pathname.startsWith('/editor');
    // Check if we are on a specific template route (locked)
    const isLockedTemplate = location.pathname !== '/editor';

    const [showSettings, setShowSettings] = useState(false);
    const [showLockedModal, setShowLockedModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Global dark mode state
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) return saved === 'true';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', String(darkMode));
    }, [darkMode]);

    // Editor context (only available on /editor)
    const editorContext = useEditorOptional();

    const handleResumeEditorClick = (e: React.MouseEvent) => {
        // If we are NOT on an editor page, we prevent default link/nav behavior and show modal
        if (!isEditorPage) {
            e.preventDefault();
            setShowLockedModal(true);
        }
        // If we ARE on an editor page, the Link does nothing (or refreshes), which is fine.
        // Actually, if we are on editor page, we just stay there.
    };

    const handleTemplateSelect = (templateId: string) => {
        navigate(`/editor/${templateId}`);
        setShowLockedModal(false);
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Header with Navigation - Eco-Haat Style Floating Island */}
            <header className="sticky top-2 z-50 px-4 mb-2">
                <div className="container mx-auto max-w-7xl bg-[#D5E4EC] dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-lg shadow-slate-200/20 dark:shadow-black/20 rounded-2xl p-2.5">
                    <div className="flex items-center justify-between">
                        {/* Left: Logo */}
                        <Link to="/" className="flex items-center gap-2 flex-shrink-0 pl-2">
                            <img src="/icon-512.png" alt="FreeMium Resume" className="w-10 h-10" />
                            <div className="hidden sm:block">
                                <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">FreeMium</span>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium pt-1">Resume</p>
                            </div>
                        </Link>

                        {/* Center: Desktop Navigation Links (hide Features on editor) */}
                        <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
                            <Link to="/" className={`px-4 py-2 text-sm font-medium rounded-xl transition-all shadow-sm ${location.pathname === '/' ? 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}>
                                Home
                            </Link>
                            <Link to="/templates" className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${location.pathname === '/templates' ? 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}>
                                Templates
                            </Link>
                            {/* Resume Editor Link - Locked behavior */}
                            <button
                                onClick={handleResumeEditorClick}
                                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${location.pathname.startsWith('/editor') ? 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}
                            >
                                Resume Editor
                            </button>
                            {/* Hide Features link on editor page */}
                            {!isEditorPage && (
                                <a href="/#features" className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-xl transition-all">
                                    Features
                                </a>
                            )}
                        </nav>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 pr-1">
                            {/* Mobile Editor Controls (Visible only on mobile editor) */}
                            {isEditorPage && editorContext && (
                                <div className="flex lg:hidden items-center gap-2 mr-1">
                                    {/* Editor/Preview Toggle (Segment Control style) */}
                                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <button
                                            onClick={() => editorContext.setMobileView('edit')}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${editorContext.mobileView === 'edit'
                                                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                            Editor
                                        </button>
                                        <button
                                            onClick={() => editorContext.setMobileView('preview')}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${editorContext.mobileView === 'preview'
                                                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                                }`}
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            Preview
                                        </button>
                                    </div>

                                    {/* PDF Button */}
                                    <button
                                        onClick={editorContext.handleDownloadPDF}
                                        disabled={editorContext.exportingPDF}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all disabled:opacity-50 shadow-sm font-bold text-xs"
                                        title="Download PDF"
                                    >
                                        <Download className={`w-3.5 h-3.5 ${editorContext.exportingPDF ? 'animate-pulse' : ''}`} />
                                        PDF
                                    </button>
                                </div>
                            )}

                            {/* Editor-specific controls (Desktop) */}
                            {isEditorPage && editorContext && (
                                <>
                                    {/* Template Selector - Only show if NOT on a locked template route */}
                                    {!isLockedTemplate && (
                                        <button
                                            onClick={() => editorContext.setShowTemplates(!editorContext.showTemplates)}
                                            className="hidden sm:flex px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-sm font-medium border border-slate-200 dark:border-slate-700 items-center gap-1.5 shadow-sm"
                                        >
                                            <span className="text-blue-600 dark:text-blue-400">🎨</span>
                                            <span className="hidden md:inline">
                                                {editorContext.templates.find(t => t.id === editorContext.selectedTemplate)?.name || 'Template'}
                                            </span>
                                            <span className="md:hidden">Template</span>
                                            <span className="text-xs text-blue-500">▼</span>
                                        </button>
                                    )}

                                    {/* Reset Button */}
                                    <button
                                        onClick={editorContext.handleReset}
                                        className="hidden sm:flex p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-all shadow-sm bg-white dark:bg-slate-800"
                                        title="Reset"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </button>
                                </>
                            )}

                            {/* Theme Toggle (Global) */}
                            <div className="hidden sm:flex items-center bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <button
                                    onClick={() => setDarkMode(false)}
                                    className={`p-1.5 rounded-lg text-xs font-medium transition-all ${!darkMode
                                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 shadow-sm'
                                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
                                        }`}
                                    title="Light Mode"
                                >
                                    <Sun className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDarkMode(true)}
                                    className={`p-1.5 rounded-lg text-xs font-medium transition-all ${darkMode
                                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
                                        }`}
                                    title="Dark Mode"
                                >
                                    <Moon className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Download Button (Editor only) */}
                            {isEditorPage && editorContext && (
                                <button
                                    onClick={editorContext.handleDownloadPDF}
                                    disabled={editorContext.exportingPDF}
                                    className="hidden sm:flex p-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all disabled:opacity-50 shadow-sm"
                                    title="Download PDF"
                                >
                                    <Download className={`w-5 h-5 ${editorContext.exportingPDF ? 'animate-pulse' : ''}`} />
                                </button>
                            )}

                            {/* 100% Free badge (hide on editor) */}
                            {!isEditorPage && (
                                <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                    100% Free
                                </div>
                            )}

                            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>

                            {/* Settings Button */}
                            <button
                                onClick={() => setShowSettings(true)}
                                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-all shadow-sm bg-white dark:bg-slate-800"
                                title="Settings"
                            >
                                <Settings className="w-5 h-5" />
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 bg-white dark:bg-slate-800"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg overflow-hidden">
                        <nav className="p-4 flex flex-col gap-2">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Home</Link>
                            <Link to="/templates" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Templates</Link>
                            <button onClick={(e) => { handleResumeEditorClick(e); setMobileMenuOpen(false); }} className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left">Editor</button>
                            {!isEditorPage && (
                                <>
                                    <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Features</a>
                                    <a href="/#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">FAQ</a>
                                </>
                            )}

                            {/* Mobile: Editor controls */}
                            {isEditorPage && editorContext && (
                                <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                                    {!isLockedTemplate && (
                                        <button
                                            onClick={() => { editorContext.setShowTemplates(!editorContext.showTemplates); setMobileMenuOpen(false); }}
                                            className="flex-1 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-700 flex items-center justify-center gap-1.5"
                                        >
                                            🎨 Template
                                        </button>
                                    )}
                                    <button
                                        onClick={() => { editorContext.handleReset(); setMobileMenuOpen(false); }}
                                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                        title="Reset"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => { editorContext.handleDownloadPDF(); setMobileMenuOpen(false); }}
                                        disabled={editorContext.exportingPDF}
                                        className="p-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
                                        title="Download"
                                    >
                                        <Download className={`w-5 h-5 ${editorContext.exportingPDF ? 'animate-pulse' : ''}`} />
                                    </button>
                                </div>
                            )}

                            {/* Mobile: Theme Toggle */}
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                                <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
                                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                    <button
                                        onClick={() => setDarkMode(false)}
                                        className={`p-1.5 rounded-md text-xs font-medium transition-all ${!darkMode
                                            ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm'
                                            : 'text-slate-400'
                                            }`}
                                    >
                                        <Sun className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setDarkMode(true)}
                                        className={`p-1.5 rounded-md text-xs font-medium transition-all ${darkMode
                                            ? 'bg-slate-700 text-indigo-400 shadow-sm'
                                            : 'text-slate-400'
                                            }`}
                                    >
                                        <Moon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {!isEditorPage && (
                                <Link
                                    to="/templates"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm font-medium mt-2"
                                >
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

            {/* Locked Template Modal */}
            {showLockedModal && (
                <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowLockedModal(false)}>
                    <div
                        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Select a Template</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose a template to start editing your resume.</p>
                            </div>
                            <button
                                onClick={() => setShowLockedModal(false)}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                            {TEMPLATES.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => handleTemplateSelect(template.id)}
                                    className="group relative flex items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all text-left"
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        {template.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{template.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{template.description}</p>
                                    </div>
                                    <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                            <Link
                                to="/templates"
                                onClick={() => setShowLockedModal(false)}
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                            >
                                View Detailed Previews <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
