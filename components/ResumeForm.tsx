import React, { useState } from 'react';
import { ResumeData, ExperienceItem, EducationItem } from '../types';
import { Plus, Trash2, Wand2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/Button';
import { generateResumeSummary, enhanceExperienceDescription } from '../services/geminiService';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatingExpId, setGeneratingExpId] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const summary = await generateResumeSummary(data);
      onChange({ ...data, summary });
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: crypto.randomUUID(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
    setExpandedSection(`exp-${newExp.id}`);
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(e => e.id !== id)
    });
  };

  const handleEnhanceExperience = async (id: string) => {
    const item = data.experience.find(e => e.id === id);
    if (!item) return;
    
    setGeneratingExpId(id);
    try {
      const enhanced = await enhanceExperienceDescription(item);
      updateExperience(id, 'description', enhanced);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setGeneratingExpId(null);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6 p-6 bg-card text-card-foreground rounded-xl border shadow-sm">
      
      {/* Personal Info */}
      <div className="space-y-4">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => toggleSection('personal')}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">1</span>
            Personal Details
          </h2>
          {expandedSection === 'personal' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
        
        {expandedSection === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={data.personalInfo.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                placeholder="Senior Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={data.personalInfo.location}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                placeholder="New York, NY"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn (Optional)</label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
          </div>
        )}
      </div>

      <hr className="border-border" />

      {/* Summary */}
      <div className="space-y-4">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('summary')}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">2</span>
            Professional Summary
          </h2>
          {expandedSection === 'summary' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>

        {expandedSection === 'summary' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-muted-foreground">
                Write a short professional bio or let AI do it.
              </label>
              <Button 
                type="button" 
                variant="secondary" 
                size="sm" 
                onClick={handleGenerateSummary}
                isLoading={isGeneratingSummary}
                className="gap-2 text-purple-600 dark:text-purple-400"
              >
                <Sparkles className="w-4 h-4" />
                Generate with Gemini
              </Button>
            </div>
            <textarea
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={data.summary}
              onChange={(e) => onChange({ ...data, summary: e.target.value })}
              placeholder="Experienced professional with a track record of..."
            />
          </div>
        )}
      </div>

      <hr className="border-border" />

      {/* Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('experience')}
          >
             <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">3</span>
            <h2 className="text-xl font-semibold">Experience</h2>
          </div>
          <Button onClick={addExperience} size="sm" variant="outline" className="gap-2">
            <Plus className="w-4 h-4" /> Add Role
          </Button>
        </div>

        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="border rounded-lg p-4 bg-muted/30">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">{exp.role || 'New Role'} {exp.company ? `at ${exp.company}` : ''}</h3>
                <div className="flex gap-2">
                   <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleSection(`exp-${exp.id}`)}
                  >
                   {expandedSection === `exp-${exp.id}` ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {expandedSection === `exp-${exp.id}` && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role / Job Title</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      placeholder="Product Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="Jan 2022"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Description (Bullet Points)</label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEnhanceExperience(exp.id)}
                        isLoading={generatingExpId === exp.id}
                        className="h-8 gap-2 text-purple-600 dark:text-purple-400"
                      >
                        <Wand2 className="w-3 h-3" />
                        Enhance with AI
                      </Button>
                    </div>
                    <textarea
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="• Led a team of 5 engineers..."
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          {data.experience.length === 0 && (
            <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
              No experience added yet. Click "Add Role" to start.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};