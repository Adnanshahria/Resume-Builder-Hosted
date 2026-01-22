import React, { useState, useRef, useEffect } from 'react';
import { ResumeData } from './types';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { FileDown, LayoutTemplate, Printer } from 'lucide-react';
import { Button } from './components/ui/Button';

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

  const [previewScale, setPreviewScale] = useState(0.6);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(data));
  }, [data]);

  // Handle responsive preview scaling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // 210mm is approx 794px. We want some padding.
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
            <LayoutTemplate className="w-6 h-6 text-primary" />
            <span>AI Resume Forge</span>
          </div>
          <div className="flex items-center gap-2">
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

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 no-print">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          
          {/* Left: Editor */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] scrollbar-hide pb-20">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Editor</h2>
              <p className="text-sm text-muted-foreground">Changes save automatically</p>
            </div>
            <ResumeForm data={data} onChange={setData} />
          </div>

          {/* Right: Preview */}
          <div className="relative bg-muted/30 rounded-xl border border-border overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
               <div className="bg-black/75 text-white text-xs px-2 py-1 rounded">
                 Preview Mode
               </div>
            </div>
            
            <div 
              ref={containerRef}
              className="flex-1 overflow-y-auto p-8 flex justify-center items-start bg-zinc-100 dark:bg-zinc-900/50"
            >
              <ResumePreview data={data} scale={previewScale} />
            </div>
          </div>

        </div>
      </main>

      {/* Print View (Hidden normally, visible on print) */}
      <div className="hidden print-only">
        <ResumePreview data={data} scale={1} />
      </div>
    </div>
  );
}