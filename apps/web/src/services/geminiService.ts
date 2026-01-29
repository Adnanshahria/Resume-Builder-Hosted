import { GoogleGenAI } from "@google/genai";
import { ResumeData, ExperienceItem } from "../types";
import { logger } from "../utils/logger";
import { isHuggingFaceEnabled, generateWithHuggingFace, getCurrentProvider } from "./huggingfaceService";

// Gracefully handle missing API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY || "";
let ai: GoogleGenAI | null = null;

// Debug logging for API key
if (import.meta.env.DEV) {
  console.log('Gemini Service Init:', {
    hasKey: !!API_KEY,
    keyLength: API_KEY ? API_KEY.length : 0,
    model: "gemini-2.5-flash-lite"
  });
}

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.error("Gemini API Key is missing! AI features will not work.");
}

// Using gemini-2.5-flash as requested by the user prompt for this specific task
const MODEL_NAME = "gemini-2.5-flash-lite";

// Export provider info for UI
export { getCurrentProvider };

/**
 * Unified AI call - tries HuggingFace first (if configured), falls back to Gemini
 */
const callAI = async (prompt: string, context: string): Promise<string> => {
  // Try HuggingFace first if enabled
  if (isHuggingFaceEnabled()) {
    try {
      logger.info('AIService', `Using HuggingFace for: ${context}`);
      const result = await generateWithHuggingFace(prompt);
      if (result && result.trim()) {
        return result;
      }
      logger.warn('AIService', 'HF returned empty, falling back to Gemini');
    } catch (hfError) {
      logger.warn('AIService', 'HF failed, falling back to Gemini', hfError);
    }
  }

  // Fallback to Gemini
  if (!ai) {
    throw new Error("AI features require an API key. Please configure VITE_GEMINI_API_KEY.");
  }

  logger.info('AIService', `Using Gemini for: ${context}`);
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: { thinkingConfig: { thinkingBudget: 0 } }
  });

  return response.text || "";
};

export const generateResumeSummary = async (data: ResumeData): Promise<string> => {
  // Check if there's enough data to generate a summary
  if (!data.personalInfo.fullName && data.experience.length === 0 && data.skills.length === 0) {
    throw new Error("Please fill in some details first (name, experience, or skills).");
  }

  // Build comprehensive context from all user data
  const experienceContext = data.experience.length > 0
    ? data.experience.map(exp => `${exp.role} at ${exp.company}`).join(', ')
    : '';

  const educationContext = data.education.length > 0
    ? data.education.map(edu => `${edu.degree}${edu.field ? ' in ' + edu.field : ''} from ${edu.institution}`).join(', ')
    : '';

  const skillsContext = data.skills.length > 0
    ? data.skills.slice(0, 8).join(', ')
    : '';

  const projectsContext = data.projects && data.projects.length > 0
    ? data.projects.map(p => p.name).join(', ')
    : '';

  const prompt = `
    You are an expert resume writer. Write a professional summary for this candidate.
    
    CANDIDATE DETAILS:
    - Name: ${data.personalInfo.fullName || 'Not provided'}
    - Current/Desired Title: ${data.personalInfo.title || 'Not provided'}
    - Location: ${data.personalInfo.location || 'Not provided'}
    
    EXPERIENCE:
    ${experienceContext || 'No experience listed'}
    
    EDUCATION:
    ${educationContext || 'No education listed'}
    
    SKILLS:
    ${skillsContext || 'No skills listed'}
    
    PROJECTS:
    ${projectsContext || 'No projects listed'}
    
    RULES:
    - Write EXACTLY 25-35 words (around 30 words)
    - NO first person (I, my, me)
    - Start with a strong descriptor (e.g., "Accomplished", "Results-driven", "Innovative")
    - Highlight key expertise and value proposition
    - Mention specific technologies or domains if relevant
    - Professional and impactful tone
    - Single paragraph, no bullet points
    
    Output ONLY the summary text, nothing else.
  `;

  try {
    logger.info('AIService', 'Generating comprehensive resume summary', {
      name: data.personalInfo.fullName,
      experienceCount: data.experience.length,
      skillsCount: data.skills.length
    });
    const result = await callAI(prompt, 'generateResumeSummary');
    logger.info('AIService', 'Summary generated successfully');
    return result;
  } catch (error) {
    logger.error('AIService', 'Failed to generate summary', error);
    throw new Error("Failed to generate summary. Please check your API key or try again.");
  }
};

export const enhanceExperienceDescription = async (item: ExperienceItem): Promise<string> => {
  if (!item.role || !item.company) {
    throw new Error("Please fill in Role and Company fields first.");
  }

  const prompt = `
    Write 2-3 resume bullet points for a ${item.role} at ${item.company}.
    
    RULES:
    - Total output MAX 20 words
    - Each bullet starts with "• " (bullet character)
    - Use strong action verbs (Led, Developed, Managed, etc.)
    - NO markdown, NO asterisks, NO formatting
    - Plain text only
    - One line per bullet
    
    Current: "${item.description || 'No description provided'}"
    
    Output ONLY the bullets, nothing else.
  `;

  try {
    logger.info('AIService', 'Enhancing experience description', { role: item.role, company: item.company });
    const result = await callAI(prompt, 'enhanceExperienceDescription');
    logger.info('AIService', 'Experience enhanced successfully');
    return result;
  } catch (error) {
    logger.error('AIService', 'Failed to enhance description', error);
    throw new Error("Failed to enhance description.");
  }
};

