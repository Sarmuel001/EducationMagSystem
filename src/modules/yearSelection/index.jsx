import React from "react";
import { useNavigate } from "react-router-dom";
import SubjectSelection from "../subjectSelection";

const YearSelection = () => {
  const navigate = useNavigate(SubjectSelection);
  const years = ["2023", "2022", "2021"];

  const selectYear = (year) => {
    localStorage.setItem("selectedYear", year);
    navigate("../subjectSelection");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Select Exam Year</h2>
      {years.map((year) => (
        <button key={year} onClick={() => selectYear(year)} style={{ display: "block", margin: "10px auto" }}>
          {year}
        </button>
      ))}
    </div>
  );
};

export default YearSelection;
