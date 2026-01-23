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
    You are an expert resume writer. Write a professional, punchy executive summary in EXACTLY 2 sentences (MAX 30 WORDS TOTAL).
    
    Job Title: ${data.personalInfo.title}
    Skills: ${data.skills.slice(0, 5).join(", ")}
    
    Key Experience:
    ${data.experience.slice(0, 2).map(e => `- ${e.role} at ${e.company}`).join("\n")}
    
    BE SUPER MINIMAL. MAX 30 WORDS. No first person. Focus on value and impact.
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
    You are an expert resume writer. Enhance this job description for a ${item.role} at ${item.company}.
    Generate 2-3 SHORT bullet points (MAX 10 WORDS EACH). Use strong action verbs.
    
    Current Description:
    "${item.description}"
    
    BE SUPER MINIMAL. Each bullet MAX 10 words. Start each with •. No filler words.
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