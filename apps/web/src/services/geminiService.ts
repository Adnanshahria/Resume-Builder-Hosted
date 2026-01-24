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
  if (!data.personalInfo.title && data.experience.length === 0) {
    throw new Error("Please add a Job Title or Experience first.");
  }

  const prompt = `
    You are an expert resume writer. Write a professional summary in EXACTLY 1-2 sentences (MAX 15 WORDS TOTAL).
    
    Job Title: ${data.personalInfo.title}
    Skills: ${data.skills.slice(0, 3).join(", ")}
    
    BE SUPER MINIMAL. MAX 15 WORDS. No first person. No filler. Action-focused.
  `;

  try {
    if (!ai) {
      logger.warn('GeminiService', 'AI not initialized - missing API key');
      throw new Error("AI features require an API key. Please configure VITE_GEMINI_API_KEY.");
    }
    logger.info('GeminiService', 'Generating resume summary', { title: data.personalInfo.title });
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