import Resume from "../models/Resume.js";

import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

export const analyzeResume = async (req, res) => {
  try {
    const { jobTitle, companyName, description } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    if (!jobTitle || !companyName || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide job title, company name and job description",
      });
    }

    // STEP 1: Extract text from PDF
    const parser = new PDFParse({
      data: resumeFile.buffer,
    });

    const result = await parser.getText();
    const resumeText = result.text;

    await parser.destroy();

    if (!resumeText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from this PDF",
      });
    }

    console.log("Resume text extracted successfully");

    // STEP 2: Connect to Gemini
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from backend .env");
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // STEP 3: Prepare prompt
    const prompt = `
You are an expert ATS resume analyzer and career advisor.

Analyze the following resume against the given job details.

JOB TITLE: ${jobTitle}

COMPANY NAME: ${companyName}

JOB DESCRIPTION:
${description}

RESUME:
${resumeText}

Evaluate the resume based on:
1. Technical skills match
2. Relevant work experience
3. Education relevance
4. Job description keyword match
5. Overall resume quality

Return ONLY valid JSON in exactly this structure:

{
  "atsScore": 75,
  "breakdown": {
    "skills": 75,
    "experience": 80,
    "education": 70,
    "keywords": 65
  },
  "improvementChecklist": [
    "Add missing technical skills from the job description",
    "Improve the professional summary"
  ],
  "strengths": [
    "Strong SQL experience"
  ],
  "weaknesses": [
    "Missing some required job description keywords"
  ],
  "missingKeywords": [
    "Power BI",
    "Data Modeling"
  ],
  "summary": "A short and honest overall resume review."
}

IMPORTANT:
- All scores must be numbers between 0 and 100.
- atsScore must be an overall match estimate, not a guaranteed employer ATS result.
- Base your analysis only on the supplied resume and job description.
- Do not invent experience, qualifications or skills.
- Return valid JSON only. Do not include Markdown or code fences.
`;

    let response;
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });

        break;
      } catch (error) {
        const errorMessage = error.message || "";
        const isTemporary =
          error.status === 503 ||
          error.code === 503 ||
          errorMessage.includes("503") ||
          errorMessage.includes("UNAVAILABLE");

        if (!isTemporary || attempt === maxAttempts) {
          throw error;
        }

        console.log(
          `Gemini temporarily unavailable. Retrying (${attempt}/${maxAttempts})...`,
        );

        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * Math.pow(2, attempt - 1)),
        );
      }
    }

    const analysis = JSON.parse(response.text);

    console.log("Gemini analysis generated successfully");
    console.log("ATS Score:", analysis.atsScore);
    // STEP 5: Save resume analysis in MongoDB
    const savedResume = await Resume.create({
      jobTitle,
      companyName,
      description,
      resumeText,
      analysis,
    });

    console.log("Resume analysis saved in MongoDB");
    console.log("Saved Resume ID:", savedResume._id);

    // STEP 5: Send analysis to frontend
    return res.status(200).json({
      success: true,
      message: "Resume analyzed and saved successfully",
      resumeId: savedResume._id,
      analysis,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
