import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Navbar from "./NavBar";
import Footer from "./Footer";

const questions = [
  {
    question: "What is the primary purpose of Dijkstra's Algorithm?",
    options: [
      "Find the shortest path in a weighted graph",
      "Find the longest path in a graph",
      "Sort elements in an array",
      "Find the minimum spanning tree",
    ],
    answer: 0,
  },
  {
    question: "What data structure is commonly used to implement Dijkstra's Algorithm efficiently?",
    options: ["Stack", "Queue", "Priority Queue (Min-Heap)", "Linked List"],
    answer: 2,
  },
  {
    question: "What is the time complexity of Dijkstra's Algorithm using a priority queue (Min-Heap)?",
    options: ["O(V^2)", "O(V log V + E log V)", "O(V + E)", "O(V log E)"],
    answer: 1,
  },
  {
    question: "Which of the following statements about Dijkstra’s Algorithm is TRUE?",
    options: [
      "It works with graphs having negative weights",
      "It guarantees the shortest path in all cases",
      "It uses depth-first search",
      "It is a greedy algorithm",
    ],
    answer: 3,
  },
  {
    question: "What happens if Dijkstra’s Algorithm encounters a negative weight edge?",
    options: [
      "It still finds the correct shortest path",
      "It enters an infinite loop",
      "It produces incorrect results",
      "It ignores the edge",
    ],
    answer: 2,
  },
];

const Quiz = () => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOptionChange = (index, optionIndex) => {
    if (!submitted) {
      setAnswers({ ...answers, [index]: optionIndex });
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setSubmitted(true);

    if (correctAnswers === questions.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setScore(null);
    setShowConfetti(false);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      <div className="flex-grow mt-20 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-xl border border-gray-100">
          {loading ? (
            <div className="text-center">
              <motion.div
                className="text-xl font-semibold text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                Generating Questions...
              </motion.div>
              {/* Skeleton Loader */}
              <div className="mt-6 space-y-4">
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-100 rounded-lg animate-pulse"
                  >
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="space-y-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 bg-clip-text text-transparent bg-black">
                Dijkstra's Algorithm Quiz
              </h2>
              <form>
                {questions.map((q, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="mb-6 p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <p className="font-medium text-gray-700 mb-3">
                      {index + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option, optionIndex) => {
                        const isCorrect = optionIndex === q.answer;
                        const isSelected = answers[index] === optionIndex;
                        let optionClass = "bg-white border border-gray-200 hover:bg-blue-50";

                        if (submitted) {
                          if (isSelected && isCorrect) {
                            optionClass = "bg-green-100 border border-green-500";
                          } else if (isSelected && !isCorrect) {
                            optionClass = "bg-red-100 border border-red-500";
                          } else if (isCorrect) {
                            optionClass = "bg-green-100 border border-green-500";
                          }
                        }

                        return (
                          <motion.label
                            key={optionIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: optionIndex * 0.1 }}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${optionClass}`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={optionIndex}
                              checked={isSelected}
                              onChange={() => handleOptionChange(index, optionIndex)}
                              className="mr-3"
                              disabled={submitted}
                            />
                            <span className="text-gray-700">{option}</span>
                          </motion.label>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
                {!submitted ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    Submit
                  </button>
                ) : (
                  <div className="mt-6 text-center">
                    <p className="text-2xl font-bold text-gray-800">Your Score: {score} / {questions.length}</p>
                    <button
                      onClick={handleRestart}
                      className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                    >
                      Restart Quiz
                    </button>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  );
};

export default Quiz;
