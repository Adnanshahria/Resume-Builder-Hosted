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
                            <a href={getFullUrl(data.personalInfo.github, 'github')} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </>
                    )}
                    {data.personalInfo.linkedin && (
                        <>
                            {(data.personalInfo.phone || data.personalInfo.email || data.personalInfo.github) && <span className="rt-separator">|</span>}
                            <a href={getFullUrl(data.personalInfo.linkedin, 'linkedin')} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        </>
                    )}
                </div>
                {/* Row 3: Competitive Programming + Portfolio (centered) */}
                {(data.personalInfo.leetcode || data.personalInfo.codeforces || data.personalInfo.codechef || data.personalInfo.website) && (
                    <div className="rt-contact rt-contact--tech">
                        {data.personalInfo.leetcode && (
                            <a href={data.personalInfo.leetcode.startsWith('http') ? data.personalInfo.leetcode : `https://${data.personalInfo.leetcode}`} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer">
                                LeetCode{data.personalInfo.leetcodeRating ? ` (${data.personalInfo.leetcodeRating})` : ''}
                            </a>
                        )}
                        {data.personalInfo.codeforces && (
                            <>
                                {data.personalInfo.leetcode && <span className="rt-separator">|</span>}
                                <a href={data.personalInfo.codeforces.startsWith('http') ? data.personalInfo.codeforces : `https://${data.personalInfo.codeforces}`} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer">
                                    Codeforces{data.personalInfo.codeforcesRating ? ` (${data.personalInfo.codeforcesRating})` : ''}
                                </a>
                            </>
                        )}
                        {data.personalInfo.codechef && (
                            <>
                                {(data.personalInfo.leetcode || data.personalInfo.codeforces) && <span className="rt-separator">|</span>}
                                <a href={data.personalInfo.codechef.startsWith('http') ? data.personalInfo.codechef : `https://${data.personalInfo.codechef}`} className="rt-contact-link--tech" target="_blank" rel="noopener noreferrer">
                                    CodeChef{data.personalInfo.codechefRating ? ` (${data.personalInfo.codechefRating})` : ''}
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


