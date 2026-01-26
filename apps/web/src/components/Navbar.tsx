import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SettingsModal } from './SettingsModal';
import { Sparkles, Settings, Menu, X, ArrowRight, Sun, Moon, RotateCcw, Download } from 'lucide-react';
import { useEditorOptional } from '../contexts/EditorContext';

export const Navbar: React.FC = () => {
    const location = useLocation();
    const isEditorPage = location.pathname === '/editor';

    const [showSettings, setShowSettings] = useState(false);
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

    return (
        <>
            {/* Header with Navigation - Eco-Haat Style Floating Island */}
            <header className="sticky top-4 z-50 px-4 mb-4">
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
                            <Link to="/editor" className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${location.pathname === '/editor' ? 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}>
                                Resume Editor
                            </Link>
                            {/* Hide Features link on editor page */}
                            {!isEditorPage && (
                                <a href="/#features" className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-xl transition-all">
                                    Features
                                </a>
                            )}
                        </nav>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 pr-1">
                            {/* Editor-specific controls */}
                            {isEditorPage && editorContext && (
                                <>
                                    {/* Template Selector */}
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
                            <Link to="/editor" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Editor</Link>
                            {!isEditorPage && (
                                <>
                                    <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Features</a>
                                    <a href="/#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-300 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">FAQ</a>
                                </>
                            )}

                            {/* Mobile: Editor controls */}
                            {isEditorPage && editorContext && (
                                <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 mt-2">
                                    <button
                                        onClick={() => { editorContext.setShowTemplates(!editorContext.showTemplates); setMobileMenuOpen(false); }}
                                        className="flex-1 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-700 flex items-center justify-center gap-1.5"
                                    >
                                        🎨 Template
                                    </button>
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
        </>
    );
};
