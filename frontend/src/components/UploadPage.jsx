
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeResume } from "./Services/ResumeApi";

export const UploadPage = () => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setResumeFile(file || null);

    console.log("Resume selected:", file);
  };

  const handleSubmit = async () => {

  if (
    !jobTitle.trim() ||
    !companyName.trim() ||
    !description.trim() ||
    !resumeFile
  ) {
    alert("Please fill in all fields and upload a resume.");
    return;
  }

  const data = new FormData();
  data.append("jobTitle", jobTitle);
  data.append("companyName", companyName);
  data.append("description", description);
  data.append("resume", resumeFile);

  console.log("FormData file:", data.get("resume"));

  try {
    const response = await analyzeResume(data);

    console.log("Backend response:", response);

    navigate("/analysisresultpage", {
      state: {
        jobTitle,
        companyName,
        description,
        resumeFile: resumeFile,
        analysis: response.analysis,
      },
    });

  } catch (error) {
    console.error("Resume analysis error:", error);
    alert(error.message);
  }
};

  return (
    <div className="upload-container w-full max-w-[700px] mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8">
      {/* Resume Upload */}
      <div className="upload-header flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="file"
          className="file-input border border-gray-200 text-gray-400 p-3 rounded-2xl w-full min-w-0"
          onChange={handleFileChange}
        />

        <button className="btn btn-primary px-5 py-3 bg-[#6E7AFF] text-white rounded-2xl whitespace-nowrap w-full sm:w-auto">
          Upload Resume
        </button>
      </div>

      {/* Heading */}
      <div className="upload-info flex flex-col items-center text-center gap-2 mt-8">
        <h1 className="head text-[#1D2939] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Smart feedback
          <br />
          for your dream jobs
        </h1>

        <p className="text-base sm:text-lg text-[#475467] p-2">
          Drop your resume for an ATS Score and improvement tips.
        </p>
      </div>

      {/* Form */}
      <div className="upload-form flex flex-col gap-3 mt-6 w-full">
        <label className="text-base sm:text-lg font-medium text-[#1D2939]">
          Company Name
        </label>

        <input
          type="text"
          className="border border-gray-200 text-gray-700 p-3 sm:p-4 rounded-2xl w-full min-w-0"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label className="text-base sm:text-lg font-medium text-[#1D2939]">
          Job Title
        </label>

        <input
          type="text"
          className="border border-gray-200 text-gray-700 p-3 sm:p-4 rounded-2xl w-full min-w-0"
          placeholder="Enter job title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <label className="text-base sm:text-lg font-medium text-[#1D2939]">
          Job Description
        </label>

        <textarea
          rows="5"
          className="border border-gray-200 text-gray-700 p-3 sm:p-4 rounded-2xl w-full min-w-0 resize-y"
          placeholder="Write a clear and concise job description with responsibilities and expectations"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="text-base sm:text-lg font-medium text-[#1D2939]">
          Upload Resume
        </label>

        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="border border-gray-200 text-gray-400 p-3 sm:p-4 rounded-2xl w-full min-w-0"
          onChange={handleFileChange}
        />
      </div>

      {/* Analyze Button */}
      <button
        className="btn btn-primary mt-6 p-3 sm:p-4 w-full bg-[#6E7AFF] text-white rounded-2xl font-medium"
        onClick={handleSubmit}
      >
        Save & Analyze Resume
      </button>
    </div>
  );
};

export default UploadPage;
