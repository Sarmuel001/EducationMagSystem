import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubjectSelection = () => {
  const navigate = useNavigate();

  // English is compulsory
  const COMPULSORY_SUBJECT = "English";

  const availableSubjects = [
    "Mathematics",
   
    "Literature",
    "CRS",
    "Biology",
    "Physics",
    "Chemistry",
    "Accounting",
    "Economics",
    "Commerce",
    "Government",
    "French",
    "IRS",
  ];

  // English auto-selected
  const [selectedSubjects, setSelectedSubjects] = useState([COMPULSORY_SUBJECT]);

  const toggleSubject = (subject) => {
    // English cannot be unchecked
    if (subject === COMPULSORY_SUBJECT) return;

    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects((prev) =>
        prev.filter((sub) => sub !== subject)
      );
    } else {
      if (selectedSubjects.length >= 4) {
        toast.warning("You can only select a maximum of 4 subjects.", {
          position: "top-center",
        });
        return;
      }
      setSelectedSubjects((prev) => [...prev, subject]);
    }
  };

  const proceedToExam = () => {
    if (!selectedSubjects.includes(COMPULSORY_SUBJECT)) {
      toast.error("English is compulsory.", { position: "top-center" });
      return;
    }

    localStorage.setItem(
      "selectedSubjects",
      JSON.stringify(selectedSubjects)
    );

    navigate("/exams");
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <ToastContainer />

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/back.jpg')] bg-cover bg-center blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/20 border border-black/40 backdrop-blur-lg p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-semibold mb-2">
            Select Subjects
          </h2>
          <p className="text-sm mb-4 font-semibold">
            English is compulsory (Max: 4 subjects)
          </p>

          <div className="space-y-2 mb-4 text-left">
            {[COMPULSORY_SUBJECT, ...availableSubjects].map((subject) => (
              <label key={subject} className="block cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject)}
                  disabled={subject === COMPULSORY_SUBJECT}
                  onChange={() => toggleSubject(subject)}
                  className="mr-2"
                />
                {subject}
                {subject === COMPULSORY_SUBJECT && (
                  <span className="text-red-600 font-semibold ml-1">
                    (Compulsory)
                  </span>
                )}
              </label>
            ))}
          </div>

          <button
            onClick={proceedToExam}
            className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-900 w-full"
          >
            Proceed to Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelection;
