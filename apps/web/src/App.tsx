import { useState, useRef, useEffect } from 'react';
import { ResumeData } from './types';
import { ResumeForm } from './components/ResumeForm';
import { ResumeTemplate } from './components/ResumeTemplate';
import { TemplateSelector } from './components/TemplateSelector';
import { TemplateType, TEMPLATES } from './lib/templates';
import { Pencil, Eye, RotateCcw, Sun, Moon, Download } from 'lucide-react';
import { Button } from './components/ui/Button';
import { exportToPDF } from './utils/pdfExport';

const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    title: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "AI Integration"],
};

export default function App() {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(() => {
    const saved = localStorage.getItem('selectedTemplate');
    return (saved as TemplateType) || 'tech';
  });

  const [showTemplates, setShowTemplates] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.6);
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [exportingPDF, setExportingPDF] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          // On mobile, use scale 1 since CSS handles responsive width
          setPreviewScale(1);
        } else {
          const scale = Math.min((width - 40) / 816, 0.8);
          setPreviewScale(Math.max(scale, 0.3));
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileView]);


  const handleDownloadPDF = async () => {
    const resumeElement = document.querySelector('.resume-template-wrapper') as HTMLElement;
    if (!resumeElement) {
      alert('Resume preview not found');
      return;
    }
    setExportingPDF(true);
    try {
      await exportToPDF(resumeElement, `${data.personalInfo.fullName || 'resume'}.pdf`);
    } catch (error) {
      alert('Failed to export PDF');
    } finally {
      setExportingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-foreground flex flex-col">
      {/* Minimal Navbar */}
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50 no-print">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Mobile: Single row with logo, title, and all buttons */}
          <div className="lg:hidden flex items-center justify-between h-14 gap-2">
            {/* Logo + Title - with teal border */}
            <div className="flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-lg border-2 border-teal-500 bg-teal-50/30 dark:bg-teal-900/20">
              <img src="/icon-512.png" alt="FR" className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">FreeMium Resume</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">Your AI Resume creator</span>
              </div>
            </div>

            {/* All buttons in one row - removed Edit/Preview and Print for mobile */}
            <div className="flex items-center gap-1">
              {/* Template selector with indicator */}
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 text-slate-700 dark:text-slate-300 hover:from-blue-100 hover:to-teal-100 dark:hover:from-blue-900/50 dark:hover:to-teal-900/50 transition-all text-xs font-medium border border-blue-200 dark:border-blue-700 flex items-center gap-1"
              >
                <span className="text-blue-600 dark:text-blue-400">🎨</span>
                {TEMPLATES.find(t => t.id === selectedTemplate)?.name || 'Template'}
                <span className="text-[10px] text-blue-500">▼</span>
              </button>
              <button
                onClick={() => setData(INITIAL_DATA)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                title="Clear"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              {/* Theme Toggle - 2 Box Style */}
              <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-lg p-0.5">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${!darkMode
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${darkMode
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Same style as mobile */}
          <div className="hidden lg:flex h-14 items-center justify-between">
            {/* Logo + Title - with teal border */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-teal-500 bg-teal-50/30 dark:bg-teal-900/20">
              <img src="/icon-512.png" alt="FR" className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">FreeMium Resume</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Your AI Resume creator</span>
              </div>
            </div>

            {/* All buttons in one row - matching mobile style */}
            <div className="flex items-center gap-1.5">
              {/* Template button with indicator */}
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 text-slate-700 dark:text-slate-300 hover:from-blue-100 hover:to-teal-100 dark:hover:from-blue-900/50 dark:hover:to-teal-900/50 transition-all text-sm font-medium border border-blue-200 dark:border-blue-700 flex items-center gap-1.5"
              >
                <span className="text-blue-600 dark:text-blue-400">🎨</span>
                {TEMPLATES.find(t => t.id === selectedTemplate)?.name || 'Template'}
                <span className="text-xs text-blue-500">▼</span>
              </button>
              <button
                onClick={() => setData(INITIAL_DATA)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                title="Clear"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              {/* Theme Toggle - 2 Box Style */}
              <div className="flex items-center bg-slate-200 dark:bg-slate-700 rounded-lg p-0.5">
                <button
                  onClick={() => setDarkMode(false)}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all ${!darkMode
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all ${darkMode
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleDownloadPDF}
                disabled={exportingPDF}
                className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all disabled:opacity-50"
                title="Download PDF (Visual - not ATS friendly)"
              >
                <Download className={`w-4 h-4 ${exportingPDF ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Template Selector Modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center no-print" onClick={() => setShowTemplates(false)}>
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={(template) => {
                  setSelectedTemplate(template);
                  setShowTemplates(false);
                }}
              />
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex justify-end bg-slate-50 dark:bg-slate-800/50 rounded-b-2xl">
              <Button variant="outline" onClick={() => setShowTemplates(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-0 sm:px-4 md:p-6 lg:p-8 no-print">
        {/* Mobile: Edit/Preview toggle bar - Always visible on mobile */}
        <div className="lg:hidden flex items-center justify-between flex-wrap gap-2 px-3 py-2 mb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-14 z-40 border-b border-slate-200 dark:border-slate-700">
          {/* Edit/Preview Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileView('edit')}
              className={`px-3 py-1.5 text-sm font-medium rounded-l-lg transition-all border-2 ${mobileView === 'edit'
                ? 'bg-teal-500 text-white border-teal-500'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                }`}
            >
              <Pencil className="w-4 h-4 inline mr-1" />
              Editor
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`px-3 py-1.5 text-sm font-medium rounded-r-lg transition-all border-2 border-l-0 ${mobileView === 'preview'
                ? 'bg-teal-500 text-white border-teal-500'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600'
                }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Preview
            </button>
          </div>

          {/* Right side: PDF Download button */}
          <div className="flex items-center gap-2">
            {/* PDF Download button */}
            <button
              onClick={handleDownloadPDF}
              disabled={exportingPDF}
              className="px-2 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all flex items-center gap-1 text-sm font-medium disabled:opacity-50"
              title="Download PDF"
            >
              <Download className={`w-4 h-4 ${exportingPDF ? 'animate-pulse' : ''}`} />
              PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 h-full">

          {/* Left: Editor */}
          <div className={`space-y-4 sm:space-y-6 overflow-y-auto lg:max-h-[calc(100vh-100px)] scrollbar-hide pb-6 lg:pb-20 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'
            }`}>
            {/* Desktop: Editor header */}
            <div className="hidden lg:flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white px-3 py-1.5 rounded-lg border-2 border-teal-500 bg-teal-50/30 dark:bg-teal-900/20">Editor</h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Changes save automatically</p>
            </div>
            <ResumeForm data={data} onChange={setData} template={selectedTemplate} />
          </div>

          {/* Right: Preview */}
          <div className={`relative bg-white dark:bg-slate-800/50 rounded-xl lg:rounded-2xl border-2 border-teal-500 lg:border lg:border-slate-200 dark:lg:border-slate-700 overflow-hidden flex flex-col min-h-[80vh] lg:min-h-0 shadow-lg mx-3 lg:mx-0 ${mobileView === 'edit' ? 'hidden lg:flex' : 'flex'
            }`}>
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-0 sm:p-2 lg:p-6 flex justify-center items-start bg-slate-50 dark:bg-slate-900"
            >
              <ResumeTemplate data={data} template={selectedTemplate} scale={previewScale} />
            </div>
          </div>

        </div>
      </main>

      {/* Print View */}
      <div className="hidden print-only">
        <ResumeTemplate data={data} template={selectedTemplate} scale={1} />
      </div>
    </div>
  );
}