import { Routes, Route, useParams } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { EditorPage } from './pages/EditorPage';
import { Navbar } from './components/Navbar';
import { EditorProvider } from './contexts/EditorContext';
import { TemplateType } from './lib/template-configs';

// Wrapper component for Editor route that provides context
const EditorWithProvider = ({ template }: { template?: TemplateType }) => (
  <EditorProvider>
    <Navbar />
    <EditorPage lockedTemplate={template} />
  </EditorProvider>
);

// Template-specific editor wrapper
const TemplateEditorWrapper = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const templateMap: Record<string, TemplateType> = {
    'technical': 'tech',
    'professional': 'professional',
    'medical': 'medical',
    'creative': 'creative',
  };
  const template = templateMap[templateId || ''] || 'professional';
  return <EditorWithProvider template={template} />;
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Routes>
        <Route path="/" element={<><Navbar /><LandingPage /></>} />
        <Route path="/templates" element={<><Navbar /><TemplatesPage /></>} />
        <Route path="/editor" element={<EditorWithProvider />} />
        <Route path="/editor/:templateId" element={<TemplateEditorWrapper />} />
      </Routes>
    </div>
  );
}