export const enhanceProjectDescription = async (project: { name: string; description: string; techStack?: string[] }): Promise<string> => {
  if (!project.name) {
    throw new Error("Please fill in Project Name first.");
  }

  const techStackStr = project.techStack?.length ? project.techStack.join(', ') : 'various technologies';

  const prompt = `
    Write 2-3 resume bullet points for a project called "${project.name}" using ${techStackStr}.
    
    RULES:
    - Total output MAX 25 words
    - Each bullet starts with "• " (bullet character)
    - Use strong action verbs (Built, Developed, Implemented, Designed, etc.)
    - Highlight technical achievements and impact
    - NO markdown, NO asterisks, NO formatting
    - Plain text only
    - One line per bullet
    
    Current description: "${project.description || 'No description provided'}"
    
    Output ONLY the bullets, nothing else.
  `;

  try {
    logger.info('AIService', 'Enhancing project description', { name: project.name });
    const result = await callAI(prompt, 'enhanceProjectDescription');
    logger.info('AIService', 'Project description enhanced successfully');
    return result;
  } catch (error) {
    logger.error('AIService', 'Failed to enhance project description', error);
    throw new Error("Failed to enhance project description.");
  }
};

export const enhanceVocationalCertification = async (certification: {
  name: string;
  provider: string;
  description?: string
}): Promise<string> => {
  const prompt = `
    You are an expert resume writer. Enhance this vocational certification/course description for a professional resume.
    
    CERTIFICATION/COURSE DETAILS:
    - Name: ${certification.name}
    - Provider: ${certification.provider}
    - Current Description: ${certification.description || 'Not provided'}
    
    RULES:
    - Write 2-3 concise bullet points (max 20 words each)
    - Focus on skills acquired, technologies learned, and practical applications
    - Use action verbs (Mastered, Developed, Built, Implemented, Learned)
    - Highlight key competencies gained
    - Plain text only, each bullet on new line starting with •
    
    Output ONLY the bullet points, nothing else.
  `;

  try {
    logger.info('AIService', 'Enhancing vocational certification', { name: certification.name });
    const result = await callAI(prompt, 'enhanceVocationalCertification');
    logger.info('AIService', 'Vocational certification enhanced successfully');
    return result;
  } catch (error) {
    logger.error('AIService', 'Failed to enhance vocational certification', error);
    throw new Error("Failed to enhance certification description.");
  }
};

export const enhanceAchievementDescription = async (achievement: {
  title: string;
  organization?: string;
  description?: string;
}): Promise<string> => {
  if (!achievement.title) {
    throw new Error("Please fill in Achievement Title first.");
  }

  const prompt = `
    Write a 1-2 sentence professional description for this achievement on a resume.
    
    ACHIEVEMENT DETAILS:
    - Title: ${achievement.title}
    - Organization: ${achievement.organization || 'Not specified'}
    - Current Description: ${achievement.description || 'Not provided'}
    
    RULES:
    - MAX 25 words total
    - Highlight the impact, skills demonstrated, or recognition received
    - Use professional tone
    - Plain text only, no bullet points
    
    Output ONLY the description, nothing else.
  `;

  try {
    logger.info('AIService', 'Enhancing achievement', { title: achievement.title });
    const result = await callAI(prompt, 'enhanceAchievementDescription');
    return result;
  } catch (error) {
    logger.error('AIService', 'Failed to enhance achievement', error);
    throw new Error("Failed to enhance achievement description.");
  }
};

export const enhanceExtracurricularDescription = async (item: {
  organization: string;
  role: string;
  description?: string;
}): Promise<string> => {
  if (!item.role || !item.organization) {
    throw new Error("Please fill in Role and Organization first.");
  }

  const prompt = `
    Write a 1-2 sentence professional description for this extracurricular activity on a resume.
    
    DETAILS:
    - Role: ${item.role}
    - Organization: ${item.organization}
    - Current Description: ${item.description || 'Not provided'}
    
    RULES:
    - MAX 25 words total
    - Highlight leadership, impact, skills, or contributions
    - Use professional tone
    - Plain text only, no bullet points
    
    Output ONLY the description, nothing else.
  `;

  try {
    logger.info('AIService', 'Enhancing extracurricular', { role: item.role });
    const result = await callAI(prompt, 'enhanceExtracurricularDescription');
    return result;
  } catch (error) {
    logger.error('AIService', 'Failed to enhance extracurricular', error);
    throw new Error("Failed to enhance activity description.");
  }
};

export interface SpellingResult {
  hasErrors: boolean;
  errors: Array<{
    word: string;
    suggestion: string;
    context: string;
  }>;
  message: string;
}

