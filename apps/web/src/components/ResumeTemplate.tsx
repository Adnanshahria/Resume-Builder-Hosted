import React from 'react';
import { ResumeData } from '../types';
import { TemplateType } from '../lib/templates';
import { formatDate } from '../utils/dateFormatter';

interface ResumeTemplateProps {
    data: ResumeData;
    template: TemplateType;
    scale?: number;
}

interface TemplateProps {
    data: ResumeData;
}

// Professional Template - Clean and Classic (ATS-Friendly, no photos)
const ProfessionalTemplate: React.FC<TemplateProps> = ({ data }) => (
    <div className="resume-template resume-template--professional">
        <header className="rt-header rt-header--professional">
            <div className="rt-header-content">
                <div className="rt-header-text">
                    <h1 className="rt-name">{data.personalInfo.fullName || 'Your Name'}</h1>
                    <p className="rt-title">{data.personalInfo.title || 'Professional Title'}</p>
                    <div className="rt-contact">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    </div>
                </div>
            </div>
        </header>

        {data.summary && (
            <section className="rt-section">
                <h2 className="rt-section-title rt-section-title--professional">Professional Summary</h2>
                <p className="rt-summary">{data.summary}</p>
            </section>
        )}

        {data.experience.length > 0 && (
            <section className="rt-section">
                <h2 className="rt-section-title rt-section-title--professional">Experience</h2>
                {data.experience.map((exp, idx) => (
                    <div key={idx} className="rt-experience-item">
                        <div className="rt-exp-header">
                            <h3 className="rt-exp-role">{exp.role}</h3>
                            <span className="rt-exp-dates">{formatDate(exp.startDate)} - {formatDate(exp.endDate) || 'Present'}</span>
                        </div>
                        <p className="rt-exp-company">{exp.company}</p>
                        {exp.description && <p className="rt-exp-description">{exp.description}</p>}
                    </div>
                ))}
            </section>
        )}

        {data.education.length > 0 && (
            <section className="rt-section">
                <h2 className="rt-section-title rt-section-title--professional">Education</h2>
                {data.education.map((edu, idx) => (
                    <div key={idx} className="rt-education-item">
                        <h3 className="rt-edu-degree">{edu.degree}</h3>
                        <p className="rt-edu-institution">{edu.institution}</p>
                        <span className="rt-edu-year">{edu.graduationYear}{edu.cgpa && ` • Grade: ${edu.cgpa}`}</span>
                    </div>
                ))}
            </section>
        )}

        {data.skills.length > 0 && (
            <section className="rt-section">
                <h2 className="rt-section-title rt-section-title--professional">Skills</h2>
                <div className="rt-skills rt-skills--professional">
                    {data.skills.map((skill, idx) => (
                        <span key={idx} className="rt-skill-tag">{skill}</span>
                    ))}
                </div>
            </section>
        )}
    </div>
);

