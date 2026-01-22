import { GoogleGenAI } from "@google/genai";
import { ResumeData, ExperienceItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-2.5-flash as requested by the user prompt for this specific task
const MODEL_NAME = "gemini-2.5-flash"; 

export const generateResumeSummary = async (data: ResumeData): Promise<string> => {
  if (!data.personalInfo.title && data.experience.length === 0) {
    throw new Error("Please add a Job Title or Experience first.");
  }

  const prompt = `
    You are an expert resume writer. Write a professional, punchy, and modern executive summary (max 3-4 sentences) for a resume based on the following details.
    
    Job Title: ${data.personalInfo.title}
    Skills: ${data.skills.join(", ")}
    Experience Count: ${data.experience.length} roles
    
    Key Experience:
    ${data.experience.map(e => `- ${e.role} at ${e.company}`).join("\n")}
    
    Do not use first person pronouns heavily. Focus on achievements and professional value.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for speed on simple text
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate summary. Please check your API key or try again.");
  }
};

export const enhanceExperienceDescription = async (item: ExperienceItem): Promise<string> => {
  if (!item.role || !item.company) {
    throw new Error("Please fill in Role and Company fields first.");
  }

  const prompt = `
    You are an expert resume writer. Enhance the following job description for a ${item.role} at ${item.company}. 
    Convert it into 3-5 punchy, results-oriented bullet points using action verbs.
    
    Current Description (might be empty or basic):
    "${item.description}"
    
    Return ONLY the bullet points, starting each with a bullet character (•). Do not add introductory text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to enhance description.");
  }
};