import { Trophy, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { Question, UserAnswer } from '../types/quiz';

interface QuizResultsProps {
  answers: UserAnswer[];
  questions: Question[];
  onRestart: () => void;
}

export function QuizResults({ answers, questions, onRestart }: QuizResultsProps) {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage === 100) return 'Perfect Score!';
    if (percentage >= 80) return 'Excellent Work!';
    if (percentage >= 60) return 'Good Job!';
    if (percentage >= 40) return 'Keep Practicing!';
    return 'Try Again!';
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-6">
              <Trophy className="w-16 h-16 text-blue-600" />
            </div>
          </div>

          <h2 className={`text-3xl font-bold mb-2 ${getPerformanceColor()}`}>
            {getPerformanceMessage()}
          </h2>

          <div className="text-5xl font-bold text-gray-800 mb-2">
            {correctCount}/{totalQuestions}
          </div>

          <p className="text-gray-600">
            You scored {percentage}%
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Question Review
          </h3>

          <div className="space-y-4">
            {questions.map((question, idx) => {
              const answer = answers[idx];
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border-2 ${
                    answer.isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start">
                    {answer.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-2">
                        {idx + 1}. {question.question_text}
                      </p>
                      <div className="text-sm space-y-1">
                        <p className="text-gray-700">
                          <span className="font-medium">Your answer:</span>{' '}
                          <span className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                            {answer.selectedAnswer}
                          </span>
                        </p>
                        {!answer.isCorrect && (
                          <p className="text-gray-700">
                            <span className="font-medium">Correct answer:</span>{' '}
                            <span className="text-green-700">{question.correct_answer}</span>
                          </p>
                        )}
                        <p className="text-gray-600 mt-2">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Generate New Quiz
        </button>
      </div>
    </div>
  );
}
