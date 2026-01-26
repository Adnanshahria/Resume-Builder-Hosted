import React from 'react';

export const SEOContent: React.FC = () => {
    return (
        <div className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 py-6 lg:py-8 space-y-6 max-w-5xl">

                {/* Intro Section */}
                <section className="text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                        The Best Free AI Resume Builder for 2026
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        FreeMium Resume is the ultimate <strong>free resume builder</strong> designed to help job seekers create professional, ATS-friendly resumes in minutes. Unlike other tools that hide features behind paywalls, we offer <strong>unlimited PDF downloads</strong>, AI-powered content enhancement, and premium LaTeX templates completely for free. Whether you are a software engineer, student, or creative professional, our tool ensures your CV stands out to recruiters and passes Applicant Tracking Systems (ATS) with ease.
                    </p>
                </section>

                {/* How-to Guide */}
                <section className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">How to Build a Professional Resume in 5 Minutes</h3>
                    <div className="space-y-6">
                        <Step
                            number="1"
                            title="Choose a Template"
                            text="Select from our range of professional templates. Use 'Technical' for engineering roles or 'Creative' for design jobs. All templates are ATS-optimized."
                        />
                        <Step
                            number="2"
                            title="Enter Your Details"
                            text="Fill in your contact info, experience, and education. Use our AI assistant to polish your descriptions and highlight your achievements."
                        />
                        <Step
                            number="3"
                            title="Customize & Download"
                            text="Adjust colors and layout to match your style. Once you're happy, hit the download button to get your print-ready PDF instantly."
                        />
                    </div>
                </section>

                {/* Templates Showcase (Textual) */}
                <section>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Explore Our Professional Resume Templates</h3>
                    <div className="space-y-4 text-slate-600 dark:text-slate-400">
                        <p>
                            <strong>The Technical Template:</strong> Designed specifically for software engineers, developers, and data scientists. It places emphasis on skills (programming languages, frameworks) and project experience, formatted in a clean, single-column layout that recruiters love.
                        </p>
                        <p>
                            <strong>The Creative Template:</strong> Perfect for designers, marketers, and product managers. It features a modern two-column layout that balances visual appeal with readability, allowing you to showcase your portfolio links and creative skills effectively.
                        </p>
                        <p>
                            <strong>The Academic (LaTeX) Template:</strong> Ideal for researchers and students. This clean, dense layout allows you to fit maximum information, publications, and coursework onto a single page without looking cluttered.
                        </p>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="faq">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <Accordion
                            question="Is FreeMium Resume really free?"
                            answer="Yes! FreeMium Resume is 100% free. You can create unlimited resumes, use all AI features, and download PDFs without ever entering credit card details."
                        />
                        <Accordion
                            question="Is my resume ATS friendly?"
                            answer="Absolutely. All our templates are designed with Applicant Tracking Systems in mind. We use standard fonts, proper heading structures, and clean formatting to ensure your resume is readable by automated screening software."
                        />
                        <Accordion
                            question="Can I download my resume as a PDF?"
                            answer="Yes, you can download your resume as a high-quality PDF file that is ready to print or email. We also verify that all links in your PDF are clickable."
                        />
                        <Accordion
                            question="Do you use AI to write my resume?"
                            answer="We provide AI-powered tools to help you enhance your content. You can use our AI to rewrite bullet points, correct grammar, and make your experience sound more professional."
                        />
                        <Accordion
                            question="Is my data secure?"
                            answer="Your privacy is our priority. FreeMium Resume operates locally in your browser. We do not store your personal data or resume content on our servers."
                        />
                    </div>
                </section>

            </div>
        </div>
    );
};



const Step = ({ number, title, text }: { number: string, title: string, text: string }) => (
    <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
            {number}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{title}</h4>
            <p className="text-slate-600 dark:text-slate-400">{text}</p>
        </div>
    </div>
);

const Accordion = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <button
                className="w-full flex justify-between items-center p-4 bg-white dark:bg-slate-900 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-slate-900 dark:text-white">{question}</span>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                    {answer}
                </div>
            )}
        </div>
    );
};
