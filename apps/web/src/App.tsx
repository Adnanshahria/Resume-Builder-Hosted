import { useState, useRef, useEffect } from 'react';
import { ResumeData } from './types';
import { ResumeForm } from './components/ResumeForm';
import { ResumeTemplate } from './components/ResumeTemplate';
import { TemplateSelector } from './components/TemplateSelector';
import { TemplateType } from './lib/templates';
import { Printer, Palette } from 'lucide-react';
import { Button } from './components/ui/Button';
import { ToggleSwitch } from './components/ui/ToggleSwitch';

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
    return (saved as TemplateType) || 'software-engineer';
  });

  const [showTemplates, setShowTemplates] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.6);
  const [showPhoto, setShowPhoto] = useState(() => {
    const saved = localStorage.getItem('showPhoto');
    return saved !== 'false'; // Default to true
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('showPhoto', String(showPhoto));
  }, [showPhoto]);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  // Handle responsive preview scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // US Letter is 8.5in = 816px. We want some padding.
        const scale = Math.min((width - 40) / 794, 0.8);
        setPreviewScale(Math.max(scale, 0.3));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 no-print">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <img src="/icon-512.png" alt="FreeMium Resume" className="w-8 h-8" />
            <span>FreeMium Resume</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
              className="gap-2"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setData(INITIAL_DATA)}>
              Clear
            </Button>
            <Button onClick={handlePrint} size="sm" className="gap-2">
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Template Selector Modal */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center no-print" onClick={() => setShowTemplates(false)}>
          <div
            className="bg-card rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
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
            <div className="border-t p-4 flex justify-end">
              <Button variant="outline" onClick={() => setShowTemplates(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">

          {/* Left: Editor */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] scrollbar-hide pb-20">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Editor</h2>
              <p className="text-sm text-muted-foreground">Changes save automatically</p>
            </div>
            <ResumeForm data={data} onChange={setData} template={selectedTemplate} />
          </div>

          {/* Right: Preview */}
          <div className="relative bg-muted/30 rounded-xl border border-border overflow-hidden flex flex-col">
            {/* Toggle Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-card/90 backdrop-blur p-3 rounded-lg shadow-sm border border-border">
              <ToggleSwitch
                checked={showPhoto}
                onChange={setShowPhoto}
                label="Photo"
                description={showPhoto ? 'Visible' : 'Hidden'}
              />
              <ToggleSwitch
                checked={!showPhoto}
                onChange={(val) => setShowPhoto(!val)}
                label="ATS Mode"
                description={!showPhoto ? 'Enabled' : 'Disabled'}
              />
            </div>
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto p-8 flex justify-center items-start bg-zinc-100 dark:bg-zinc-900/50"
            >
              <ResumeTemplate data={data} template={selectedTemplate} scale={previewScale} showPhoto={showPhoto} />
            </div>
          </div>

        </div>
      </main>

      {/* Print View (Hidden normally, visible on print) */}
      <div className="hidden print-only">
        <ResumeTemplate data={data} template={selectedTemplate} scale={1} showPhoto={showPhoto} />
      </div>
    </div>
  );
}