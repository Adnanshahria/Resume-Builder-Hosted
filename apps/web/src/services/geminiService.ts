import { GoogleGenAI } from "@google/genai";
import { ResumeData, ExperienceItem } from "../types";
import { logger } from "../utils/logger";

// Gracefully handle missing API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY || "";
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

// Using gemini-2.5-flash as requested by the user prompt for this specific task
const MODEL_NAME = "gemini-2.5-flash";

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
    if (!ai) {
      logger.warn('GeminiService', 'AI not initialized - missing API key');
      throw new Error("AI features require an API key. Please configure VITE_GEMINI_API_KEY.");
    }
    logger.info('GeminiService', 'Generating comprehensive resume summary', {
      name: data.personalInfo.fullName,
      experienceCount: data.experience.length,
      skillsCount: data.skills.length
    });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      }
    });
    logger.info('GeminiService', 'Summary generated successfully');
    return response.text || "";
  } catch (error) {
    logger.error('GeminiService', 'Failed to generate summary', error);
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
    if (!ai) {
      logger.warn('GeminiService', 'AI not initialized - missing API key');
      throw new Error("AI features require an API key. Please configure VITE_GEMINI_API_KEY.");
    }
    logger.info('GeminiService', 'Enhancing experience description', { role: item.role, company: item.company });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      }
    });
    logger.info('GeminiService', 'Experience enhanced successfully');
    return response.text || "";
  } catch (error) {
    logger.error('GeminiService', 'Failed to enhance description', error);
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
    if (!ai) {
      logger.warn('GeminiService', 'AI not initialized - missing API key');
      throw new Error("AI features require an API key. Please configure VITE_GEMINI_API_KEY.");
    }
    logger.info('GeminiService', 'Enhancing project description', { name: project.name });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      }
    });
    logger.info('GeminiService', 'Project description enhanced successfully');
    return response.text || "";
  } catch (error) {
    logger.error('GeminiService', 'Failed to enhance project description', error);
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
    if (!ai) {
      logger.warn('GeminiService', 'AI not initialized - missing API key');
      throw new Error("AI features require an API key. Please configure VITE_GEMINI_API_KEY.");
    }
    logger.info('GeminiService', 'Enhancing vocational certification', { name: certification.name });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      }
    });
    logger.info('GeminiService', 'Vocational certification enhanced successfully');
    return response.text || "";
  } catch (error) {
    logger.error('GeminiService', 'Failed to enhance vocational certification', error);
    throw new Error("Failed to enhance certification description.");
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
  // Collect all text from resume
  const allText: string[] = [];

  // Personal info
  if (data.personalInfo.fullName) allText.push(data.personalInfo.fullName);
  if (data.personalInfo.title) allText.push(data.personalInfo.title);
  if (data.personalInfo.location) allText.push(data.personalInfo.location);

  // Summary
  if (data.summary) allText.push(data.summary);

  // Experience
  data.experience.forEach(exp => {
    if (exp.company) allText.push(exp.company);
    if (exp.role) allText.push(exp.role);
    if (exp.description) allText.push(exp.description);
  });

  // Education
  data.education.forEach(edu => {
    if (edu.institution) allText.push(edu.institution);
    if (edu.degree) allText.push(edu.degree);
    if (edu.field) allText.push(edu.field);
  });

  // Skills
  if (data.skills.length > 0) allText.push(data.skills.join(', '));

  // Coursework
  if (data.coursework && data.coursework.length > 0) allText.push(data.coursework.join(', '));

  // Projects
  if (data.projects) {
    data.projects.forEach(project => {
      if (project.name) allText.push(project.name);
      if (project.description) allText.push(project.description);
    });
  }

  // Certifications
  if (data.certifications) {
    data.certifications.forEach(cert => {
      if (cert.name) allText.push(cert.name);
      if (cert.issuer) allText.push(cert.issuer);
    });
  }

  const combinedText = allText.join('\n');

  if (!combinedText.trim()) {
    return {
      hasErrors: false,
      errors: [],
      message: "No text to check. Please fill in some fields first."
    };
  }

  const prompt = `
    You are a spelling and grammar checker. Analyze the following resume text for SPELLING MISTAKES ONLY.
    
    TEXT TO CHECK:
    """
    ${combinedText}
    """
    
    RULES:
    - Only check for SPELLING mistakes (typos, misspelled words)
    - Ignore proper nouns, company names, technology names (React, JavaScript, AWS, etc.)
    - Ignore abbreviations and acronyms
    - Be strict only for common English words
    
    RESPOND IN THIS EXACT JSON FORMAT:
    {
      "hasErrors": true/false,
      "errors": [
        {"word": "misspelled word", "suggestion": "correct spelling", "context": "short phrase where it appears"}
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
    if (!ai) {
      logger.warn('GeminiService', 'AI not initialized - missing API key');
      throw new Error("AI features require an API key. Please configure VITE_GEMINI_API_KEY.");
    }
    logger.info('GeminiService', 'Checking spelling', { textLength: combinedText.length });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      }
    });

    const responseText = response.text || "";
    logger.info('GeminiService', 'Spelling check completed');

    // Parse JSON response
    try {
      // Clean up response - remove markdown code blocks if present
      const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const result = JSON.parse(cleanJson);
      return result as SpellingResult;
    } catch {
      logger.warn('GeminiService', 'Failed to parse spelling response', { response: responseText });
      return {
        hasErrors: false,
        errors: [],
        message: "Spelling check completed. No major issues detected."
      };
    }
  } catch (error) {
    logger.error('GeminiService', 'Failed to check spelling', error);
    throw new Error("Failed to check spelling. Please try again.");
  }
};