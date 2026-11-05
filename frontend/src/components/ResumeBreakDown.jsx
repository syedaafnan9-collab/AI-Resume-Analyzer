import React from "react";

const ResumeBreakdown = () => {
  const categories = [
    { name: "Tone & Style", score: 55 },
    { name: "Structure", score: 75 },
    { name: "Content", score: 82 },
    { name: "Skills", score: 65 },
  ];

  return (
    <div className="w-full max-w-md bg-white m-6  p-5">
      <h2 className="text-xl font-bold text-[#1D2939] mb-6">
        Resume Breakdown
      </h2>

      <div className="flex flex-col gap-5">
        {categories.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-[#1D2939]">{item.name}</p>

              <p className="font-semibold text-[#475467]">{item.score}/100</p>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6E7AFF] rounded-full"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeBreakdown;
