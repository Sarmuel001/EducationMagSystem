import React, { useState, useEffect } from "react";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questionsData from "../Data/questions.json";
import Layout from "../../layout";
import { useNavigate } from "react-router-dom";



const ExamPage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const selectedYear = localStorage.getItem("selectedYear");
  const selectedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];

  const [questions, setQuestions] = useState({});
  const [currentSubject, setCurrentSubject] = useState(selectedSubjects[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(() => {
    const savedTime = localStorage.getItem("remainingTime");
    return savedTime ? parseInt(savedTime) : 7200;
  });
  const [isSubmitted, setIsSubmitted] = useState(() => {
    return localStorage.getItem("isSubmitted") === "true";
  });
// 🔐 Redirect if user is not logged in
useEffect(() => {
  if (!username) {
    toast.warning("Please log in to start the exam.", { position: "top-center" });
    navigate("/login"); 
  }
}, []);

// 🔄 Redirect if selectedYear or subjects are missing
useEffect(() => {
  if (!selectedYear || selectedSubjects.length === 0) {
    navigate("/login");
  }
}, []);
  // Load Questions
  useEffect(() => {
    const filteredYear = questionsData.find(q => q.year === selectedYear);
    if (filteredYear) {
      const filteredQuestions = {};
      selectedSubjects.forEach(subject => {
        if (filteredYear.subjects[subject]) {
          filteredQuestions[subject] = filteredYear.subjects[subject];
        }
      });
      setQuestions(filteredQuestions);
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        const newTime = prev - 1;
        localStorage.setItem("remainingTime", newTime);

        if (newTime === 60) {
          toast.warning("⏰ 1 minute remaining!", {
            position: "top-center",
            autoClose: 3000,
          });
        }

        if (newTime <= 0) {
          clearInterval(interval);
          handleSubmit(true); // auto submit
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Handle Answer Select
  const handleAnswerSelect = (questionId, answer) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [`${currentSubject}_${questionId}`]: answer,
    }));
  };

  // Navigation
  const nextQuestion = () => {
    if (currentQuestionIndex < questions[currentSubject].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const switchSubject = (subject) => {
    setCurrentSubject(subject);
    setCurrentQuestionIndex(0);
  };

  // Submission logic
  const handleSubmit = (auto = false) => {
    if (isSubmitted) return;

    let correctAnswers = 0;
    let totalQuestions = 0;

    Object.keys(questions).forEach(subject => {
      questions[subject].forEach(q => {
        totalQuestions++;
        if (answers[`${subject}_${q.id}`] === q.answer) {
          correctAnswers++;
        }
      });
    });

    toast.success(
      `✅ Exam submitted! Score: ${correctAnswers} / ${totalQuestions}`,
      { position: "top-center", autoClose: 5000 }
    );

    setIsSubmitted(true);
    localStorage.setItem("isSubmitted", "true");

    setTimeout(() => {
      // Clear all exam-related localStorage and redirect
      localStorage.removeItem("username");
      localStorage.removeItem("selectedYear");
      localStorage.removeItem("selectedSubjects");
      localStorage.removeItem("remainingTime");
      localStorage.removeItem("isSubmitted");
      navigate("/");
    }, 6000);
  };

  return (
    <Layout>
      <ToastContainer/>
      <br /><br /><br /><br /><br />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Exam for {username}</h2>
        <p>
          Time Left: {Math.floor(timer / 60)}m {timer % 60}s
        </p>

        {/* Subject Buttons */}
        <div>
          {selectedSubjects.map(subject => (
            <button
              key={subject}
              onClick={() => switchSubject(subject)}
              disabled={isSubmitted}
              style={{
                padding: "10px",
                margin: "5px",
                background: currentSubject === subject ? "green" : "#ccc",
                color: "#fff"
              }}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Question View */}
        {questions[currentSubject] && (
          <div>
            <h3>{questions[currentSubject][currentQuestionIndex].question}</h3>
            {questions[currentSubject][currentQuestionIndex].options.map(option => (
              <div key={option}>
                <input
                  type="radio"
                  name={`q${questions[currentSubject][currentQuestionIndex].id}`}
                  value={option}
                  disabled={isSubmitted}
                  checked={
                    answers[
                      `${currentSubject}_${questions[currentSubject][currentQuestionIndex].id}`
                    ] === option
                  }
                  onChange={() =>
                    handleAnswerSelect(
                      questions[currentSubject][currentQuestionIndex].id,
                      option
                    )
                  }
                />
                {option}
              </div>
            ))}
            <br />

            <button onClick={prevQuestion} disabled={currentQuestionIndex === 0 || isSubmitted}>
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={
                currentQuestionIndex === questions[currentSubject].length - 1 || isSubmitted
              }
            >
              Next
            </button>
          </div>
        )}

        <br />
        <button
          onClick={() => handleSubmit(false)}
          disabled={isSubmitted}
          style={{ padding: "10px", marginTop: "10px", background: "red", color: "#fff" }}
        >
          Submit Exam
        </button>
      </div>
    </Layout>
  );
};

export default ExamPage;


// import React, { useState, useEffect } from "react";
// import questionsData from "../Data/questions.json"; // Import questions
// import Layout from "../../layout";


// const ExamPage = () => {
//   const username = localStorage.getItem("username") || "Guest";
//   const selectedYear = localStorage.getItem("selectedYear");
//   const selectedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];

//   const [questions, setQuestions] = useState({});
//   const [currentSubject, setCurrentSubject] = useState(selectedSubjects[0]); // Default to first subject
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timer, setTimer] = useState(72);

//   // Load Questions from JSON
//   useEffect(() => {
//     const filteredYear = questionsData.find(q => q.year === selectedYear);
//     if (filteredYear) {
//       const filteredQuestions = {};
//       selectedSubjects.forEach(subject => {
//         if (filteredYear.subjects[subject]) {
//           filteredQuestions[subject] = filteredYear.subjects[subject];
//         }
//       });
//       setQuestions(filteredQuestions);
//     }
//   }, []);
//   // }, [selectedYear, selectedSubjects]);

//   // Timer Logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           alert("Time up! Submitting exam...");
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Handle Answer Selection
//   const handleAnswerSelect = (questionId, answer) => {
//     setAnswers({ ...answers, [`${currentSubject}_${questionId}`]: answer });
//   };

//   // Navigation between questions
//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions[currentSubject].length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   // Switch Subjects
//   const switchSubject = (subject) => {
//     setCurrentSubject(subject);
//     setCurrentQuestionIndex(0);
//   };

//   // Handle Exam Submission
//   const handleSubmit = () => {
//     let correctAnswers = 0;
//     let totalQuestions = 0;

//     Object.keys(questions).forEach(subject => {
//       questions[subject].forEach(q => {
//         totalQuestions++;
//         if (answers[`${subject}_${q.id}`] === q.answer) {
//           correctAnswers++;
//         }
//       });
//     });

//     alert(`Exam Submitted!\nScore: ${correctAnswers} / ${totalQuestions}`);
//   };

//   return (
//     <Layout>
//       <br />  <br /> <br /> <br /> <br />
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Exam for {username}</h2>
//       <p>Time Left: {Math.floor(timer / 60)}m {timer % 60}s</p>

//       {/* Subject Selector */}
//       <div>
//         {selectedSubjects.map(subject => (
//           <button
//             key={subject}
//             onClick={() => switchSubject(subject)}
//             style={{
//               padding: "10px",
//               margin: "5px",
//               background: currentSubject === subject ? "green" : "#ccc",
//               color: "#fff"
//             }}
//           >
//             {subject}
//           </button>
//         ))}
//       </div>

//       {/* Display Questions */}
//       {questions[currentSubject] && (
//         <div>
//           <h3>{questions[currentSubject][currentQuestionIndex].question}</h3>
//           {questions[currentSubject][currentQuestionIndex].options.map(option => (
//             <div key={option}>
//               <input
//                 type="radio"
//                 name={`q${questions[currentSubject][currentQuestionIndex].id}`}
//                 value={option}
//                 checked={answers[`${currentSubject}_${questions[currentSubject][currentQuestionIndex].id}`] === option}
//                 onChange={() => handleAnswerSelect(questions[currentSubject][currentQuestionIndex].id, option)}
//               />
//               {option}
//             </div>
//           ))}
//           <br />

//           {/* Navigation Buttons */}
//           <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
//           <button onClick={nextQuestion} disabled={currentQuestionIndex === questions[currentSubject].length - 1}>Next</button>
//         </div>
//       )}

//       <br />
//       <button onClick={handleSubmit} style={{ padding: "10px", marginTop: "10px", background: "red", color: "#fff" }}>Submit Exam</button>
//     </div>
//     </Layout>
//   );
// };

// export default ExamPage;

// import React, { useState, useEffect } from "react";
// import questionsData from "../Data/questions.json";
// import Layout from "../../layout";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export const ExamPage = () => {
//   const username = localStorage.getItem("username") || "Guest";
//   const selectedYear = localStorage.getItem("selectedYear");
//   const selectedSubjects = JSON.parse(localStorage.getItem("selectedSubjects")) || [];

//   const [questions, setQuestions] = useState({});
//   const [currentSubject, setCurrentSubject] = useState(selectedSubjects[0]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [timer, setTimer] = useState(50); // 2 hours in seconds
//   const [submitted, setSubmitted] = useState(false);

   

//   // Load Questions from JSON
//   useEffect(() => {
//     const filteredYear = questionsData.find(q => q.year === selectedYear);
//     if (filteredYear) {
//       const filteredQuestions = {};
//       selectedSubjects.forEach(subject => {
//         if (filteredYear.subjects[subject]) {
//           filteredQuestions[subject] = filteredYear.subjects[subject];
//         }
//       });
//       setQuestions(filteredQuestions);
//     }
//   }, []);

  

//   // Timer Logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prev => {
        
//         if (prev === 61) {
//           // Show toast warning 1 minute before time ends
//         setTimeout(()=>{  
//             toast.warning( "⏰ 1 minute remaining! Exam will automatically submitted after 1 minute", {
//             position: "top-left",
//             textAlign: "center",
//             autoClose: 30000,
//           });
//         },0)
//         };
//         if (prev === 31) {
//           // Show toast warning 1 minute before time ends
//         setTimeout(()=>{  
//             toast.warning( "⏰ 31 seconds remaining! Exam will automatically submitted after 31 seconds", {
//             position: "bottom-right",
//             textAlign: "center",
//             color:'red',
//             autoClose: 30000,
//           });
//         },0)
//         };

//         if (prev <= 1) {
//           clearInterval(interval);
//           setTimeout(autoSubmit, 0); // ✅ Schedule after render to avoid warning
//           return 0;
//         }
            
      
//         return prev - 1;
//       });
//     }, 1000);
  
//     return () => clearInterval(interval);
//   }, []);
  
  
//   const autoSubmit = () => {
//     if (!submitted) {
//       handleSubmit();
//     }
//   };

//   // Handle Answer Selection
//   const handleAnswerSelect = (questionId, answer) => {
//     setAnswers({ ...answers, [`${currentSubject}_${questionId}`]: answer });
//   };

//   // Navigation
//   const nextQuestion = () => {
//     if (currentQuestionIndex < questions[currentSubject].length - 1) {
//       setCurrentQuestionIndex(prev => prev + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(prev => prev - 1);
//     }
//   };

//   const switchSubject = (subject) => {
//     setCurrentSubject(subject);
//     setCurrentQuestionIndex(0);
//   };

//   const handleSubmit = () => {
//     let correctAnswers = 0;
//     let totalQuestions = 0;

    
    
//       Object.keys(questions).forEach(subject => {
//         questions[subject].forEach(q => {
//           totalQuestions++;
//           if (answers[`${subject}_${q.id}`] === q.answer) {
//             correctAnswers++;
//           }
//         });
//       });
    
//       toast.success(`✅ Time's up! Exam auto-submitted. Your score: ${correctAnswers} / ${totalQuestions}`, {
//         position: "top-center",
//         autoClose: 5000,
//       });
    

//     };
    

//   return (
//     <Layout>
//       <ToastContainer />
//       <br /><br /><br /><br /><br />
//       <div style={{ textAlign: "center", padding: "20px" }}>
//         <h2>Exam for {username}</h2>
//         <p>Time Left: {Math.floor(timer / 60)}m {timer % 60}s</p>

//         {/* Subject Buttons */}
//         <div>
//           {selectedSubjects.map(subject => (
//             <button
//               key={subject}
//               onClick={() => switchSubject(subject)}
//               style={{
//                 padding: "10px",
//                 margin: "5px",
//                 background: currentSubject === subject ? "green" : "#ccc",
//                 color: "#fff"
//               }}
//             >
//               {subject}
//             </button>
//           ))}
//         </div>

//         {/* Questions */}
//         {questions[currentSubject] && (
//           <div>
//             <h3>{questions[currentSubject][currentQuestionIndex].question}</h3>
//             {questions[currentSubject][currentQuestionIndex].options.map(option => (
//               <div key={option}>
//                 <input
//                   type="radio"
//                   name={`q${questions[currentSubject][currentQuestionIndex].id}`}
//                   value={option}
//                   checked={answers[`${currentSubject}_${questions[currentSubject][currentQuestionIndex].id}`] === option}
//                   onChange={() => handleAnswerSelect(questions[currentSubject][currentQuestionIndex].id, option)}
//                 />
//                 {option}
//               </div>
//             ))}
//             <br />
//             <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
//             <button onClick={nextQuestion} disabled={currentQuestionIndex === questions[currentSubject].length - 1}>Next</button>
//           </div>
//         )}

//         <br />
//         {!submitted && (
//           <button
//             onClick={handleSubmit}
//             style={{ padding: "10px", marginTop: "10px", background: "red", color: "#fff" }}
//           >
//             Submit Exam
//           </button>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ExamPage;

