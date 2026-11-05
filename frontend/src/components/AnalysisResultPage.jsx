import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ScoreChart from "./ScoreChart";
import ResumeBreakdown from "./ResumeBreakDown";

export const AnalysisResultPage = () => {
  const location = useLocation();

  const { jobTitle, companyName, resumeFile, analysis } = location.state || {};

  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    if (!resumeFile) return;

    const url = URL.createObjectURL(resumeFile);
    setResumeUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [resumeFile]);

  console.log("Job Title:", jobTitle);
  console.log("Company:", companyName);
  console.log("AI Analysis:", analysis);

  if (!location.state) {
    return <p>No resume data found. Please upload your resume again.</p>;
  }

  return (
    <>
      <h2 className="text-2xl md:text-3xl text-[#1D2939] font-bold p-2 m-2">
        Resume Review
      </h2>

      <div className="flex flex-col lg:flex-row gap-5 w-full justify-around items-stretch px-3 md:px-5 pt-2 mt-2">
        {/* Left side - Resume Preview */}
        <div className="left-container w-full lg:w-1/2 h-[550px] md:h-[700px] lg:h-[850px] border shadow-md border-gray-300 rounded-2xl overflow-hidden">
          {resumeUrl ? (
            resumeFile.type === "application/pdf" ? (
              <iframe
                src={resumeUrl}
                title="Uploaded Resume"
                className="w-full h-full"
              />
            ) : (
              <img
                src={resumeUrl}
                alt="Uploaded Resume"
                className="w-full h-full object-contain"
              />
            )
          ) : (
            <p className="text-center p-4">No resume uploaded</p>
          )}
        </div>

        {/* Right side - Analysis */}
        <div className="right-container w-full lg:w-1/2 min-h-[550px] lg:min-h-[850px] border shadow-md border-gray-300 rounded-2xl overflow-y-auto p-3 md:p-5">
          <h2 className="text-xl md:text-2xl text-[#1D2939] font-bold pt-1 pl-2 md:pl-6 m-1">
            {jobTitle}
          </h2>

          <h2 className="text-xl md:text-2xl text-[#1D2939] font-bold pl-2 md:pl-6 m-1">
            {companyName}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className="w-full sm:w-1/2">
              <ScoreChart score={analysis?.atsScore} />
            </div>

            <div className="w-full sm:w-1/2">
              <ResumeBreakdown scores={analysis?.breakdown} />
            </div>
          </div>

          {/* Complete AI Resume Summary */}
          <div className="mt-6 px-2 md:px-6 pb-6">
            <h2 className="text-xl font-bold text-[#1D2939] mb-4">
              AI Resume Summary
            </h2>

            {/* Overall Summary */}
            <div className="mb-5">
              <h3 className="font-semibold text-[#1D2939] mb-2">
                Overall Review
              </h3>

              <p className="text-gray-600 text-sm leading-6">
                {analysis?.summary || "No summary available."}
              </p>
            </div>

            {/* Strengths */}
            <div className="mb-5">
              <h3 className="font-semibold text-green-700 mb-2">Strengths</h3>

              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                {analysis?.strengths?.length > 0 ? (
                  analysis.strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No strengths available.</li>
                )}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="mb-5">
              <h3 className="font-semibold text-red-600 mb-2">Weaknesses</h3>

              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                {analysis?.weaknesses?.length > 0 ? (
                  analysis.weaknesses.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No weaknesses available.</li>
                )}
              </ul>
            </div>

            {/* Missing Keywords */}
            <div className="mb-5">
              <h3 className="font-semibold text-[#1D2939] mb-2">
                Missing Keywords
              </h3>

              <div className="flex flex-wrap gap-2">
                {analysis?.missingKeywords?.length > 0 ? (
                  analysis.missingKeywords.map((item, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No major missing keywords identified.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisResultPage;
