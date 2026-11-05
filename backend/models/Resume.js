import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    analysis: {
      atsScore: Number,
      breakdown: {
        skills: Number,
        experience: Number,
        education: Number,
        keywords: Number,
      },
      summary: String,
      strengths: [String],
      weaknesses: [String],
      missingKeywords: [String],
    },
  },
  {
    timestamps: true,
  },
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
