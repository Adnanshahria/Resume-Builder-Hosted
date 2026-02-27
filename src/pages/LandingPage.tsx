import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOContent } from '../components/seo/SEOContent';
import { SEOHead, SEO_CONFIG } from '../components/seo/SEOHead';
import {
    ArrowRight, Sparkles, FileText, Download,
    Shield, Zap, CheckCircle, Star, Users, Award, ChevronRight
} from 'lucide-react';

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1800, start = false) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return value;
}

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, inView };
}

/* ─── Stat card with animated counter ─── */
const StatCard = ({ value, suffix, label, icon }: { value: number; suffix: string; label: string; icon: React.ReactNode }) => {
    const { ref, inView } = useInView();
    const count = useCountUp(value, 1800, inView);
    return (
        <div ref={ref} className="flex flex-col items-center gap-1 px-6 py-5 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur border border-white/10 hover:border-teal-400/30 transition-all duration-300 group">
            <div className="text-teal-400 mb-1 group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <span className="text-3xl font-extrabold text-white tracking-tight">
                {count.toLocaleString()}{suffix}
            </span>
            <span className="text-sm text-slate-400 font-medium">{label}</span>
        </div>
    );
};

/* ─── Feature card ─── */
const FeatureCard = ({
    icon, title, description, gradient
}: {
    icon: React.ReactNode; title: string; description: string; gradient: string
}) => (
    <div className="relative group p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900/60 backdrop-blur-sm hover:border-teal-400/50 dark:hover:border-teal-500/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
        {/* hover glow bg */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient} blur-2xl -z-10`} />
        <div className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 ${gradient} bg-opacity-10`}>
            {icon}
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
);

