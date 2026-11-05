
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const ScoreChart = ({ score = 0 }) => {

  const chartData = [
    { name: "ATS Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  return (
    <>
      <div className="max-w-sm flex flex-row justify-center w-full bg-neutral-primary-soft p-4 md:p-6">

        <div className="py-6" id="donut-chart">

          <h2 className="text-xl font-semibold text-center mb-2">
            ATS Score
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#6E7AFF" />
                <Cell fill="#FA7185" />
              </Pie>

              <Tooltip />

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[#1D2939] font-bold text-3xl"
              >
                {score}%
              </text>

            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-5 mt-2">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#6E7AFF]"></span>
              <span className="text-sm text-gray-600">ATS Score</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FA7185]"></span>
              <span className="text-sm text-gray-600">Remaining</span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreChart;
