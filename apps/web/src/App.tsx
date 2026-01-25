import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { EditorPage } from './pages/EditorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/editor" element={<EditorPage />} />
    </Routes>
  );
}