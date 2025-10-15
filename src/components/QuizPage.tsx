import React, { useState, useEffect } from 'react';
import Header from './Header.tsx';

interface Question {
  id: number;
  question: string;
  options: string[];
  reponseCorrecte: string;
  explication: string;
}

interface Quiz {
  id: string;
  titre: string;
  questions: Question[];
}

const QuizPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('/api/quiz');
        if (!response.ok) throw new Error('Erreur lors du chargement des quiz');
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Erreur:', error);
        // Fallback to db.json data
        const dbResponse = await fetch('/db.json');
        const dbData = await dbResponse.json();
        setQuizzes(dbData.quiz || []);
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
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;

    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.reponseCorrecte) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const handleRestartQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen page-bg">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          Chargement des quiz...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      <Header />

      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 troubles-title text-center">
            Testez vos connaissances
          </h1>

          {!selectedQuiz ? (
            // Liste des quiz disponibles
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => handleQuizSelect(quiz)}
                >
                  <h2 className="text-xl font-semibold mb-4 text-green-800">
                    {quiz.titre}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {quiz.questions.length} questions
                  </p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Commencer le quiz
                  </button>
                </div>
              ))}
            </div>
          ) : showResult ? (
            // Résultats du quiz
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-center text-green-800">
                Résultats du quiz
              </h2>
              <div className="text-center mb-6">
                <p className="text-lg mb-2">
                  Score: {score} / {selectedQuiz.questions.length}
                </p>
                <p className="text-gray-600">
                  {Math.round((score / selectedQuiz.questions.length) * 100)}% de bonnes réponses
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {selectedQuiz.questions.map((question, index) => (
                  <div key={question.id} className="border-b pb-4">
                    <p className="font-semibold mb-2">
                      Question {index + 1}: {question.question}
                    </p>
                    <p className="text-green-600">
                      Réponse correcte: {question.reponseCorrecte}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleRestartQuiz}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Refaire le quiz
                </button>
                <button
                  onClick={handleBackToQuizzes}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Retour aux quiz
                </button>
              </div>
            </div>
          ) : (
            // Question en cours
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">
                    Question {currentQuestionIndex + 1} / {selectedQuiz.questions.length}
                  </span>
                  <span className="text-sm text-gray-600">
                    Score: {score}
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-6">
                  {selectedQuiz.questions[currentQuestionIndex].question}
                </h2>

                <div className="space-y-3">
                  {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        selectedAnswer === option
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {showExplanation && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Explication:</h3>
                  <p className="text-blue-700">
                    {selectedQuiz.questions[currentQuestionIndex].explication}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                {!showExplanation && selectedAnswer && (
                  <button
                    onClick={handleShowExplanation}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Voir l'explication
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    selectedAnswer
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentQuestionIndex < selectedQuiz.questions.length - 1 ? 'Suivant' : 'Terminer'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
