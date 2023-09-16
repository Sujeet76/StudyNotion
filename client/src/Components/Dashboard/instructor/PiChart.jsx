import { useState } from "react";

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip);

const PiChart = ({ chartData }) => {
  const [currChart, setCurrChart] = useState("students");
  const [isExpended, setIsExpended] = useState(false);

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataStudents = {
    labels: chartData.map((course) => course.courseName),
    datasets: [
      {
        data: chartData.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(chartData.length),
        borderColor: "#074B5D",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: chartData.map((course) => course.courseName),
    datasets: [
      {
        data: chartData.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(chartData.length),
      },
    ],
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
          <p className="text-lg font-bold text-richblack-5">Visualize</p>
        <div className="space-x-4 font-semibold">
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
              currChart === "students"
                ? "bg-richblack-700 text-yellow-50"
                : "text-yellow-400"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
              currChart === "income"
                ? "bg-richblack-700 text-yellow-50"
                : "text-yellow-400"
            }`}
          >
            Income
          </button>
        </div>
        <div
          className="relative mx-auto aspect-square h-full w-full"
          layoutId="chartInfo"
        >
          {/* Render the Pie chart based on the selected chart */}
          <Pie
            data={
              currChart === "students" ? chartDataStudents : chartIncomeData
            }
            options={options}
          />
        </div>
      </div>
    </>
  );
};

export default PiChart;