// Tech Template - ATS-Friendly Format (Jake Gutierrez Style)
// Note: This template intentionally doesn't use photos for maximum ATS compatibility
const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
    // Extract username from URL
    const extractUsername = (url: string | undefined): string => {
        if (!url) return '';
        const cleaned = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const parts = cleaned.split('/');
        // Return the last meaningful part as username
        if (parts.length > 1) {
            return '@' + parts[parts.length - 1];
        }
        return '@' + cleaned.replace(/^(www\.)?(github\.com|linkedin\.com\/in)\/?/, '');
    };

    const getFullUrl = (url: string | undefined, type: 'github' | 'linkedin' | 'website'): string => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        if (type === 'github') return `https://github.com/${url.replace(/^@/, '')}`;
        if (type === 'linkedin') return `https://linkedin.com/in/${url.replace(/^@/, '')}`;
        return `https://${url}`;
    };

    return (
        <div className="resume-template resume-template--tech">
            {/* Header - Centered Name and Contact */}
            <header className="rt-header rt-header--tech">
                <h1 className="rt-name rt-name--tech">{data.personalInfo.fullName || 'First Last'}</h1>
                {/* Row 1: Location */}
                {data.personalInfo.location && (
                    <p className="rt-location--tech">{data.personalInfo.location}</p>
                )}
                {/* Row 2: Phone | Email | GitHub | LinkedIn (centered) */}
                <div className="rt-contact rt-contact--tech">
                    {data.personalInfo.phone && (
                        <span>{data.personalInfo.phone}</span>
                    )}
                    {data.personalInfo.email && (
                        <>
                            {data.personalInfo.phone && <span className="rt-separator">|</span>}
                            <a href={`mailto:${data.personalInfo.email}`} className="rt-contact-link--tech">
                                {data.personalInfo.email}
                            </a>
                        </>
                    )}
                    {data.personalInfo.github && (
                        <>
                            {(data.personalInfo.phone || data.personalInfo.email) && <span className="rt-separator">|</span>}
                            <a href={getFullUrl(data.personalInfo.github, 'github')} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                {extractUsername(data.personalInfo.github) || data.personalInfo.github}
                            </a>
                        </>
                    )}
                    {data.personalInfo.linkedin && (
                        <>
                            {(data.personalInfo.phone || data.personalInfo.email || data.personalInfo.github) && <span className="rt-separator">|</span>}
                            <a href={getFullUrl(data.personalInfo.linkedin, 'linkedin')} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#0077B5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                {extractUsername(data.personalInfo.linkedin) || data.personalInfo.linkedin}
                            </a>
                        </>
                    )}
                </div>
                {/* Row 3: Competitive Programming + Portfolio (centered) */}
                {(data.personalInfo.leetcode || data.personalInfo.codeforces || data.personalInfo.codechef || data.personalInfo.website) && (
                    <div className="rt-contact rt-contact--tech">
                        {data.personalInfo.leetcode && (
                            <a href={data.personalInfo.leetcode.startsWith('http') ? data.personalInfo.leetcode : `https://${data.personalInfo.leetcode}`} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                {/* LeetCode Logo - Black & Orange C shape */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                    <path fill="#B3B1B0" d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z" />
                                    <path fill="#E7A41F" d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a5.055 5.055 0 0 0-3.805-1.494c-1.485 0-2.83.512-3.803 1.494L3.482 10.476C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z" />
                                    <path fill="#070706" d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.647-2.672-3.97-4.008-.626-.63-.897-1.418-.897-2.223 0-.77.242-1.561.897-2.246l4.56-4.567a1.06 1.06 0 0 0 .015-1.49 1.046 1.046 0 0 0-1.481-.009L2.183 12.502c-.975.977-1.468 2.254-1.468 3.498 0 1.244.493 2.52 1.468 3.497l3.97 4.015c.975.974 2.25 1.468 3.491 1.468.039 0 .078-.001.117-.003a1.048 1.048 0 0 0-.646-2.163z" />
                                </svg>
                                {extractUsername(data.personalInfo.leetcode)}{data.personalInfo.leetcodeRating ? ` (${data.personalInfo.leetcodeRating})` : ''}
                            </a>
                        )}
                        {data.personalInfo.codeforces && (
                            <>
                                {data.personalInfo.leetcode && <span className="rt-separator">|</span>}
                                <a href={data.personalInfo.codeforces.startsWith('http') ? data.personalInfo.codeforces : `https://${data.personalInfo.codeforces}`} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                    {/* Codeforces Logo - 3 colored bars (blue, yellow, red) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                        <path fill="#F44336" d="M0 10h4.8v10H0z" />
                                        <path fill="#FFC107" d="M6.4 6h4.8v14H6.4z" />
                                        <path fill="#2196F3" d="M12.8 0h4.8v20h-4.8z" />
                                    </svg>
                                    {extractUsername(data.personalInfo.codeforces)}{data.personalInfo.codeforcesRating ? ` (${data.personalInfo.codeforcesRating})` : ''}
                                </a>
                            </>
                        )}
                        {data.personalInfo.codechef && (
                            <>
                                {(data.personalInfo.leetcode || data.personalInfo.codeforces) && <span className="rt-separator">|</span>}
                                <a href={data.personalInfo.codechef.startsWith('http') ? data.personalInfo.codechef : `https://${data.personalInfo.codechef}`} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                    {/* CodeChef Logo - Chef hat */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                        <ellipse cx="12" cy="6" rx="8" ry="4" fill="#F5E6D3" />
                                        <path d="M4 6c0 2.2 3.6 4 8 4s8-1.8 8-4" fill="#E8D4BC" />
                                        <path d="M6 10v8c0 2 2.7 4 6 4s6-2 6-4v-8" fill="#5D4037" />
                                        <circle cx="9" cy="14" r="1" fill="#3E2723" />
                                        <circle cx="15" cy="14" r="1" fill="#3E2723" />
                                        <path d="M10 17c0 0 1 1 2 1s2-1 2-1" stroke="#3E2723" fill="none" strokeWidth="0.5" />
                                    </svg>
                                    {extractUsername(data.personalInfo.codechef)}{data.personalInfo.codechefRating ? ` (${data.personalInfo.codechefRating})` : ''}
                                </a>
                            </>
                        )}
                        {data.personalInfo.website && (
                            <>
                                {(data.personalInfo.leetcode || data.personalInfo.codeforces || data.personalInfo.codechef) && <span className="rt-separator">|</span>}
                                <a href={data.personalInfo.website.startsWith('http') ? data.personalInfo.website : `https://${data.personalInfo.website}`} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer">
                                    Portfolio
                                </a>
                            </>
                        )}
                    </div>
                )}
            </header>

            {/* 1. Education Section */}
            {data.education.length > 0 && (
                <section className="rt-section rt-section--tech">
                    <h2 className="rt-section-title rt-section-title--tech">Education</h2>
                    <div className="rt-section-content">
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="rt-edu-item rt-edu-item--tech">
                                <div className="rt-two-col">
                                    <span className="rt-bold">{edu.institution}</span>
                                    <span className="rt-bold">{edu.startDate ? `${formatDate(edu.startDate)} – ` : ''}{formatDate(edu.graduationYear)}</span>
                                </div>
                                <div className="rt-two-col">
                                    <span className="rt-italic">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                                    <span className="rt-italic">{edu.cgpa ? `CGPA: ${edu.cgpa}` : ''}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 2. Relevant Coursework - Multi-column grid */}
            {data.skills.length > 0 && data.skills.some(s => s.toLowerCase().includes('course') || s.length < 30) && (
                <section className="rt-section rt-section--tech">
                    <h2 className="rt-section-title rt-section-title--tech">Relevant Coursework</h2>
                    <div className="rt-coursework-grid">
                        {data.skills.slice(0, 8).map((skill, idx) => (
                            <span key={idx} className="rt-coursework-item">• {skill}</span>
                        ))}
                    </div>
                </section>
            )}

            {/* 3. Experience Section - Sorted by date (most recent first) */}
            {data.experience.length > 0 && (
                <section className="rt-section rt-section--tech">
                    <h2 className="rt-section-title rt-section-title--tech">Experience</h2>
                    <div className="rt-section-content">
                        {[...data.experience]
                            .sort((a, b) => {
                                // Sort by start date, most recent first
                                const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
                                const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
                                return dateB - dateA;
                            })
                            .map((exp, idx) => {
                                // Calculate duration
                                const getDuration = () => {
                                    if (!exp.startDate) return '';
                                    const start = new Date(exp.startDate);
                                    if (isNaN(start.getTime())) return '';
                                    const end = exp.endDate ? new Date(exp.endDate) : new Date();
                                    if (isNaN(end.getTime())) return '';
                                    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
                                    if (totalMonths < 0) return '';
                                    const years = Math.floor(totalMonths / 12);
                                    const months = totalMonths % 12;
                                    if (years === 0) return `${months} mo${months !== 1 ? 's' : ''}`;
                                    if (months === 0) return `${years} yr${years !== 1 ? 's' : ''}`;
                                    return `${years} yr${years !== 1 ? 's' : ''} ${months} mo`;
                                };
                                return (
                                    <div key={idx} className="rt-exp-item rt-exp-item--tech">
                                        <div className="rt-two-col">
                                            <span className="rt-bold">{exp.company}</span>
                                            <span className="rt-bold">{formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                                        </div>
                                        <div className="rt-two-col">
                                            <span className="rt-italic">{exp.role}</span>
                                            <span className="rt-italic">{getDuration()}</span>
                                        </div>
                                        {exp.description && (
                                            <ul className="rt-bullets--tech">
                                                {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                                    <li key={i}>{line.replace(/^[•\-]\s*/, '')}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )
                            })}
                    </div>
                </section>
            )}

            {/* 4. Projects Section */}
            {data.projects && data.projects.length > 0 && (
                <section className="rt-section rt-section--tech">
                    <h2 className="rt-section-title rt-section-title--tech">Projects</h2>
                    <div className="rt-section-content">
                        {data.projects.map((project, idx) => (
                            <div key={idx} className="rt-project-item rt-project-item--tech">
                                <div className="rt-two-col">
                                    <span>
                                        <strong>{project.name}</strong>
                                        {project.techStack && project.techStack.length > 0 && (
                                            <span className="rt-italic"> | {project.techStack.join(', ')}</span>
                                        )}
                                    </span>
                                    <span className="rt-bold">{project.link ? 'Link' : ''}</span>
                                </div>
                                {project.description && (
                                    <ul className="rt-bullets--tech">
                                        {project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                            <li key={i}>{line.replace(/^[•\-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 5. Technical Skills Section */}
            {data.skills.length > 0 && (
                <section className="rt-section rt-section--tech">
                    <h2 className="rt-section-title rt-section-title--tech">Technical Skills</h2>
                    <div className="rt-skills--tech">
                        <p><strong>Skills:</strong> {data.skills.join(', ')}</p>
                    </div>
                </section>
            )}

            {/* 6. Leadership / Extracurricular Section */}
            {data.certifications && data.certifications.length > 0 && (
                <section className="rt-section rt-section--tech">
                    <h2 className="rt-section-title rt-section-title--tech">Leadership / Extracurricular</h2>
                    <div className="rt-section-content">
                        {data.certifications.map((cert, idx) => (
                            <div key={idx} className="rt-exp-item rt-exp-item--tech">
                                <div className="rt-two-col">
                                    <span className="rt-bold">{cert.name}</span>
                                    <span className="rt-bold">{cert.date ? formatDate(cert.date) : ''}</span>
                                </div>
                                <div className="rt-two-col">
                                    <span className="rt-italic">{cert.issuer || ''}</span>
                                    <span className="rt-italic"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 7. Summary (if provided) - at the end */}
            {data.summary && (
                <section className="rt-section rt-section--tech">
                    <h2 className="rt-section-title rt-section-title--tech">Summary</h2>
                    <p className="rt-summary--tech">{data.summary}</p>
                </section>
            )}
        </div>
    );
};

// Medical Template - Healthcare Professional (ATS-Friendly, no photos)
const MedicalTemplate: React.FC<TemplateProps> = ({ data }) => (
    <div className="resume-template resume-template--medical">
        <header className="rt-header rt-header--medical">
            <div className="rt-header-text">
                <h1 className="rt-name">{data.personalInfo.fullName || 'Dr. Name'}</h1>
                <p className="rt-title">{data.personalInfo.title || 'Medical Professional'}</p>
            </div>
            <div className="rt-contact rt-contact--medical">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
        </header>

        {data.summary && (
            <section className="rt-section rt-section--medical-highlight">
                <h2 className="rt-section-title rt-section-title--medical">Professional Profile</h2>
                <p className="rt-summary">{data.summary}</p>
            </section>
        )}

        <div className="rt-medical-columns">
            <div className="rt-medical-main">
                {data.experience.length > 0 && (
                    <section className="rt-section">
                        <h2 className="rt-section-title rt-section-title--medical">Clinical Experience</h2>
                        {data.experience.map((exp, idx) => (
                            <div key={idx} className="rt-experience-item rt-experience-item--medical">
                                <div className="rt-exp-badge">{exp.startDate?.slice(-4) || ''}</div>
                                <div className="rt-exp-content">
                                    <h3 className="rt-exp-role">{exp.role}</h3>
                                    <p className="rt-exp-company">{exp.company}</p>
                                    <span className="rt-exp-dates">{formatDate(exp.startDate)} - {formatDate(exp.endDate) || 'Present'}</span>
                                    {exp.description && <p className="rt-exp-description">{exp.description}</p>}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>

            <div className="rt-medical-side">
                {data.education.length > 0 && (
                    <section className="rt-section">
                        <h2 className="rt-section-title rt-section-title--medical">Education & Training</h2>
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="rt-education-item rt-education-item--medical">
                                <h3 className="rt-edu-degree">{edu.degree}</h3>
                                <p className="rt-edu-institution">{edu.institution}</p>
                                <span className="rt-edu-year">{edu.graduationYear}{edu.cgpa && ` • Grade: ${edu.cgpa}`}</span>
                            </div>
                        ))}
                    </section>
                )}

                {data.skills.length > 0 && (
                    <section className="rt-section">
                        <h2 className="rt-section-title rt-section-title--medical">Specializations</h2>
                        <div className="rt-skills rt-skills--medical">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="rt-skill-tag rt-skill-tag--medical">{skill}</span>
                            ))}
                        </div>
                    </section>
                )}

                {data.personalInfo.medicalLicenses && data.personalInfo.medicalLicenses.length > 0 && (
                    <section className="rt-section">
                        <h2 className="rt-section-title rt-section-title--medical">Licenses & Registration</h2>
                        <div className="rt-licenses">
                            {data.personalInfo.medicalLicenses.map((license, idx) => (
                                <div key={idx} className="rt-license-item">
                                    <span className="rt-license-type">
                                        {license.type === 'Other' && license.customType
                                            ? license.customType
                                            : license.type}
                                    </span>
                                    <span className="rt-license-number">{license.number}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    </div>
);

// Creative Template - Bold and Expressive (ATS-Friendly, no photos)
const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => (
    <div className="resume-template resume-template--creative">
        <div className="rt-creative-hero">
            <div className="rt-creative-bg-shapes">
                <div className="rt-bg-circle rt-bg-circle--1"></div>
                <div className="rt-bg-circle rt-bg-circle--2"></div>
            </div>
            <div className="rt-creative-profile">
                <h1 className="rt-name rt-name--creative">{data.personalInfo.fullName || 'Creative Name'}</h1>
                <p className="rt-title rt-title--creative">{data.personalInfo.title || 'Creative Professional'}</p>
            </div>
        </div>

        <div className="rt-creative-contact">
            {data.personalInfo.email && <span className="rt-contact-pill">{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span className="rt-contact-pill">{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span className="rt-contact-pill">{data.personalInfo.location}</span>}
        </div>

        {data.summary && (
            <section className="rt-section rt-section--creative">
                <h2 className="rt-section-title rt-section-title--creative">About Me</h2>
                <p className="rt-summary rt-summary--creative">{data.summary}</p>
            </section>
        )}

        {data.skills.length > 0 && (
            <section className="rt-section rt-section--creative">
                <h2 className="rt-section-title rt-section-title--creative">Skills</h2>
                <div className="rt-skills rt-skills--creative">
                    {data.skills.map((skill, idx) => (
                        <span key={idx} className="rt-skill-tag rt-skill-tag--creative">{skill}</span>
                    ))}
                </div>
            </section>
        )}

        {data.experience.length > 0 && (
            <section className="rt-section rt-section--creative">
                <h2 className="rt-section-title rt-section-title--creative">Experience</h2>
                <div className="rt-creative-timeline">
                    {data.experience.map((exp, idx) => (
                        <div key={idx} className="rt-experience-item rt-experience-item--creative">
                            <div className="rt-creative-card">
                                <h3 className="rt-exp-role">{exp.role}</h3>
                                <p className="rt-exp-company">{exp.company}</p>
                                <span className="rt-exp-dates">{formatDate(exp.startDate)} - {formatDate(exp.endDate) || 'Present'}</span>
                                {exp.description && <p className="rt-exp-description">{exp.description}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {data.education.length > 0 && (
            <section className="rt-section rt-section--creative">
                <h2 className="rt-section-title rt-section-title--creative">Education</h2>
                {data.education.map((edu, idx) => (
                    <div key={idx} className="rt-education-item rt-education-item--creative">
                        <h3 className="rt-edu-degree">{edu.degree}</h3>
                        <p className="rt-edu-institution">{edu.institution} • {edu.graduationYear}{edu.cgpa && ` • Grade: ${edu.cgpa}`}</p>
                    </div>
                ))}
            </section>
        )}

        {/* Projects Section for Creative */}
        {data.projects && data.projects.length > 0 && (
            <section className="rt-section rt-section--creative">
                <h2 className="rt-section-title rt-section-title--creative">Projects</h2>
                {data.projects.map((project, idx) => (
                    <div key={idx} className="rt-project-item--creative">
                        <h3>{project.name}</h3>
                        {project.techStack && project.techStack.length > 0 && (
                            <p className="rt-project-tech">{project.techStack.join(' • ')}</p>
                        )}
                        {project.description && <p>{project.description}</p>}
                    </div>
                ))}
            </section>
        )}
    </div>
);

// Main Template Renderer - Simplified to 4 templates (all ATS-friendly, no photos)
export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data, template, scale = 1 }) => {
    const renderTemplate = () => {
        switch (template) {
            case 'professional':
                return <ProfessionalTemplate data={data} />;
            case 'tech':
                return <TechTemplate data={data} />;
            case 'medical':
                return <MedicalTemplate data={data} />;
            case 'creative':
                return <CreativeTemplate data={data} />;
            // Fallback for old template names (backwards compatibility)
            default:
                return <TechTemplate data={data} />;
        }
    };

    return (
        <div
            className={`resume-template-wrapper template-${template}`}
            style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        >
            {renderTemplate()}
        </div>
    );
};

export default ResumeTemplate;


