import React from 'react';
import { ResumeData } from '../types';
import { TemplateType } from '../lib/templates';

interface ResumeTemplateProps {
    data: ResumeData;
    template: TemplateType;
    scale?: number;
    showPhoto?: boolean;  // Toggle for ATS-friendly mode (no photo)
}

interface TemplateProps {
    data: ResumeData;
    showPhoto?: boolean;
}

// Professional Template - Clean and Classic
const ProfessionalTemplate: React.FC<TemplateProps> = ({ data, showPhoto }) => (
    <div className="resume-template resume-template--professional">
        <header className="rt-header rt-header--professional">
            <div className="rt-header-content">
                {showPhoto && data.personalInfo.photo && (
                    <img
                        src={data.personalInfo.photo}
                        alt={data.personalInfo.fullName}
                        className="rt-photo rt-photo--professional"
                    />
                )}
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
                            <span className="rt-exp-dates">{exp.startDate} - {exp.endDate || 'Present'}</span>
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
                        <span className="rt-edu-year">{edu.graduationYear}</span>
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

// Developer Template - Modern Tech Look
const DeveloperTemplate: React.FC<TemplateProps> = ({ data, showPhoto }) => (
    <div className="resume-template resume-template--developer">
        <div className="rt-sidebar rt-sidebar--developer">
            <div className="rt-profile">
                {showPhoto && data.personalInfo.photo ? (
                    <img
                        src={data.personalInfo.photo}
                        alt={data.personalInfo.fullName}
                        className="rt-avatar-img rt-avatar-img--developer"
                    />
                ) : (
                    <div className="rt-avatar rt-avatar--developer">
                        {data.personalInfo.fullName?.charAt(0) || 'D'}
                    </div>
                )}
                <h1 className="rt-name rt-name--developer">{data.personalInfo.fullName || 'Developer Name'}</h1>
                <p className="rt-title rt-title--developer">{data.personalInfo.title || 'Software Developer'}</p>
            </div>

            <div className="rt-contact rt-contact--developer">
                {data.personalInfo.email && <div className="rt-contact-item">📧 {data.personalInfo.email}</div>}
                {data.personalInfo.phone && <div className="rt-contact-item">📱 {data.personalInfo.phone}</div>}
                {data.personalInfo.location && <div className="rt-contact-item">📍 {data.personalInfo.location}</div>}
                {data.personalInfo.linkedin && <div className="rt-contact-item">💼 {data.personalInfo.linkedin}</div>}
            </div>

            {data.skills.length > 0 && (
                <div className="rt-skills-section">
                    <h2 className="rt-section-title rt-section-title--developer">Tech Stack</h2>
                    <div className="rt-skills rt-skills--developer">
                        {data.skills.map((skill, idx) => (
                            <span key={idx} className="rt-skill-tag rt-skill-tag--developer">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>

        <div className="rt-main rt-main--developer">
            {data.summary && (
                <section className="rt-section">
                    <h2 className="rt-section-title rt-section-title--developer">About</h2>
                    <p className="rt-summary">{data.summary}</p>
                </section>
            )}

            {data.experience.length > 0 && (
                <section className="rt-section">
                    <h2 className="rt-section-title rt-section-title--developer">Experience</h2>
                    {data.experience.map((exp, idx) => (
                        <div key={idx} className="rt-experience-item rt-experience-item--developer">
                            <div className="rt-exp-timeline">
                                <div className="rt-exp-dot"></div>
                            </div>
                            <div className="rt-exp-content">
                                <h3 className="rt-exp-role">{exp.role}</h3>
                                <p className="rt-exp-company">{exp.company}</p>
                                <span className="rt-exp-dates">{exp.startDate} - {exp.endDate || 'Present'}</span>
                                {exp.description && <p className="rt-exp-description">{exp.description}</p>}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {data.education.length > 0 && (
                <section className="rt-section">
                    <h2 className="rt-section-title rt-section-title--developer">Education</h2>
                    {data.education.map((edu, idx) => (
                        <div key={idx} className="rt-education-item">
                            <h3 className="rt-edu-degree">{edu.degree}</h3>
                            <p className="rt-edu-institution">{edu.institution} • {edu.graduationYear}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    </div>
);

// Software Engineer Template - Two Column (Matching Reference Image)
const SoftwareEngineerTemplate: React.FC<TemplateProps> = ({ data, showPhoto }) => (
    <div className="resume-template resume-template--software-engineer">
        {/* Left Sidebar */}
        <div className="rt-sidebar rt-sidebar--software-engineer">
            {/* Profile Header with optional photo */}
            <div className="rt-se-profile">
                {showPhoto && data.personalInfo.photo && (
                    <img
                        src={data.personalInfo.photo}
                        alt={data.personalInfo.fullName}
                        className="rt-avatar-img rt-avatar-img--se"
                    />
                )}
                <h1 className="rt-name rt-name--se">{data.personalInfo.fullName || 'Your Name'}</h1>
                <p className="rt-title rt-title--se">{data.personalInfo.title || 'Software Engineer'}</p>
            </div>

            {/* Contact Info */}
            <div className="rt-contact rt-contact--se">
                {data.personalInfo.email && (
                    <div className="rt-contact-row">
                        <span className="rt-contact-icon">✉</span>
                        <span>{data.personalInfo.email}</span>
                    </div>
                )}
                {data.personalInfo.phone && (
                    <div className="rt-contact-row">
                        <span className="rt-contact-icon">📞</span>
                        <span>{data.personalInfo.phone}</span>
                    </div>
                )}
                {data.personalInfo.location && (
                    <div className="rt-contact-row">
                        <span className="rt-contact-icon">📍</span>
                        <span>{data.personalInfo.location}</span>
                    </div>
                )}
                {data.personalInfo.linkedin && (
                    <div className="rt-contact-row">
                        <span className="rt-contact-icon">💼</span>
                        <span>{data.personalInfo.linkedin}</span>
                    </div>
                )}
            </div>

            {/* Education Section */}
            {data.education.length > 0 && (
                <div className="rt-section rt-section--se">
                    <h2 className="rt-section-title rt-section-title--se">EDUCATION</h2>
                    {data.education.map((edu, idx) => (
                        <div key={idx} className="rt-education-item rt-education-item--se">
                            <h3 className="rt-edu-degree rt-edu-degree--se">{edu.degree}</h3>
                            <p className="rt-edu-field">{edu.field}</p>
                            <p className="rt-edu-institution rt-edu-institution--se">{edu.institution}</p>
                            <div className="rt-edu-meta">
                                <span>📅 {edu.graduationYear}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills Section */}
            {data.skills.length > 0 && (
                <div className="rt-section rt-section--se">
                    <h2 className="rt-section-title rt-section-title--se">SKILLS</h2>
                    <ul className="rt-skills-list rt-skills-list--se">
                        {data.skills.map((skill, idx) => (
                            <li key={idx} className="rt-skill-item rt-skill-item--se">{skill}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {/* Main Content */}
        <div className="rt-main rt-main--software-engineer">
            {/* Work Experience Section */}
            {data.experience.length > 0 && (
                <section className="rt-section">
                    <h2 className="rt-section-title rt-section-title--se-main">WORK EXPERIENCE</h2>
                    {data.experience.map((exp, idx) => (
                        <div key={idx} className="rt-experience-item rt-experience-item--se">
                            <div className="rt-exp-header rt-exp-header--se">
                                <h3 className="rt-exp-role rt-exp-role--se">{exp.role}</h3>
                                <p className="rt-exp-company rt-exp-company--se">{exp.company}</p>
                            </div>
                            <div className="rt-exp-meta">
                                <span className="rt-exp-dates rt-exp-dates--se">📅 {exp.startDate} - {exp.endDate || 'current'}</span>
                            </div>
                            {exp.description && (
                                <div className="rt-exp-description rt-exp-description--se">
                                    {exp.description.split('\n').filter((line: string) => line.trim()).map((line: string, i: number) => (
                                        <p key={i} className="rt-exp-bullet">• {line.replace(/^[•\-]\s*/, '')}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Summary/Profile Section (if provided) */}
            {data.summary && (
                <section className="rt-section">
                    <h2 className="rt-section-title rt-section-title--se-main">PROFESSIONAL SUMMARY</h2>
                    <p className="rt-summary rt-summary--se">{data.summary}</p>
                </section>
            )}

            {/* Projects Section */}
            {data.projects && data.projects.length > 0 && (
                <section className="rt-section">
                    <h2 className="rt-section-title rt-section-title--se-main">PROJECTS</h2>
                    {data.projects.map((project, idx) => (
                        <div key={idx} className="rt-project-item">
                            <div className="rt-project-header">
                                <h3 className="rt-project-name">{project.name}</h3>
                                {(project.github || project.link) && (
                                    <span className="rt-project-links">
                                        {project.github && <span>📂 GitHub</span>}
                                        {project.link && <span>🔗 Live</span>}
                                    </span>
                                )}
                            </div>
                            {project.techStack && project.techStack.length > 0 && (
                                <div className="rt-project-tech">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="rt-tech-tag">{tech}</span>
                                    ))}
                                </div>
                            )}
                            {project.description && (
                                <p className="rt-project-description">{project.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}
        </div>
    </div>
);

// Technical Template - Engineering Focus
const TechnicalTemplate: React.FC<TemplateProps> = ({ data, showPhoto }) => (
    <div className="resume-template resume-template--technical">
        <header className="rt-header rt-header--technical">
            <div className="rt-header-content">
                {showPhoto && data.personalInfo.photo && (
                    <img
                        src={data.personalInfo.photo}
                        alt={data.personalInfo.fullName}
                        className="rt-photo rt-photo--technical"
                    />
                )}
                <div>
                    <h1 className="rt-name">{data.personalInfo.fullName || 'Engineer Name'}</h1>
                    <p className="rt-title">{data.personalInfo.title || 'Technical Specialist'}</p>
                </div>
            </div>
            <div className="rt-contact rt-contact--technical">
                {data.personalInfo.email && <span>✉ {data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>☎ {data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>⚑ {data.personalInfo.location}</span>}
            </div>
        </header>

        <div className="rt-technical-grid">
            <div className="rt-main-content">
                {data.summary && (
                    <section className="rt-section">
                        <h2 className="rt-section-title rt-section-title--technical">
                            <span className="rt-section-icon">▸</span> Profile
                        </h2>
                        <p className="rt-summary">{data.summary}</p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section className="rt-section">
                        <h2 className="rt-section-title rt-section-title--technical">
                            <span className="rt-section-icon">▸</span> Work Experience
                        </h2>
                        {data.experience.map((exp, idx) => (
                            <div key={idx} className="rt-experience-item rt-experience-item--technical">
                                <div className="rt-exp-header">
                                    <h3 className="rt-exp-role">{exp.role}</h3>
                                    <span className="rt-exp-dates">{exp.startDate} → {exp.endDate || 'Present'}</span>
                                </div>
                                <p className="rt-exp-company">{exp.company}</p>
                                {exp.description && <p className="rt-exp-description">{exp.description}</p>}
                            </div>
                        ))}
                    </section>
                )}
            </div>

            <div className="rt-sidebar rt-sidebar--technical">
                {data.skills.length > 0 && (
                    <section className="rt-section">
                        <h2 className="rt-section-title rt-section-title--technical">
                            <span className="rt-section-icon">▸</span> Core Skills
                        </h2>
                        <ul className="rt-skills-list">
                            {data.skills.map((skill, idx) => (
                                <li key={idx} className="rt-skill-item">{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {data.education.length > 0 && (
                    <section className="rt-section">
                        <h2 className="rt-section-title rt-section-title--technical">
                            <span className="rt-section-icon">▸</span> Education
                        </h2>
                        {data.education.map((edu, idx) => (
                            <div key={idx} className="rt-education-item">
                                <h3 className="rt-edu-degree">{edu.degree}</h3>
                                <p className="rt-edu-institution">{edu.institution}</p>
                                <span className="rt-edu-year">{edu.graduationYear}</span>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    </div>
);

// Medical Template - Healthcare Professional
const MedicalTemplate: React.FC<TemplateProps> = ({ data, showPhoto }) => (
    <div className="resume-template resume-template--medical">
        <header className="rt-header rt-header--medical">
            {showPhoto && data.personalInfo.photo ? (
                <img
                    src={data.personalInfo.photo}
                    alt={data.personalInfo.fullName}
                    className="rt-photo rt-photo--medical"
                />
            ) : (
                <div className="rt-medical-icon">⚕</div>
            )}
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
                                    <span className="rt-exp-dates">{exp.startDate} - {exp.endDate || 'Present'}</span>
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
                                <span className="rt-edu-year">{edu.graduationYear}</span>
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

                {/* Medical Licenses Section */}
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

// Creative Template - Bold and Expressive
const CreativeTemplate: React.FC<TemplateProps> = ({ data, showPhoto }) => (
    <div className="resume-template resume-template--creative">
        <div className="rt-creative-hero">
            <div className="rt-creative-bg-shapes">
                <div className="rt-bg-circle rt-bg-circle--1"></div>
                <div className="rt-bg-circle rt-bg-circle--2"></div>
            </div>
            <div className="rt-creative-profile">
                {showPhoto && data.personalInfo.photo ? (
                    <img
                        src={data.personalInfo.photo}
                        alt={data.personalInfo.fullName}
                        className="rt-avatar-img rt-avatar-img--creative"
                    />
                ) : (
                    <div className="rt-avatar rt-avatar--creative">
                        {data.personalInfo.fullName?.charAt(0) || 'C'}
                    </div>
                )}
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
                                <span className="rt-exp-dates">{exp.startDate} - {exp.endDate || 'Present'}</span>
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
                        <p className="rt-edu-institution">{edu.institution} • {edu.graduationYear}</p>
                    </div>
                ))}
            </section>
        )}
    </div>
);

// Main Template Renderer
export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data, template, scale = 1, showPhoto = false }) => {
    const renderTemplate = () => {
        switch (template) {
            case 'professional':
                return <ProfessionalTemplate data={data} showPhoto={showPhoto} />;
            case 'software-engineer':
                return <SoftwareEngineerTemplate data={data} showPhoto={showPhoto} />;
            case 'developer':
                return <DeveloperTemplate data={data} showPhoto={showPhoto} />;
            case 'technical':
                return <TechnicalTemplate data={data} showPhoto={showPhoto} />;
            case 'medical':
                return <MedicalTemplate data={data} showPhoto={showPhoto} />;
            case 'creative':
                return <CreativeTemplate data={data} showPhoto={showPhoto} />;
            default:
                return <SoftwareEngineerTemplate data={data} showPhoto={showPhoto} />;
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
