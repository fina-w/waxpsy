import React, { useState, useEffect } from "react";
import { QuizListSkeleton } from "./skeletons";
import { API_BASE_URL } from "../config";

interface Question {
  id: number;
  text: string;
  options: string[];
  scores: number[];
}

interface Quiz {
  id: number;
  theme: string;
  description: string;
  questions: Question[];
  interpretation: {
    [key: string]: string;
  };
}

const QuizPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/quizzes`);
        if (!response.ok) throw new Error("Erreur lors du chargement des quiz");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Erreur:", error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  const handleAnswerSelect = (answer: string, answerIndex: number) => {
    setSelectedAnswer(answer);
    setSelectedAnswerIndex(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswerIndex === null || !selectedQuiz) return;

    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const questionScore = currentQuestion.scores[selectedAnswerIndex] || 0;
    setScore((prevScore) => prevScore + questionScore);

    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setSelectedAnswerIndex(null);
    } else {
      setShowResult(true);
    }
  };

  const getInterpretation = (score: number): string => {
    if (!selectedQuiz) return "";

    const ranges = Object.keys(selectedQuiz.interpretation);
    for (const range of ranges) {
      const [min, max] = range.split("-").map(Number);
      if (score >= min && score <= max) {
        return selectedQuiz.interpretation[range];
      }
    }
    return "";
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <QuizListSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-10">
      <div className="container mx-auto px-4 py-8">
        {!selectedQuiz ? (
          // Page d'accueil des quiz
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Tests de santé mentale
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Répondez à nos questionnaires pour mieux comprendre votre état
                émotionnel et obtenir des conseils personnalisés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-green-600 text-xl font-bold">
                        Q{quiz.id}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {quiz.theme}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {quiz.description}
                    </p>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>⏱️ {quiz.questions.length} questions</span>
                      <span>📊 Test en ligne</span>
                    </div>
                    <button
                      onClick={() => handleQuizSelect(quiz)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    >
                      Commencer le test
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : showResult ? (
          // Page des résultats
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">
                  {score}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Résultats du test
              </h2>
              <p className="text-gray-600 mb-1">
                Vous avez complété le test{" "}
                <span className="font-medium">{selectedQuiz.theme}</span>
              </p>
              <p className="text-gray-500 text-sm mb-8">
                Score: {score} sur {selectedQuiz.questions.length * 3}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-left mb-8 rounded-r">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      {getInterpretation(score)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleRestartQuiz}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Refaire le test
                </button>
                <button
                  onClick={handleBackToQuizzes}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Voir tous les tests
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Page du quiz en cours
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-8">
              {/* En-tête avec progression */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>
                    Question {currentQuestionIndex + 1} sur{" "}
                    {selectedQuiz.questions.length}
                  </span>
                  <span>
                    {Math.round(
                      (currentQuestionIndex / selectedQuiz.questions.length) *
                        100
                    )}
                    % complété
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (currentQuestionIndex / selectedQuiz.questions.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {selectedQuiz.questions[currentQuestionIndex].text}
                </h2>

                <div className="space-y-3">
                  {selectedQuiz.questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedAnswer === option
                            ? "border-green-500 bg-green-50 scale-[1.02]"
                            : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                        }`}
                        onClick={() => handleAnswerSelect(option, index)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-3 ${
                              selectedAnswer === option
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedAnswer === option && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className="text-gray-800">{option}</span>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleBackToQuizzes}
                    className="text-gray-600 hover:text-gray-800 font-medium flex items-center text-sm"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Retour aux tests
                  </button>

                  {selectedAnswer && (
                    <button
                      onClick={handleNextQuestion}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      {currentQuestionIndex < selectedQuiz.questions.length - 1
                        ? "Question suivante"
                        : "Voir les résultats"}
                      <svg
                        className="w-4 h-4 ml-2 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
