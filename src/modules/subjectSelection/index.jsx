import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamPage from "../exams";

const SubjectSelection = () => {
  const navigate = useNavigate(ExamPage);
  const [selectedSubjects, setSelectedSubjects] = useState(["Mathematics", "English"]);
  const availableSubjects = ["Physics", "Biology", "Chemistry", "Economics"];

  const toggleSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((sub) => sub !== subject));
    } else if (selectedSubjects.length < 4) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const proceedToExam = () => {
    localStorage.setItem("selectedSubjects", JSON.stringify(selectedSubjects));
    navigate("../exams");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Select Subjects (Math & English are compulsory)</h2>
      {availableSubjects.map((subject) => (
        <div key={subject}>
          <input type="checkbox" onChange={() => toggleSubject(subject)} checked={selectedSubjects.includes(subject)} />
          {subject}
        </div>
      ))}
      <button onClick={proceedToExam} style={{ marginTop: "10px" }}>Proceed to Exam</button>
    </div>
  );
};

export default SubjectSelection;
