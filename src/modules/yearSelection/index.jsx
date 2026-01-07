import React from "react";
import { useNavigate } from "react-router-dom";
import SubjectSelection from "../subjectSelection";

const YearSelection = () => {
  const navigate = useNavigate(SubjectSelection);
  const years = ["2025","2024","2023", "2022", "2021"];

  const selectYear = (year) => {
    localStorage.setItem("selectedYear", year);
    navigate("../subjectSelection");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-[url('/back.jpg')] bg-cover bg-center filter blur-sm z-0"></div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/20 border border-black/40 backdrop-blur-lg p-6 rounded-lg shadow-md max-w-sm w-full text-center">
          <h2 className="text-xl font-semibold mb-6 text-black">Select Exam Year</h2>

          <div className="space-y-4">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => selectYear(year)}
                className="w-full bg-blue-950 text-white py-2 rounded hover:bg-blue-900"
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearSelection;
