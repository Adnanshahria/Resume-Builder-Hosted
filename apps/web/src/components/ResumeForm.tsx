import React, { useState } from 'react';
import { ResumeData, ExperienceItem, VocationalCertificationItem } from '../types';
import { Plus, Trash2, Wand2, Sparkles, ChevronDown, ChevronUp, SpellCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { generateResumeSummary, enhanceExperienceDescription, enhanceProjectDescription, enhanceVocationalCertification, checkSpelling, SpellingResult } from '../services/geminiService';
import { TemplateType, TEMPLATES } from '../lib/templates';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  template?: TemplateType;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange, template = 'professional' }) => {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatingExpId, setGeneratingExpId] = useState<string | null>(null);
  const [generatingProjectId, setGeneratingProjectId] = useState<string | null>(null);
  const [generatingVocationalId, setGeneratingVocationalId] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('personal');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set()); // Track expanded individual items
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [isCheckingSpelling, setIsCheckingSpelling] = useState(false);
  const [spellingResult, setSpellingResult] = useState<SpellingResult | null>(null);

  // Get template info for dynamic fields
  const templateInfo = TEMPLATES.find(t => t.id === template);
  const isTechTemplate = ['tech', 'developer', 'software-engineer', 'technical'].includes(template);
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

  const handleEnhanceProject = async (id: string) => {
    const project = (data.projects || []).find(p => p.id === id);
    if (!project) return;

    setGeneratingProjectId(id);
    try {
      const enhanced = await enhanceProjectDescription(project);
      const updated = (data.projects || []).map(item =>
        item.id === id ? { ...item, description: enhanced } : item
      );
      onChange({ ...data, projects: updated });
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setGeneratingProjectId(null);
    }
  };

  const handleEnhanceVocational = async (id: string) => {
    const cert = (data.vocationalCertifications || []).find(c => c.id === id);
    if (!cert) return;

    setGeneratingVocationalId(id);
    try {
      const enhanced = await enhanceVocationalCertification(cert);
      const updated = (data.vocationalCertifications || []).map(item =>
        item.id === id ? { ...item, description: enhanced } : item
      );
      onChange({ ...data, vocationalCertifications: updated });
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setGeneratingVocationalId(null);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Toggle individual item expansion (independent of section)
  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleCheckSpelling = async () => {
    setIsCheckingSpelling(true);
    setSpellingResult(null);
    try {
      const result = await checkSpelling(data);
      setSpellingResult(result);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setIsCheckingSpelling(false);
    }
  };

  return (
    <>
      {/* Blur overlay when date picker is open */}
      {datePickerOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 pointer-events-none" />
      )}

      {/* Spelling Check Results Modal */}
      {spellingResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSpellingResult(null)}>
          <div className="bg-card rounded-xl shadow-xl max-w-md w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <SpellCheck className="w-5 h-5 text-primary" />
                Spelling Check Results
              </h3>
              <button onClick={() => setSpellingResult(null)} className="text-muted-foreground hover:text-foreground">×</button>
            </div>

            {spellingResult.hasErrors ? (
              <div className="space-y-3">
                <p className="text-amber-500 text-sm">{spellingResult.message}</p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {spellingResult.errors.map((error, idx) => (
                    <div key={idx} className="bg-destructive/10 rounded-lg p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-destructive font-medium line-through">{error.word}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-green-500 font-medium">{error.suggestion}</span>
                      </div>
                      <p className="text-muted-foreground text-xs mt-1">Context: "{error.context}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-green-500">
                <span className="text-2xl">✓</span>
                <p>{spellingResult.message}</p>
              </div>
            )}

            <Button onClick={() => setSpellingResult(null)} className="w-full">Close</Button>
          </div>
        </div>
      )}

      <div className="space-y-6 p-6 bg-card text-card-foreground rounded-xl border shadow-sm relative">

        {/* Spelling Check Button - Top of Form */}
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCheckSpelling}
            disabled={isCheckingSpelling}
            className="gap-2 text-primary border-primary/30 hover:bg-primary/10"
          >
            {isCheckingSpelling ? (
              <>
                <span className="animate-spin">⟳</span> Checking...
              </>
            ) : (
              <>
                <SpellCheck className="w-4 h-4" /> Check Spelling
              </>
            )}
          </Button>
        </div>

        {/* Personal Info */}
        <div className="space-y-4 border-l-2 border-teal-400 dark:border-teal-600 pl-4">
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub (Optional)</label>
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={data.personalInfo.github || ''}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    placeholder="github.com/johndoe"
                  />
                </div>

                {/* Template-specific fields */}
                {isTechTemplate && (
                  <>
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
                    <div className="space-y-2">
                      <label className="text-sm font-medium">LeetCode (Optional)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="flex h-10 w-2/3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={data.personalInfo.leetcode || ''}
                          onChange={(e) => updatePersonalInfo('leetcode', e.target.value)}
                          placeholder="leetcode.com/johndoe"
                        />
                        <input
                          type="text"
                          className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={data.personalInfo.leetcodeRating || ''}
                          onChange={(e) => updatePersonalInfo('leetcodeRating', e.target.value)}
                          placeholder="Rating"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Codeforces (Optional)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="flex h-10 w-2/3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={data.personalInfo.codeforces || ''}
                          onChange={(e) => updatePersonalInfo('codeforces', e.target.value)}
                          placeholder="codeforces.com/profile/johndoe"
                        />
                        <input
                          type="text"
                          className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={data.personalInfo.codeforcesRating || ''}
                          onChange={(e) => updatePersonalInfo('codeforcesRating', e.target.value)}
                          placeholder="Rating"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CodeChef (Optional)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="flex h-10 w-2/3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={data.personalInfo.codechef || ''}
                          onChange={(e) => updatePersonalInfo('codechef', e.target.value)}
                          placeholder="codechef.com/users/johndoe"
                        />
                        <input
                          type="text"
                          className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={data.personalInfo.codechefRating || ''}
                          onChange={(e) => updatePersonalInfo('codechefRating', e.target.value)}
                          placeholder="Rating"
                        />
                      </div>
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

        {/* Education - Section 2 */}
        <div className="space-y-4 border-l-2 border-teal-400 dark:border-teal-600 pl-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('education')}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">2</span>
              {isMedicalTemplate ? 'Medical Education' : 'Education'}
            </h2>
            {expandedSection === 'education' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>

          {expandedSection === 'education' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              {data.education.map((edu) => (
                <div key={edu.id || crypto.randomUUID()} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">{edu.degree || 'New Education'} {edu.institution ? `at ${edu.institution}` : ''}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleItem(`edu-${edu.id || ''}`)}
                      >
                        {expandedItems.has(`edu-${edu.id}`) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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

                  {expandedItems.has(`edu-${edu.id}`) && (
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
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Grade</label>
                        <input
                          type="text"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                          value={edu.cgpa || ''}
                          onChange={(e) => {
                            const updated = data.education.map(item =>
                              item.id === edu.id ? { ...item, cgpa: e.target.value } : item
                            );
                            onChange({ ...data, education: updated });
                          }}
                          placeholder="CGPA 3.9/4, Grade 89%"
                        />
                      </div>
                      {/* Add Another Education Button */}
                      <div className="col-span-1 md:col-span-2 pt-2">
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
                            setExpandedSection(`edu-${newEdu.id}`);
                          }}
                          size="sm"
                          variant="outline"
                          className="gap-2 w-full border-dashed"
                        >
                          <Plus className="w-4 h-4" /> Add Another Education
                        </Button>
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

              {/* Add Education Button - at the bottom */}
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
                  setExpandedSection(`edu-${newEdu.id}`);
                }}
                size="sm"
                variant="outline"
                className="gap-2 w-full border-dashed"
              >
                <Plus className="w-4 h-4" /> Add Education
              </Button>
            </div>
          )}
        </div>

        <hr className="border-border" />

        {/* Experience */}
        <div className="space-y-4 border-l-2 border-teal-400 dark:border-teal-600 pl-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('experience')}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">3</span>
              Experience
            </h2>
            {expandedSection === 'experience' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>

          {expandedSection === 'experience' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              {data.experience.map((exp, index) => (
                <div key={exp.id || crypto.randomUUID()} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">{index + 1}</span>
                      {exp.role || 'New Role'} {exp.company ? `at ${exp.company}` : ''}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleItem(`exp-${exp.id || ''}`)}
                      >
                        {expandedItems.has(`exp-${exp.id}`) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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

                  {expandedItems.has(`exp-${exp.id}`) && (
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
                          type="date"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm relative z-50"
                          value={exp.startDate}
                          onChange={(e) => exp.id && updateExperience(exp.id, 'startDate', e.target.value)}
                          onFocus={() => setDatePickerOpen(true)}
                          onBlur={() => setDatePickerOpen(false)}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">End Date</label>
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                              checked={!exp.endDate}
                              onChange={(e) => {
                                if (exp.id) {
                                  if (e.target.checked) {
                                    // Mark as currently working (clear end date)
                                    updateExperience(exp.id, 'endDate', '');
                                  } else {
                                    // Set to today's date when unchecking
                                    updateExperience(exp.id, 'endDate', new Date().toISOString().split('T')[0]);
                                  }
                                }
                              }}
                            />
                            <span className="text-muted-foreground">Present</span>
                          </label>
                        </div>
                        <input
                          type="date"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm relative z-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          value={exp.endDate}
                          onChange={(e) => exp.id && updateExperience(exp.id, 'endDate', e.target.value)}
                          onFocus={() => setDatePickerOpen(true)}
                          onBlur={() => setDatePickerOpen(false)}
                          disabled={!exp.endDate}
                        />
                        {exp.startDate && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            Duration: {(() => {
                              const start = new Date(exp.startDate);
                              const end = exp.endDate ? new Date(exp.endDate) : new Date();
                              const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                              const years = months / 12;
                              if (years < 1) return `${months} mo${months !== 1 ? 's' : ''}`;
                              return `${years.toFixed(1)} yr${years >= 2 ? 's' : ''}`;
                            })()}
                          </p>
                        )}
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
                      {/* Add Another Role Button */}
                      <div className="col-span-1 md:col-span-2 pt-2">
                        <Button
                          onClick={addExperience}
                          size="sm"
                          variant="outline"
                          className="gap-2 w-full border-dashed"
                        >
                          <Plus className="w-4 h-4" /> Add Another Role
                        </Button>
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

              {/* Add Role Button - at the bottom */}
              <Button
                onClick={addExperience}
                size="sm"
                variant="outline"
                className="gap-2 w-full border-dashed"
              >
                <Plus className="w-4 h-4" /> Add Role
              </Button>
            </div>
          )}
        </div>

        <hr className="border-border" />

        {/* Skills Section - Unified Technical Skills & Coursework */}
        <div className="space-y-4 border-l-2 border-teal-400 dark:border-teal-600 pl-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('skills')}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">5</span>
              {isMedicalTemplate ? 'Specializations' : 'Skills'}
            </h2>
            {expandedSection === 'skills' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>

          {expandedSection === 'skills' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Technical Skills Sub-section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {isMedicalTemplate ? 'Specializations' : 'Technical Skills'}
                </h3>

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
                    id="skill-input"
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
                      const input = document.getElementById('skill-input') as HTMLInputElement;
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

              {/* Coursework Sub-section - Only for tech templates */}
              {isTechTemplate && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Relevant Coursework
                  </h3>

                  {/* Coursework Tags */}
                  <div className="flex flex-wrap gap-2">
                    {(data.coursework || []).map((course, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-sm"
                      >
                        {course}
                        <button
                          type="button"
                          onClick={() => {
                            const newCoursework = (data.coursework || []).filter((_, i) => i !== idx);
                            onChange({ ...data, coursework: newCoursework });
                          }}
                          className="ml-1 text-blue-500/70 hover:text-destructive transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Coursework Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="coursework-input"
                      className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Add coursework (e.g., Data Structures, Machine Learning)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          const input = e.currentTarget;
                          const value = input.value.trim().replace(/,/g, '');
                          if (value && !(data.coursework || []).includes(value)) {
                            onChange({ ...data, coursework: [...(data.coursework || []), value] });
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
                        const input = document.getElementById('coursework-input') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          const value = input.value.trim();
                          if (!(data.coursework || []).includes(value)) {
                            onChange({ ...data, coursework: [...(data.coursework || []), value] });
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
          )}
        </div>

        {/* Projects Section - Only for Developer/Tech templates */}
        {(isTechTemplate || isCreativeTemplate) && (
          <>
            <hr className="border-border" />

            <div className="space-y-4 border-l-2 border-teal-400 dark:border-teal-600 pl-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('projects')}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">6</span>
                  Projects
                </h2>
                {expandedSection === 'projects' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>

              {expandedSection === 'projects' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  {(data.projects || []).map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{project.name || 'New Project'}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleItem(`proj-${project.id || ''}`)}
                          >
                            {expandedItems.has(`proj-${project.id}`) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
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
                      </div>

                      {expandedItems.has(`proj-${project.id}`) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
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
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Description</label>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => project.id && handleEnhanceProject(project.id)}
                                disabled={generatingProjectId === project.id}
                                className="gap-1 text-xs text-primary hover:text-primary"
                              >
                                {generatingProjectId === project.id ? (
                                  <>
                                    <span className="animate-spin">⟳</span> Enhancing...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-3 h-3" /> Enhance with AI
                                  </>
                                )}
                              </Button>
                            </div>
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
                      )}
                    </div>
                  ))}
                  {(!data.projects || data.projects.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                      No projects added yet. Click "Add Project" to showcase your work.
                    </div>
                  )}

                  {/* Add Project Button - at the bottom */}
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
                    className="gap-2 w-full border-dashed"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Vocational Certifications Section - Only for Developer/Tech templates */}
        {isTechTemplate && (
          <>
            <hr className="border-border" />

            <div className="space-y-4 border-l-2 border-amber-400 dark:border-amber-600 pl-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('vocational')}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">7</span>
                  Vocational Certifications
                </h2>
                {expandedSection === 'vocational' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>

              {expandedSection === 'vocational' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  {(data.vocationalCertifications || []).map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{cert.name || 'New Certification'}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleItem(`cert-${cert.id || ''}`)}
                          >
                            {expandedItems.has(`cert-${cert.id}`) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              const updated = (data.vocationalCertifications || []).filter(c => c.id !== cert.id);
                              onChange({ ...data, vocationalCertifications: updated });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {expandedItems.has(`cert-${cert.id}`) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Certificate/Course Name</label>
                            <input
                              type="text"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                              value={cert.name}
                              onChange={(e) => {
                                const updated = (data.vocationalCertifications || []).map(item =>
                                  item.id === cert.id ? { ...item, name: e.target.value } : item
                                );
                                onChange({ ...data, vocationalCertifications: updated });
                              }}
                              placeholder="Web Development Bootcamp"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Provider/Platform</label>
                            <input
                              type="text"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                              value={cert.provider}
                              onChange={(e) => {
                                const updated = (data.vocationalCertifications || []).map(item =>
                                  item.id === cert.id ? { ...item, provider: e.target.value } : item
                                );
                                onChange({ ...data, vocationalCertifications: updated });
                              }}
                              placeholder="Programming Hero, CoderVhai, Udemy"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Completion Date</label>
                            <input
                              type="month"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                              value={cert.date || ''}
                              onChange={(e) => {
                                const updated = (data.vocationalCertifications || []).map(item =>
                                  item.id === cert.id ? { ...item, date: e.target.value } : item
                                );
                                onChange({ ...data, vocationalCertifications: updated });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Certificate URL (optional)</label>
                            <input
                              type="text"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                              value={cert.credentialUrl || ''}
                              onChange={(e) => {
                                const updated = (data.vocationalCertifications || []).map(item =>
                                  item.id === cert.id ? { ...item, credentialUrl: e.target.value } : item
                                );
                                onChange({ ...data, vocationalCertifications: updated });
                              }}
                              placeholder="https://drive.google.com/file/d/..."
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">What You Learned</label>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => cert.id && handleEnhanceVocational(cert.id)}
                                disabled={generatingVocationalId === cert.id}
                                className="gap-1 text-xs text-primary hover:text-primary"
                              >
                                {generatingVocationalId === cert.id ? (
                                  <>
                                    <span className="animate-spin">⟳</span> Enhancing...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-3 h-3" /> Enhance with AI
                                  </>
                                )}
                              </Button>
                            </div>
                            <textarea
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={cert.description || ''}
                              onChange={(e) => {
                                const updated = (data.vocationalCertifications || []).map(item =>
                                  item.id === cert.id ? { ...item, description: e.target.value } : item
                                );
                                onChange({ ...data, vocationalCertifications: updated });
                              }}
                              placeholder="Describe skills and knowledge gained from this course..."
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Certification Button - at the bottom */}
                  <Button
                    onClick={() => {
                      const newCert: VocationalCertificationItem = {
                        id: crypto.randomUUID(),
                        name: '',
                        provider: '',
                        date: '',
                        description: '',
                        credentialUrl: '',
                      };
                      onChange({ ...data, vocationalCertifications: [...(data.vocationalCertifications || []), newCert] });
                    }}
                    size="sm"
                    variant="outline"
                    className="gap-2 w-full border-dashed"
                  >
                    <Plus className="w-4 h-4" /> Add Certification
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        <hr className="border-border" />

        {/* Professional Summary - At the end */}
        <div className="space-y-4 border-l-2 border-teal-400 dark:border-teal-600 pl-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection('summary')}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm">6</span>
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
      </div >
    </>
  );
};