import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout";
import { ToastContainer } from "react-toastify";

/* ===============================
   HELPERS
================================ */
const shuffleExceptFirstFive = (questions) => {
  if (questions.length <= 5) return questions.map((q, i) => ({ ...q, id: i + 1 }));

  const firstFive = questions.slice(0, 5);
  const rest = [...questions.slice(5)];

  // Shuffle the rest
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }

  // Assign sequential IDs after shuffling
  return [...firstFive, ...rest].map((q, index) => ({ ...q, id: index + 1, }));
};

/* ===============================
   MAIN COMPONENT
================================ */
const ExamPage = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const selectedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];
  const selectedYear = localStorage.getItem("selectedYear");

  const submittedKey = `examSubmitted_${username}`;
  const answersKey = `answers_${username}`;
  const visitedKey = `visited_${username}`;
  const timerKey = `examEndTime_${username}`;

  /* ===============================
     SESSION GUARD
  ================================ */
  useEffect(() => {
    const submitted = localStorage.getItem(submittedKey);

    if (!username || !selectedSubjects || selectedSubjects.length === 0 || !selectedYear || submitted === "true") {
      navigate("/");
    }
  }, [navigate, submittedKey, username, selectedSubjects, selectedYear]);

  /* ===============================
     STATE
  ================================ */
  const [questions, setQuestions] = useState({});
  const [currentSubject, setCurrentSubject] = useState(selectedSubjects[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem(answersKey)) || {});
  const [visited, setVisited] = useState(JSON.parse(localStorage.getItem(visitedKey)) || {});
  const [timer, setTimer] = useState(() => {
    const endTime = localStorage.getItem(timerKey);
    if (!endTime) return 0;
    return Math.floor((Number(endTime) - Date.now()) / 1000);
  });
  const [showTools, setShowTools] = useState(false);

  /* ===============================
     FETCH QUESTIONS
  ================================ */
  const hasLoaded =useRef(false)
  useEffect(() => {
    if(hasLoaded.current) return;
    hasLoaded.current=true;
    const loadQuestions = async () => {
      const loaded = {};

      for (let subject of selectedSubjects) {
        const res = await fetch(`/questions/${subject.toLowerCase()}.json`);
        const data = await res.json();

        const subjectQuestions = data[subject]?.[selectedYear] || [];
        loaded[subject] = shuffleExceptFirstFive(subjectQuestions);
      }

      setQuestions(loaded);
    };

    loadQuestions();
  }, [selectedSubjects, selectedYear]);

  /* ===============================
     SUBMIT
  ================================ */
  const handleSubmit = () => {
    if (localStorage.getItem(submittedKey) === "true") return; // prevent multiple submits

    localStorage.setItem(submittedKey, "true");

    // Clear all exam data for this user immediately
    localStorage.removeItem(timerKey);
    localStorage.removeItem(answersKey);
    localStorage.removeItem(visitedKey);

    navigate("/examResult", {
      state: { questions, answers, selectedSubjects, username },
    });
  };

  /* ===============================
     TIMER (40 MINUTES)
  ================================ */
  useEffect(() => {
    if (!localStorage.getItem(timerKey)) {
      const end = Date.now() + 40 * 60 * 1000; // 40 minutes
      localStorage.setItem(timerKey, end);
    }

    const tick = () => {
      const end = Number(localStorage.getItem(timerKey));
      const remaining = Math.floor((end - Date.now()) / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        handleSubmit();
      } else {
        setTimer(remaining);
      }
    };

    const interval = setInterval(tick, 1000);
    tick();

    return () => clearInterval(interval);
  }, []);

  /* ===============================
     CURRENT QUESTION
  ================================ */
  const currentQ = questions[currentSubject]?.[currentIndex];

  /* ===============================
     ANSWERS
  ================================ */
  const selectAnswer = (option) => {
    if (!currentQ) return;
    const key = `${currentSubject}_${currentQ.id}`;
    const updated = { ...answers, [key]: option };
    setAnswers(updated);
    localStorage.setItem(answersKey, JSON.stringify(updated));
  };

  /* ===============================
     VISITED QUESTIONS
  ================================ */
  useEffect(() => {
    if (!currentQ) return;
    const key = `${currentSubject}_${currentQ.id}`;
    const updatedVisited = { ...visited, [key]: true };
    setVisited(updatedVisited);
    localStorage.setItem(visitedKey, JSON.stringify(updatedVisited));
  }, [currentIndex, currentSubject]);

  /* ===============================
     NAVIGATION
  ================================ */
  const nextQuestion = () => {
    if (currentIndex < questions[currentSubject].length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
    }
  };

  const jumpToQuestion = (index) => setCurrentIndex(index);
  const switchSubject = (sub) => {
    setCurrentSubject(sub);
    setCurrentIndex(0);
  };

  /* ===============================
     RENDER
  ================================ */
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 bg-gray-800 text-white p-4 flex flex-col">
          {/* Desktop Quick Tools */}
          <div className="hidden md:block">
            <h2 className="text-sm font-semibold mb-2">User Profile:<br></br>{username}</h2>
            
            <h3 className="text-sm font-semibold mt-6 mb-2">Subjects</h3>
            <ul className="space-y-1">
              {selectedSubjects.map((sub) => (
                <li
                  key={sub}
                  onClick={() => switchSubject(sub)}
                  className={`cursor-pointer px-3 py-2 rounded text-sm ${
                    currentSubject === sub
                      ? "bg-green-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {sub}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Top Bar */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setShowTools(true)}
              className="bg-green-600 px-3 py-2 rounded text-sm text-white"
            >
              Quick Tools
            </button>

            <select
              className="border p-2 rounded bg-gray-700 text-white flex-1 ml-2"
              value={currentSubject}
              onChange={(e) => switchSubject(e.target.value)}
            >
              {selectedSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {showTools && <DraggableTools setShowTools={setShowTools} />}
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white p-3 rounded shadow space-y-2 md:space-y-0">
            <div className="font-semibold text-sm">{currentSubject}</div>
            <div className="font-semibold text-sm">
              Question {currentIndex + 1} / {questions[currentSubject]?.length}
            </div>
            <div
              className={`px-4 py-2 rounded font-bold text-white ${
                timer <= 300 ? "bg-red-600 animate-pulse" : "bg-green-600"
              }`}
            >
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </div>
          </div>

          {/* QUESTION */}
          {currentQ && (
            <div className="bg-white shadow rounded p-6 mt-4">
              <p className="font-semibold mb-4">{currentQ.question}</p>

              <div className="space-y-3">
                {["A", "B", "C", "D"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      checked={answers[`${currentSubject}_${currentQ.id}`] === opt}
                      onChange={() => selectAnswer(opt)}
                    />
                    <span>({opt}) {currentQ[opt]}</span>
                  </label>
                ))}
              </div>

              {/* NAV */}
              <div className="flex justify-between items-center mt-6">
                <div className="space-x-2">
                  <button
                    onClick={prevQuestion}
                    className="px-4 py-2 bg-gray-600 text-white rounded"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Next
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-red-600 text-white rounded font-semibold"
                >
                  Submit Test
                </button>
              </div>
            </div>
          )}

          {/* QUESTION GRID */}
          <div className="mt-6 grid grid-cols-10 gap-2">
            {questions[currentSubject]?.map((q, index) => {
              const key = `${currentSubject}_${q.id}`;
              const answered = answers[key];
              const visitedQ = visited[key];

              let bg = "bg-gray-400";
              if (answered) bg = "bg-green-600";
              else if (visitedQ) bg = "bg-red-600";

              return (
                <button
                  key={q.id}
                  onClick={() => jumpToQuestion(index)}
                  className={`${bg} text-white text-sm py-1 rounded`}
                  title={answered ? "Answered" : visitedQ ? "Visited" : "Not visited"}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

/* ===============================
   DRAGGABLE TOOLS
================================ */
function DraggableTools({ setShowTools }) {
  const panelRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setDragging(true);
    setRel({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
  };

  const onMouseUp = () => setDragging(false);

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    setDragging(true);
    setRel({ x: touch.clientX - pos.x, y: touch.clientY - pos.y });
    e.preventDefault();
  };

  const onTouchMove = (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    setPos({ x: touch.clientX - rel.x, y: touch.clientY - rel.y });
  };

  const onTouchEnd = () => setDragging(false);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  });

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        ref={panelRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="absolute bg-gray-800 text-white rounded p-4 w-3/4 max-w-sm cursor-move"
        style={{ left: pos.x, top: pos.y }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Quick Tools</h3>
          <button onClick={() => setShowTools(false)} className="text-red-600 font-bold">X</button>
        </div>
        <div className="space-y-2">
          <button className="w-full bg-green-600 py-2 rounded text-sm">Calculator</button>
          <button className="w-full bg-green-600 py-2 rounded text-sm">Rough Sheet</button>
        </div>
      </div>
    </div>
  );
}

export default ExamPage;
