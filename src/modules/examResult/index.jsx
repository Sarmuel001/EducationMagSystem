import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../layout";

const ExamResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers, questions, selectedSubjects } = location.state || {};

  if (!answers || !questions) {
    return (
      <Layout>
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">No results found.</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
          >
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }

  // Calculate scores
  const subjectScores = {};
  let totalCorrect = 0;
  let totalQuestions = 0;

  selectedSubjects.forEach((subject) => {
    let correct = 0;
    questions[subject].forEach((q) => {
      totalQuestions++;
      if (answers[`${subject}_${q.id}`] === q.answer) {
        correct++;
        totalCorrect++;
      }
    });
    subjectScores[subject] = {
      correct,
      total: questions[subject].length,
    };
  });

  return (

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Exam Result</h2>

        {selectedSubjects.map((subject) => (
          <div key={subject} className="mb-6 p-4 border rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-3">{subject}</h3>
            <p className="font-bold mb-2">
              Score: {subjectScores[subject].correct} / {subjectScores[subject].total}
            </p>

            <div className="space-y-2">
              {questions[subject].map((q, index) => {
                const key = `${subject}_${q.id}`;
                const userAnswer = answers[key];
                return (
                  <div key={q.id} className="p-2 border-b">
                    <p className="font-semibold">
                      Q{index + 1}: {q.question}
                    </p>
                    {userAnswer ? (
                      <p>
                        Your Answer:{" "}
                        <span
                          className={`font-bold ${
                            userAnswer === q.answer ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {userAnswer} ({q[userAnswer]})
                        </span>
                      </p>
                    ) : (
                      <p className="text-red-600 font-bold">You did not answer this question</p>
                    )}
                    <p>Correct Answer: <span className="font-bold">{q.answer} ({q[q.answer]})</span></p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center mt-6">
          <p className="text-xl font-bold mb-4">
            Total Score: {totalCorrect} / {totalQuestions}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
 
  );
};

export default ExamResult;
