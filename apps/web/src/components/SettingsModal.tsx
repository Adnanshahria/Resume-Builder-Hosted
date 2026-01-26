import React, { useState } from 'react';
import { X, User, Info, FileText, MessageCircle, Settings as SettingsIcon } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TabType = 'account' | 'about' | 'terms';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<TabType>('about');

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-slate-200/60 dark:border-slate-700/60 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <SettingsIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Settings</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                    <TabButton
                        active={activeTab === 'account'}
                        onClick={() => setActiveTab('account')}
                        icon={<User className="w-4 h-4" />}
                        label="Account"
                    />
                    <TabButton
                        active={activeTab === 'about'}
                        onClick={() => setActiveTab('about')}
                        icon={<Info className="w-4 h-4" />}
                        label="About Us"
                    />
                    <TabButton
                        active={activeTab === 'terms'}
                        onClick={() => setActiveTab('terms')}
                        icon={<FileText className="w-4 h-4" />}
                        label="Terms"
                    />
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {activeTab === 'account' && <AccountSection />}
                    {activeTab === 'about' && <AboutSection />}
                    {activeTab === 'terms' && <TermsSection />}
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${active
            ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-500'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
    >
        {icon}
        {label}
    </button>
);

// Account Section (placeholder for now)
const AccountSection = () => (
    <div className="space-y-6">
        <div className="text-center py-8">
            <User className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Account</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Sign in to save your resumes and access them from anywhere.
            </p>
            <div className="space-y-3 max-w-xs mx-auto">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all"
                />
                <button className="w-full px-4 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-colors">
                    Sign In
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Don't have an account? <button className="text-teal-500 hover:underline">Sign Up</button>
                </p>
            </div>
        </div>

        {/* History Section (shown when logged in) */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Resume History</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                Sign in to view your saved resumes.
            </p>
        </div>
    </div>
);

// About Section
const AboutSection = () => (
    <div className="space-y-6">
        {/* Developer Info */}
        <div className="bg-gradient-to-br from-teal-50/50 to-blue-50/50 dark:from-teal-900/10 dark:to-blue-900/10 rounded-2xl p-6 border border-teal-100 dark:border-teal-900/30">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">About the Developer</h3>
            <div className="space-y-3">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
                    <p className="text-slate-900 dark:text-white font-medium">Mohammed Adnan Shahria</p>
                </div>
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Education</p>
                    <p className="text-slate-900 dark:text-white font-medium">Student at DVM, Gazipur Agricultural University</p>
                </div>
            </div>

            {/* WhatsApp Contact */}
            <a
                href="https://wa.me/8801853452264"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
                <MessageCircle className="w-5 h-5" />
                Contact on WhatsApp
            </a>
        </div>

        {/* About FreeMium Resume */}
        <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">About FreeMium Resume</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                FreeMium Resume is a free, AI-powered resume builder designed to help job seekers create professional,
                ATS-friendly resumes quickly and easily. Our mission is to make professional resume creation accessible
                to everyone, regardless of their background or financial situation.
            </p>
        </div>
    </div>
);

// Terms Section
const TermsSection = () => (
    <div className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Terms & Conditions</h3>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
            <section>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">1. Service Description</h4>
                <p>
                    FreeMium Resume provides a free online resume building service. We offer AI-powered content
                    enhancement, professional templates, and PDF export functionality at no cost.
                </p>
            </section>

            <section>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">2. User Data & Privacy</h4>
                <p>
                    Your resume data is stored locally in your browser by default. If you create an account,
                    your data is securely stored in our database. We do not sell or share your personal
                    information with third parties.
                </p>
            </section>

            <section>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">3. AI Content</h4>
                <p>
                    Our AI-powered features are designed to assist you in creating better content. However,
                    you are responsible for reviewing and verifying all AI-generated suggestions before
                    including them in your resume.
                </p>
            </section>

            <section>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">4. Disclaimer</h4>
                <p>
                    While we strive to provide the best possible service, we make no guarantees regarding
                    employment outcomes. The effectiveness of your resume depends on many factors beyond
                    our control.
                </p>
            </section>

            <section>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">5. Contact</h4>
                <p>
                    For questions or concerns, please contact Mohammed Adnan Shahria via WhatsApp at
                    <a href="https://wa.me/8801853452264" className="text-teal-500 hover:underline ml-1">
                        +880 1853 452264
                    </a>.
                </p>
            </section>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
            Last updated: January 25, 2026
        </p>
    </div>
);

export default SettingsModal;
