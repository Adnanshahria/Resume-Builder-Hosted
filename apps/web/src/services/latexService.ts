/**
 * LaTeX Resume Generator Service
 * 
 * Generates LaTeX (.tex) files from resume data for ATS-friendly PDF export.
 * Uses standard LaTeX resume templates that compile cleanly.
 */

import { ResumeData } from '../types';

// Escape special LaTeX characters
const escapeLatex = (text: string): string => {
    if (!text) return '';
    return text
        .replace(/\\/g, '\\textbackslash{}')
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/_/g, '\\_')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/~/g, '\\textasciitilde{}')
        .replace(/\^/g, '\\textasciicircum{}');
};

// Generate LaTeX document
export const generateLatexResume = (data: ResumeData): string => {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return `%-------------------------
% Resume in LaTeX
% Author: AI Resume Forge
% License: MIT
%-------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{#1}
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(personalInfo.fullName || 'Your Name')}} \\\\ \\vspace{1pt}
    ${personalInfo.title ? `\\small ${escapeLatex(personalInfo.title)} \\\\ \\vspace{1pt}` : ''}
    \\small 
    ${personalInfo.phone ? `\\faPhone\\ ${escapeLatex(personalInfo.phone)} $|$ ` : ''}
    ${personalInfo.email ? `\\href{mailto:${personalInfo.email}}{\\faEnvelope\\ ${escapeLatex(personalInfo.email)}} $|$ ` : ''}
    ${personalInfo.linkedin ? `\\href{https://${personalInfo.linkedin}}{\\faLinkedin\\ LinkedIn} $|$ ` : ''}
    ${personalInfo.github ? `\\href{https://${personalInfo.github}}{\\faGithub\\ GitHub} $|$ ` : ''}
    ${personalInfo.location ? `\\faMapMarker*\\ ${escapeLatex(personalInfo.location)}` : ''}
\\end{center}

${summary ? `
%-----------SUMMARY-----------
\\section{Professional Summary}
${escapeLatex(summary)}
` : ''}

${experience.length > 0 ? `
%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
${experience.map(exp => `
    \\resumeSubheading
      {${escapeLatex(exp.role)}}{${escapeLatex(exp.startDate)} -- ${escapeLatex(exp.endDate || 'Present')}}
      {${escapeLatex(exp.company)}}{}
      ${exp.description ? `\\resumeItemListStart
${exp.description.split('\n').filter(line => line.trim()).map(line =>
        `        \\resumeItem{${escapeLatex(line.replace(/^[•\-]\s*/, ''))}}`
    ).join('\n')}
      \\resumeItemListEnd` : ''}
`).join('')}
  \\resumeSubHeadingListEnd
` : ''}

${projects && projects.length > 0 ? `
%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
${projects.map(project => `
      \\resumeProjectHeading
          {\\textbf{${escapeLatex(project.name)}} $|$ \\emph{${escapeLatex((project.techStack || []).join(', '))}}}{${project.github ? '\\faGithub\\ GitHub' : ''}${project.link ? ' \\faLink\\ Live' : ''}}
          ${project.description ? `\\resumeItemListStart
            \\resumeItem{${escapeLatex(project.description)}}
          \\resumeItemListEnd` : ''}
`).join('')}
    \\resumeSubHeadingListEnd
` : ''}

${education.length > 0 ? `
%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${education.map(edu => `
    \\resumeSubheading
      {${escapeLatex(edu.institution)}}{${escapeLatex(edu.graduationYear)}}
      {${escapeLatex(edu.degree)}${edu.field ? ` in ${escapeLatex(edu.field)}` : ''}}{}
`).join('')}
  \\resumeSubHeadingListEnd
` : ''}

${skills.length > 0 ? `
%-----------SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Skills}{: ${escapeLatex(skills.join(', '))}}
    }}
 \\end{itemize}
` : ''}

%-------------------------------------------
\\end{document}
`;
};

// Download LaTeX file
export const downloadLatex = (data: ResumeData, filename: string = 'resume'): void => {
    const latex = generateLatexResume(data);
    const blob = new Blob([latex], { type: 'application/x-latex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export default { generateLatexResume, downloadLatex };