/* ─── Step card for How It Works ─── */
const StepCard = ({ step, title, description }: { step: string; title: string; description: string }) => (
    <div className="flex gap-4 items-start group">
        <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform duration-300">
            {step}
        </div>
        <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

/* ─── Testimonial card ─── */
const TestimonialCard = ({ name, role, text, stars }: { name: string; role: string; text: string; stars: number }) => (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm hover:border-teal-400/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex gap-0.5 mb-3">
            {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-4">"{text}"</p>
        <div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm">{name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
        </div>
    </div>
);

/* ══════════════════════════════════════════════════════
   MAIN LANDING PAGE
══════════════════════════════════════════════════════ */
export const LandingPage: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#07080f] relative overflow-x-hidden">

            <SEOHead
                title={SEO_CONFIG.landing.title}
                description={SEO_CONFIG.landing.description}
                canonicalPath={SEO_CONFIG.landing.path}
            />

            {/* ── Floating gradient orbs (parallax) ── */}
            <div
                className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
                aria-hidden="true"
            >
                {/* Top-left orb */}
                <div
                    className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)',
                        transform: `translateY(${scrollY * 0.12}px)`,
                        transition: 'transform 0.1s linear',
                    }}
                />
                {/* Bottom-right orb */}
                <div
                    className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                        transform: `translateY(${-scrollY * 0.08}px)`,
                        transition: 'transform 0.1s linear',
                    }}
                />
                {/* Center accent */}
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
                    }}
                />
            </div>

            {/* ════════════════════════════════════════
                HERO SECTION
            ════════════════════════════════════════ */}
            <section ref={heroRef} className="relative z-10 container mx-auto px-4 pt-12 pb-10 lg:pt-20 lg:pb-14">
                <div className="max-w-4xl mx-auto text-center space-y-6">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 text-teal-600 dark:text-teal-400 text-xs font-semibold tracking-wide uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI-Powered · 100% Free · No Sign-up Required
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                        Build Your{' '}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 animate-gradient-x">
                                Professional
                            </span>
                        </span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 animate-gradient-x">
                            Resume
                        </span>{' '}
                        <span className="text-slate-700 dark:text-slate-200">in Minutes</span>
                    </h1>

                    {/* Sub-headline */}
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        The free AI-powered resume builder that creates ATS&#8209;optimized resumes for developers, doctors, students, and more — zero cost, zero watermarks.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
                        <Link
                            to="/templates"
                            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                        >
                            Get Started Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                        <a
                            href="#features"
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-700 dark:text-slate-200 font-bold text-base sm:text-lg border border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-lg transition-all duration-200"
                        >
                            See Features
                            <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Trust pills */}
                    <div className="flex flex-wrap justify-center gap-3 pt-1">
                        {[
                            { icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />, label: 'ATS Optimized' },
                            { icon: <Sparkles className="w-3.5 h-3.5 text-violet-500" />, label: 'AI Enhanced' },
                            { icon: <Download className="w-3.5 h-3.5 text-blue-500" />, label: 'Instant PDF' },
                            { icon: <Shield className="w-3.5 h-3.5 text-teal-500" />, label: 'No Data Stored' },
                        ].map(({ icon, label }) => (
                            <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full backdrop-blur">
                                {icon}{label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                STATS BAR
            ════════════════════════════════════════ */}
            <section className="relative z-10 py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-1 shadow-2xl">
                        <div className="rounded-[calc(1.5rem-4px)] px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard value={50000} suffix="+" label="Resumes Built" icon={<FileText className="w-5 h-5" />} />
                            <StatCard value={12} suffix="+" label="Templates" icon={<Award className="w-5 h-5" />} />
                            <StatCard value={98} suffix="%" label="ATS Pass Rate" icon={<CheckCircle className="w-5 h-5" />} />
                            <StatCard value={4800} suffix="+" label="Happy Users" icon={<Users className="w-5 h-5" />} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                FEATURES SECTION
            ════════════════════════════════════════ */}
            <section id="features" className="relative z-10 py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 dark:text-teal-400 mb-3">Why FreeMium?</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                            Everything You Need,{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Nothing You Don't</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
                            Powerful tools designed to get you hired — without paywalls or compromises.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        <FeatureCard
                            icon={<FileText className="w-6 h-6 text-teal-500" />}
                            title="ATS-Friendly Templates"
                            description="All templates are battle-tested against major Applicant Tracking Systems to maximize your interview chances."
                            gradient="bg-gradient-to-br from-teal-500/10 to-emerald-500/5"
                        />
                        <FeatureCard
                            icon={<Sparkles className="w-6 h-6 text-violet-500" />}
                            title="AI Content Enhancement"
                            description="Let our AI write impactful bullet points that highlight your achievements and speak the language of recruiters."
                            gradient="bg-gradient-to-br from-violet-500/10 to-purple-500/5"
                        />
                        <FeatureCard
                            icon={<Download className="w-6 h-6 text-blue-500" />}
                            title="Free PDF Downloads"
                            description="High-quality PDFs with clickable links, no watermarks, no hidden fees — completely free, always."
                            gradient="bg-gradient-to-br from-blue-500/10 to-cyan-500/5"
                        />
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-amber-500" />}
                            title="Real-Time Live Preview"
                            description="Watch your resume update instantly as you type — no refresh needed, no guessing how it looks."
                            gradient="bg-gradient-to-br from-amber-500/10 to-yellow-500/5"
                        />
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-emerald-500" />}
                            title="Privacy First"
                            description="Your data never leaves your browser. We store nothing on our servers — your information stays yours."
                            gradient="bg-gradient-to-br from-emerald-500/10 to-green-500/5"
                        />
                        <FeatureCard
                            icon={<Award className="w-6 h-6 text-rose-500" />}
                            title="Industry-Specific Designs"
                            description="Templates crafted for tech, healthcare, academia, and creative industries — choose yours and stand out."
                            gradient="bg-gradient-to-br from-rose-500/10 to-pink-500/5"
                        />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                HOW IT WORKS
            ════════════════════════════════════════ */}
            <section className="relative z-10 py-16 lg:py-20 bg-gradient-to-b from-transparent via-slate-100/50 dark:via-slate-800/20 to-transparent">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: text */}
                        <div>
                            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 dark:text-teal-400 mb-3">How It Works</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                                From Blank Page to{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Dream Job</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Three simple steps. No account needed. No credit card. Just your next opportunity.
                            </p>
                            <div className="space-y-6">
                                <StepCard step="1" title="Pick Your Template" description="Browse professional, ATS-tested designs across multiple industries and select the one that fits your story." />
                                <StepCard step="2" title="Fill In Your Details" description="Add your experience, skills, and achievements. Our AI assistant helps you craft impactful bullet points." />
                                <StepCard step="3" title="Download Instantly" description="Export a pixel-perfect PDF with clickable links — no watermarks, no sign-up, ready in seconds." />
                            </div>
                            <div className="mt-8">
                                <Link
                                    to="/templates"
                                    className="group inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-3 transition-all duration-200"
                                >
                                    Start Building Now
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                            </div>
                        </div>

                        {/* Right: decorative resume mockup */}
                        <div className="relative hidden md:flex items-center justify-center">
                            <div className="relative w-72 h-96 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
                                {/* Fake resume lines */}
                                <div className="w-3/4 h-4 rounded bg-gradient-to-r from-teal-400 to-blue-500 mb-1" />
                                <div className="w-1/2 h-2.5 rounded bg-slate-200 dark:bg-slate-600 mb-5" />
                                <div className="w-full h-0.5 bg-slate-100 dark:bg-slate-700 mb-4" />
                                {[85, 65, 75, 55, 80].map((w, i) => (
                                    <div key={i} className={`h-2 rounded mb-2 bg-slate-100 dark:bg-slate-700`} style={{ width: `${w}%` }} />
                                ))}
                                <div className="w-1/3 h-3 rounded bg-teal-400/60 mt-5 mb-3" />
                                {[70, 90, 60].map((w, i) => (
                                    <div key={i} className={`h-2 rounded mb-2 bg-slate-100 dark:bg-slate-700`} style={{ width: `${w}%` }} />
                                ))}
                                <div className="w-1/3 h-3 rounded bg-teal-400/60 mt-5 mb-3" />
                                {[75, 55, 65, 80].map((w, i) => (
                                    <div key={i} className={`h-2 rounded mb-2 bg-slate-100 dark:bg-slate-700`} style={{ width: `${w}%` }} />
                                ))}
                            </div>

                            {/* Floating badge: ATS */}
                            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/40 flex items-center gap-1.5 animate-bounce-slow">
                                <CheckCircle className="w-3.5 h-3.5" /> ATS Passed
                            </div>
                            {/* Floating badge: AI */}
                            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-violet-500/40 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" /> AI Enhanced
                            </div>

                            {/* Glow behind card */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-500/20 via-blue-500/15 to-violet-500/10 rounded-3xl blur-3xl scale-110" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                TESTIMONIALS
            ════════════════════════════════════════ */}
            <section className="relative z-10 py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-500 dark:text-teal-400 mb-3">Social Proof</span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Loved by Job Seekers
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        <TestimonialCard
                            name="Sarah K."
                            role="Software Engineer at Google"
                            text="Got three calls in a week after switching to FreeMium Resume. The ATS optimization is real — I passed filters I never did before."
                            stars={5}
                        />
                        <TestimonialCard
                            name="Marcus R."
                            role="Medical Resident"
                            text="The healthcare template was exactly what I needed. Clean, professional, and the AI helped me articulate my clinical rotations perfectly."
                            stars={5}
                        />
                        <TestimonialCard
                            name="Priya M."
                            role="Recent Graduate"
                            text="I was skeptical of a free tool but this is genuinely better than paid alternatives I tried. The live preview alone saves so much time."
                            stars={5}
                        />
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════
                FINAL CTA
            ════════════════════════════════════════ */}
            <section className="relative z-10 py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden">
                        {/* Gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700" />
                        {/* Noise texture overlay */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
                        {/* Inner glow orbs */}
                        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative px-8 py-14 md:py-20 text-center text-white">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold mb-5 backdrop-blur">
                                <Sparkles className="w-3.5 h-3.5" /> Join 50,000+ job seekers
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                                Your Dream Job Starts Here
                            </h2>
                            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                                Build a recruiter-ready, ATS-optimized resume in minutes — free forever, no strings attached.
                            </p>
                            <Link
                                to="/templates"
                                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-teal-700 font-bold text-lg shadow-2xl hover:shadow-white/30 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
                            >
                                Choose Your Template
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                            <p className="text-white/60 text-sm mt-4">No sign-up · No credit card · Always free</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Content (FAQ, detailed features, etc.) */}
            <SEOContent />
        </div>
    );
};

export default LandingPage;
