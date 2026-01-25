import React from 'react';
import { Link } from 'react-router-dom';
import { SEOContent } from '../components/SEOContent';
import { ArrowRight, Sparkles, FileText, Download, Shield, Zap, CheckCircle } from 'lucide-react';

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16 lg:py-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        100% Free • No Credit Card Required
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                        Build Your Professional Resume <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                            In Minutes, Not Hours
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The free AI-powered resume builder that helps you create ATS-friendly resumes.
                        Choose from professional templates designed for developers, doctors, students, and more.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link
                            to="/templates"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="#features"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-lg border-2 border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all"
                        >
                            Learn More
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            ATS Optimized
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            AI Enhanced
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Instant PDF Download
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white dark:bg-slate-900/50 py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
                        Why Choose FreeMium Resume?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <FeatureCard
                            icon={<FileText className="w-8 h-8 text-teal-500" />}
                            title="ATS-Friendly Templates"
                            description="All templates are tested against major Applicant Tracking Systems to maximize your interview chances."
                        />
                        <FeatureCard
                            icon={<Sparkles className="w-8 h-8 text-purple-500" />}
                            title="AI Content Enhancement"
                            description="Let our AI help you write impactful bullet points that highlight your achievements effectively."
                        />
                        <FeatureCard
                            icon={<Download className="w-8 h-8 text-blue-500" />}
                            title="Free PDF Downloads"
                            description="Download high-quality PDFs with clickable links. No watermarks, no hidden fees, completely free."
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-yellow-500" />}
                            title="Real-Time Preview"
                            description="See your changes instantly as you type. The live preview ensures you always know how your resume looks."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-green-500" />}
                            title="Privacy First"
                            description="Your data stays in your browser. We never store your personal information on our servers."
                        />
                        <FeatureCard
                            icon={<CheckCircle className="w-8 h-8 text-red-500" />}
                            title="Professional Templates"
                            description="Choose from templates designed for tech, healthcare, academia, and creative industries."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16 lg:py-24">
                <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h2>
                    <p className="text-lg text-white/80 mb-8">Join thousands of job seekers who have landed interviews with our resume builder.</p>
                    <Link
                        to="/templates"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-teal-600 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                        Choose Your Template
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* SEO Content (FAQ, detailed features, etc.) */}
            <SEOContent />
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
        <div className="inline-flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
);

export default LandingPage;
