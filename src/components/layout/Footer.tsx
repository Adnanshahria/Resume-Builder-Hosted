import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, ArrowUpRight, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-auto border-t border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/80 backdrop-blur-md">
            {/* Subtle top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

            <div className="container mx-auto px-4 py-10 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* ── Brand ── */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <img src="/icon-512.png" alt="FreeMium Resume" className="w-8 h-8 rounded-lg" />
                            <span className="text-base font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
                                FreeMium Resume
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                            The free, AI-powered resume builder that helps you land interviews — no watermarks, no hidden fees.
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-700/30 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                            <Sparkles className="w-3 h-3" />
                            100% Free · Always
                        </div>
                    </div>

                    {/* ── Quick Links ── */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Product
                        </h3>
                        <nav className="flex flex-col gap-2">
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'Templates', to: '/templates' },
                                { label: 'Resume Editor', to: '/editor' },
                                { label: 'Features', href: '/#features' },
                            ].map(({ label, to, href }) =>
                                to ? (
                                    <Link
                                        key={label}
                                        to={to}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors w-fit"
                                    >
                                        {label}
                                    </Link>
                                ) : (
                                    <a
                                        key={label}
                                        href={href}
                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors w-fit"
                                    >
                                        {label}
                                    </a>
                                )
                            )}
                        </nav>
                    </div>

                    {/* ── Trust & Privacy ── */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Trust
                        </h3>
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <Shield className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                                Your data never leaves your browser — stored locally, 100% private.
                            </div>
                            <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <FileText className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                ATS-optimized templates tested against major job platforms.
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-500 dark:text-slate-500 text-center sm:text-left">
                        © {year} FreeMium Resume. Licensed by{' '}
                        <a
                            href="https://orbitsaas.cloud"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                        >
                            Orbit SaaS
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                        . All Rights Reserved.
                    </p>

                    <a
                        href="https://orbitsaas.cloud"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 dark:from-teal-500/15 dark:to-blue-500/15 border border-teal-300/40 dark:border-teal-700/40 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-sm transition-all"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                        Powered by Orbit SaaS
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                </div>
            </div>
        </footer>
    );
};
