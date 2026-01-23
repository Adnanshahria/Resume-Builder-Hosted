import React, { useState } from 'react';
import { ResumeData, ExperienceItem, EducationItem } from '../types';
import { Plus, Trash2, Wand2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/Button';
import { PhotoUpload } from './PhotoUpload';
import { generateResumeSummary, enhanceExperienceDescription } from '../services/geminiService';
import { TemplateType, TEMPLATES } from '../lib/templates';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  template?: TemplateType;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange, template = 'professional' }) => {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatingExpId, setGeneratingExpId] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');

  // Get template info for dynamic fields
  const templateInfo = TEMPLATES.find(t => t.id === template);
  const isTechTemplate = ['developer', 'software-engineer', 'technical'].includes(template);
  const isMedicalTemplate = template === 'medical';
  const isCreativeTemplate = template === 'creative';

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string | null) => {
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
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Photo Upload */}
            <div className="flex justify-center pb-4">
              <PhotoUpload
                photo={data.personalInfo.photo || null}
                onPhotoChange={(photo) => updatePersonalInfo('photo', photo)}
                size="lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Template-specific fields */}
              {isTechTemplate && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GitHub (Recommended for tech roles)</label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={data.personalInfo.github || ''}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                      placeholder="github.com/johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Portfolio/Website</label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={data.personalInfo.website || ''}
                      onChange={(e) => updatePersonalInfo('website', e.target.value)}
                      placeholder="johndoe.dev"
                    />
                  </div>
                </>
              )}

              {isMedicalTemplate && (
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Medical Licenses / Registration Numbers</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newLicense = {
                          id: crypto.randomUUID(),
                          type: 'BMDC' as const,
                          number: '',
                          isPrimary: (data.personalInfo.medicalLicenses?.length || 0) === 0,
                        };
                        onChange({
                          ...data,
                          personalInfo: {
                            ...data.personalInfo,
                            medicalLicenses: [...(data.personalInfo.medicalLicenses || []), newLicense],
                          },
                        });
                      }}
                      className="gap-1 text-xs"
                    >
                      <Plus className="w-3 h-3" /> Add License
                    </Button>
                  </div>

                  {/* License List */}
                  {(data.personalInfo.medicalLicenses || []).map((license, idx) => (
                    <div key={license.id} className="flex gap-2 items-start p-3 bg-muted/30 rounded-lg border">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">License Type</label>
                          <select
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                            value={license.type}
                            onChange={(e) => {
                              const updated = [...(data.personalInfo.medicalLicenses || [])];
                              updated[idx] = { ...license, type: e.target.value as any };
                              onChange({
                                ...data,
                                personalInfo: { ...data.personalInfo, medicalLicenses: updated },
                              });
                            }}
                          >
                            <option value="BMDC">BMDC (Bangladesh)</option>
                            <option value="MCI">MCI (India)</option>
                            <option value="GMC">GMC (UK)</option>
                            <option value="USMLE">USMLE (USA)</option>
                            <option value="State Board">State Medical Board</option>
                            <option value="MCPS">MCPS</option>
                            <option value="FCPS">FCPS</option>
                            <option value="Other">Other</option>
                          </select>
                          {/* Custom license name input when Other is selected */}
                          {license.type === 'Other' && (
                            <input
                              type="text"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm mt-2"
                              value={license.customType || ''}
                              onChange={(e) => {
                                const updated = [...(data.personalInfo.medicalLicenses || [])];
                                updated[idx] = { ...license, customType: e.target.value };
                                onChange({
                                  ...data,
                                  personalInfo: { ...data.personalInfo, medicalLicenses: updated },
                                });
                              }}
                              placeholder="Enter license name (e.g., SLMC, AMC)"
                            />
                          )}
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">
                            License Number {idx === 0 && <span className="text-destructive">*</span>}
                          </label>
                          <input
                            type="text"
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                            value={license.number}
                            onChange={(e) => {
                              const updated = [...(data.personalInfo.medicalLicenses || [])];
                              updated[idx] = { ...license, number: e.target.value };
                              onChange({
                                ...data,
                                personalInfo: { ...data.personalInfo, medicalLicenses: updated },
                              });
                            }}
                            placeholder={idx === 0 ? "Primary License # (Required)" : "License # (Optional)"}
                          />
                        </div>
                      </div>
                      {idx > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 h-8 w-8"
                          onClick={() => {
                            const updated = (data.personalInfo.medicalLicenses || []).filter((_, i) => i !== idx);
                            onChange({
                              ...data,
                              personalInfo: { ...data.personalInfo, medicalLicenses: updated },
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {/* Show add prompt if no licenses */}
                  {(!data.personalInfo.medicalLicenses || data.personalInfo.medicalLicenses.length === 0) && (
                    <p className="text-sm text-muted-foreground italic">
                      Click "Add License" to add your medical registration (BMDC, MCI, GMC, etc.)
                    </p>
                  )}
                </div>
              )}

              {isCreativeTemplate && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Portfolio URL</label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={data.personalInfo.website || ''}
                      onChange={(e) => updatePersonalInfo('website', e.target.value)}
                      placeholder="behance.net/johndoe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dribbble / Design Platform</label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={data.personalInfo.dribbble || ''}
                      onChange={(e) => updatePersonalInfo('dribbble', e.target.value)}
                      placeholder="dribbble.com/johndoe"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Template indicator */}
            <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{templateInfo?.icon} {templateInfo?.name} Template</span>
                {' — '} {templateInfo?.description}
              </p>
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
          {data.experience.map((exp) => (
            <div key={exp.id || crypto.randomUUID()} className="border rounded-lg p-4 bg-muted/30">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">{exp.role || 'New Role'} {exp.company ? `at ${exp.company}` : ''}</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleSection(`exp-${exp.id || ''}`)}
                  >
                    {expandedSection === `exp-${exp.id}` ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => exp.id && removeExperience(exp.id)}
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
                      onChange={(e) => exp.id && updateExperience(exp.id, 'role', e.target.value)}
                      placeholder="Product Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exp.company}
                      onChange={(e) => exp.id && updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exp.startDate}
                      onChange={(e) => exp.id && updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="Jan 2022"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exp.endDate}
                      onChange={(e) => exp.id && updateExperience(exp.id, 'endDate', e.target.value)}
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
                        onClick={() => exp.id && handleEnhanceExperience(exp.id)}
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
                      onChange={(e) => exp.id && updateExperience(exp.id, 'description', e.target.value)}
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

      <hr className="border-border" />

      {/* Skills / Specializations */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('skills')}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">4</span>
            {isMedicalTemplate ? 'Specializations' : 'Skills'}
          </h2>
          {expandedSection === 'skills' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>

        {expandedSection === 'skills' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-sm text-muted-foreground">
              {isMedicalTemplate
                ? 'Add your medical specializations (e.g., Internal Medicine, Cardiology)'
                : 'Add your technical skills, separated by comma or press Enter'}
            </p>

            {/* Skill Tags Display */}
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => {
                      const newSkills = data.skills.filter((_, i) => i !== idx);
                      onChange({ ...data, skills: newSkills });
                    }}
                    className="ml-1 text-primary/70 hover:text-destructive transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add Skill Input */}
            <div className="flex gap-2">
              <input
                type="text"
                className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder={isMedicalTemplate
                  ? "Add specialization (e.g., Patient Care, Clinical Diagnosis)"
                  : "Add skill (e.g., JavaScript, React, Node.js)"}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    const input = e.currentTarget;
                    const value = input.value.trim().replace(/,/g, '');
                    if (value && !data.skills.includes(value)) {
                      onChange({ ...data, skills: [...data.skills, value] });
                      input.value = '';
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.querySelector('input[placeholder*="Add skill"], input[placeholder*="Add specialization"]') as HTMLInputElement;
                  if (input && input.value.trim()) {
                    const value = input.value.trim();
                    if (!data.skills.includes(value)) {
                      onChange({ ...data, skills: [...data.skills, value] });
                      input.value = '';
                    }
                  }
                }}
                className="gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>
          </div>
        )}
      </div>

      <hr className="border-border" />

      {/* Education */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggleSection('education')}
          >
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">5</span>
            <h2 className="text-xl font-semibold">{isMedicalTemplate ? 'Medical Education' : 'Education'}</h2>
          </div>
          <Button
            onClick={() => {
              const newEdu = {
                id: crypto.randomUUID(),
                institution: '',
                degree: '',
                field: '',
                graduationYear: '',
              };
              onChange({ ...data, education: [...data.education, newEdu] });
            }}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <Plus className="w-4 h-4" /> Add Education
          </Button>
        </div>

        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id || crypto.randomUUID()} className="border rounded-lg p-4 bg-muted/30">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">{edu.degree || 'New Education'} {edu.institution ? `at ${edu.institution}` : ''}</h3>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleSection(`edu-${edu.id || ''}`)}
                  >
                    {expandedSection === `edu-${edu.id}` ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      const updated = data.education.filter(e => e.id !== edu.id);
                      onChange({ ...data, education: updated });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {expandedSection === `edu-${edu.id}` && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Institution</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = data.education.map(item =>
                          item.id === edu.id ? { ...item, institution: e.target.value } : item
                        );
                        onChange({ ...data, education: updated });
                      }}
                      placeholder="Harvard University"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Degree</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = data.education.map(item =>
                          item.id === edu.id ? { ...item, degree: e.target.value } : item
                        );
                        onChange({ ...data, education: updated });
                      }}
                      placeholder={isMedicalTemplate ? "MBBS, MD" : "Bachelor of Science"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Field of Study</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={edu.field || ''}
                      onChange={(e) => {
                        const updated = data.education.map(item =>
                          item.id === edu.id ? { ...item, field: e.target.value } : item
                        );
                        onChange({ ...data, education: updated });
                      }}
                      placeholder={isMedicalTemplate ? "Medicine, Surgery" : "Computer Science"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Graduation Year</label>
                    <input
                      type="text"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={edu.graduationYear}
                      onChange={(e) => {
                        const updated = data.education.map(item =>
                          item.id === edu.id ? { ...item, graduationYear: e.target.value } : item
                        );
                        onChange({ ...data, education: updated });
                      }}
                      placeholder="2024"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          {data.education.length === 0 && (
            <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
              No education added yet. Click "Add Education" to start.
            </div>
          )}
        </div>
      </div>

      {/* Projects Section - Only for Developer/Tech templates */}
      {(isTechTemplate || isCreativeTemplate) && (
        <>
          <hr className="border-border" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSection('projects')}
              >
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">6</span>
                <h2 className="text-xl font-semibold">Projects</h2>
              </div>
              <Button
                onClick={() => {
                  const newProject = {
                    id: crypto.randomUUID(),
                    name: '',
                    description: '',
                    techStack: [],
                    link: '',
                    github: '',
                  };
                  onChange({ ...data, projects: [...(data.projects || []), newProject] });
                }}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <Plus className="w-4 h-4" /> Add Project
              </Button>
            </div>

            {expandedSection === 'projects' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                {(data.projects || []).map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">{project.name || 'New Project'}</h3>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          const updated = (data.projects || []).filter(p => p.id !== project.id);
                          onChange({ ...data, projects: updated });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Project Name</label>
                        <input
                          type="text"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          value={project.name}
                          onChange={(e) => {
                            const updated = (data.projects || []).map(item =>
                              item.id === project.id ? { ...item, name: e.target.value } : item
                            );
                            onChange({ ...data, projects: updated });
                          }}
                          placeholder="E-commerce Platform"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub URL</label>
                        <input
                          type="text"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          value={project.github || ''}
                          onChange={(e) => {
                            const updated = (data.projects || []).map(item =>
                              item.id === project.id ? { ...item, github: e.target.value } : item
                            );
                            onChange({ ...data, projects: updated });
                          }}
                          placeholder="github.com/user/project"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={project.description}
                          onChange={(e) => {
                            const updated = (data.projects || []).map(item =>
                              item.id === project.id ? { ...item, description: e.target.value } : item
                            );
                            onChange({ ...data, projects: updated });
                          }}
                          placeholder="Built a full-stack e-commerce platform with React, Node.js, and PostgreSQL..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tech Stack (comma-separated)</label>
                        <input
                          type="text"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          value={(project.techStack || []).join(', ')}
                          onChange={(e) => {
                            const updated = (data.projects || []).map(item =>
                              item.id === project.id ? { ...item, techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) } : item
                            );
                            onChange({ ...data, projects: updated });
                          }}
                          placeholder="React, Node.js, PostgreSQL"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Live Demo URL</label>
                        <input
                          type="text"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          value={project.link || ''}
                          onChange={(e) => {
                            const updated = (data.projects || []).map(item =>
                              item.id === project.id ? { ...item, link: e.target.value } : item
                            );
                            onChange({ ...data, projects: updated });
                          }}
                          placeholder="https://myproject.com"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {(!data.projects || data.projects.length === 0) && (
                  <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                    No projects added yet. Click "Add Project" to showcase your work.
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};