export const checkSpelling = async (data: ResumeData): Promise<SpellingResult> => {
  // Collect text by section for better error reporting
  const sections: { name: string; text: string[] }[] = [];

  // Personal info
  const personalText: string[] = [];
  if (data.personalInfo.fullName) personalText.push(data.personalInfo.fullName);
  if (data.personalInfo.title) personalText.push(data.personalInfo.title);
  if (data.personalInfo.location) personalText.push(data.personalInfo.location);
  if (personalText.length > 0) sections.push({ name: 'Personal Details', text: personalText });

  // Summary
  if (data.summary) sections.push({ name: 'Summary', text: [data.summary] });

  // Education
  const educationText: string[] = [];
  data.education.forEach(edu => {
    if (edu.institution) educationText.push(edu.institution);
    if (edu.degree) educationText.push(edu.degree);
    if (edu.field) educationText.push(edu.field);
  });
  if (educationText.length > 0) sections.push({ name: 'Education', text: educationText });

  // Experience
  const experienceText: string[] = [];
  data.experience.forEach(exp => {
    if (exp.company) experienceText.push(exp.company);
    if (exp.role) experienceText.push(exp.role);
    if (exp.description) experienceText.push(exp.description);
  });
  if (experienceText.length > 0) sections.push({ name: 'Experience', text: experienceText });

  // Projects
  const projectsText: string[] = [];
  if (data.projects) {
    data.projects.forEach(project => {
      if (project.name) projectsText.push(project.name);
      if (project.description) projectsText.push(project.description);
    });
  }
  if (projectsText.length > 0) sections.push({ name: 'Projects', text: projectsText });

  // Achievements
  const achievementsText: string[] = [];
  if (data.achievements) {
    data.achievements.forEach(ach => {
      if (ach.title) achievementsText.push(ach.title);
      if (ach.organization) achievementsText.push(ach.organization);
      if (ach.description) achievementsText.push(ach.description);
    });
  }
  if (achievementsText.length > 0) sections.push({ name: 'Achievements', text: achievementsText });

  // Extracurricular
  const extracurricularText: string[] = [];
  if (data.extracurricular) {
    data.extracurricular.forEach(ext => {
      if (ext.organization) extracurricularText.push(ext.organization);
      if (ext.role) extracurricularText.push(ext.role);
      if (ext.description) extracurricularText.push(ext.description);
    });
  }
  if (extracurricularText.length > 0) sections.push({ name: 'Extracurricular', text: extracurricularText });

  // Vocational Certifications
  const vocationalText: string[] = [];
  if (data.vocationalCertifications) {
    data.vocationalCertifications.forEach(cert => {
      if (cert.name) vocationalText.push(cert.name);
      if (cert.provider) vocationalText.push(cert.provider);
      if (cert.description) vocationalText.push(cert.description);
    });
  }
  if (vocationalText.length > 0) sections.push({ name: 'Vocational Certifications', text: vocationalText });

  // Skills
  if (data.skills.length > 0) sections.push({ name: 'Skills', text: [data.skills.join(', ')] });

  // Coursework
  if (data.coursework && data.coursework.length > 0) sections.push({ name: 'Coursework', text: [data.coursework.join(', ')] });

  // Create structured text for AI with section markers
  const structuredText = sections.map(s => `[${s.name}]\n${s.text.join('\n')}`).join('\n\n');

  if (!structuredText.trim()) {
    return {
      hasErrors: false,
      errors: [],
      message: "No text to check. Please fill in some fields first."
    };
  }

  const prompt = `
    You are a spelling and grammar checker. Analyze the following resume text for SPELLING MISTAKES ONLY.
    The text is organized by sections marked with [Section Name].
    
    TEXT TO CHECK:
    """
    ${structuredText}
    """
    
    RULES:
    - Only check for SPELLING mistakes (typos, misspelled words)
    - Ignore proper nouns, company names, technology names (React, JavaScript, AWS, etc.)
    - Ignore abbreviations and acronyms
    - Be strict only for common English words
    - Include which SECTION the error was found in
    
    RESPOND IN THIS EXACT JSON FORMAT:
    {
      "hasErrors": true/false,
      "errors": [
        {"section": "Experience", "word": "misspelled word", "suggestion": "correct spelling", "context": "short phrase where it appears"}
      ],
      "message": "Summary message for user"
    }
    
    If no errors found, return:
    {
      "hasErrors": false,
      "errors": [],
      "message": "No spelling mistakes found! Your resume looks great."
    }
    
    Output ONLY the JSON, nothing else.
  `;

  try {
    logger.info('AIService', 'Checking spelling', { textLength: structuredText.length });
    const responseText = await callAI(prompt, 'checkSpelling');
    logger.info('AIService', 'Spelling check completed');

    // Parse JSON response
    try {
      // Clean up response - remove markdown code blocks if present
      const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const result = JSON.parse(cleanJson);
      return result as SpellingResult;
    } catch {
      logger.warn('AIService', 'Failed to parse spelling response', { response: responseText });
      return {
        hasErrors: false,
        errors: [],
        message: "Spelling check completed. No major issues detected."
      };
    }
  } catch (error) {
    logger.error('AIService', 'Failed to check spelling', error);
    throw new Error("Failed to check spelling. Please try again.");
  }
};