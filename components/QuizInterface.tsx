"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RigvedaVerse, QuizQuestion } from "@/types/rigveda";
import { getRandomVerses } from "@/lib/rigveda-data";

interface Props {
  verses: RigvedaVerse[];
}

export default function QuizInterface({ verses }: Props) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );

  const generateQuiz = async () => {
    setLoading(true);
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);

    try {
      const randomVerses = getRandomVerses(verses, 10);
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verses: randomVerses,
          count: 5,
          difficulty,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const questionsWithIds = data.questions.map((q: any, i: number) => ({
        ...q,
        id: `q-${i}`,
      }));

      setQuestions(questionsWithIds);
    } catch (error: any) {
      alert(`Failed to generate quiz: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border border-coral-200/50">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center text-5xl animate-bounce">
              🎉
            </div>
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Quiz Complete!
            </h2>
          </div>

          <div className="bg-gradient-to-br from-coral-100 to-coral-100 rounded-2xl p-8 mb-8">
            <div className="text-7xl font-bold gradient-text mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-2xl text-coral-800">
              You scored {percentage.toFixed(0)}%
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={restartQuiz}
              size="lg"
              className="border-2 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-coral-50 btn-hover shadow-lg"
            >
              🔄 New Quiz
            </Button>
            
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-coral-200/50">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center text-4xl">
              🎯
            </div>
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Generate a Quiz
            </h2>
            <p className="text-lg text-coral-800/70">
              Test your knowledge of the Rigveda with AI-generated questions
            </p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-coral-900 mb-4 text-center">
              Select Difficulty Level
            </label>
            <div className="flex gap-3 justify-center">
              {(["easy", "medium", "hard"] as const).map((level) => (
                <Button
                  key={level}
                  size="lg"
                  variant={difficulty === level ? "default" : "outline"}
                  onClick={() => setDifficulty(level)}
                  className={
                    difficulty === level
                      ? "bg-gradient-to-r from-coral-500 to-coral-600 text-coral-50 shadow-lg"
                      : "border-2 border-coral-300 text-coral-900 hover:bg-coral-100"
                  }
                >
                  {level === "easy" && "😊"} {level === "medium" && "🤔"}{" "}
                  {level === "hard" && "🔥"}{" "}
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={generateQuiz}
            disabled={loading}
            size="lg"
            className="w-full bg-gradient-to-r border-2 from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-coral-50 text-lg py-6 btn-hover shadow-xl"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating Quiz...
              </>
            ) : (
              <>✨ Start Quiz</>
            )}
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-coral-200/50">
        <div className="flex justify-between items-center mb-8">
          <Badge className="bg-gradient-to-r from-coral-500 to-coral-600 text-coral-50 px-4 py-2 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-green-50 px-4 py-2 text-sm">
            Score: {score}
          </Badge>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-coral-900 mb-6 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = selectedAnswer !== null && isCorrect;
              const showIncorrect =
                selectedAnswer !== null && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-5 text-left rounded-2xl border-2 transition-all duration-300 ${
                    showCorrect
                      ? "border-green-500 bg-green-50 shadow-lg scale-105"
                      : showIncorrect
                      ? "border-red-500 bg-red-50 shadow-lg"
                      : isSelected
                      ? "border-coral-500 bg-coral-50"
                      : "border-coral-200 hover:border-coral-400 hover:bg-coral-50 hover:shadow-md"
                  } ${
                    selectedAnswer === null
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        showCorrect
                          ? "bg-green-500 text-green-50"
                          : showIncorrect
                          ? "bg-red-500 text-red-50"
                          : "bg-coral-100 text-coral-900"
                      }`}
                    >
                      {showCorrect
                        ? "✓"
                        : showIncorrect
                        ? "✗"
                        : String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 text-gray-800 font-medium">
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedAnswer !== null && (
          <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold text-blue-900 mb-2">Explanation:</p>
                <p className="text-blue-800 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedAnswer !== null && (
          <Button
            onClick={nextQuestion}
            size="lg"
            className="w-full border-2 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-coral-50 btn-hover shadow-lg"
          >
            {currentQuestion < questions.length - 1
              ? "Next Question →"
              : "See Results 🎉"}
          </Button>
        )}
      </div>
    </div>
  );
}
