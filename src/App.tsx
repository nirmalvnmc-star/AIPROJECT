import { useState } from 'react';
import { QuizGenerator } from './components/QuizGenerator';
import { QuizTaking } from './components/QuizTaking';
import { QuizResults } from './components/QuizResults';
import { Question, UserAnswer } from './types/quiz';

type AppState = 'generate' | 'taking' | 'results';

function App() {
  const [state, setState] = useState<AppState>('generate');
  const [currentQuizId, setCurrentQuizId] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<UserAnswer[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  const handleQuizGenerated = (quizId: string) => {
    setCurrentQuizId(quizId);
    setState('taking');
  };

  const handleQuizComplete = (answers: UserAnswer[], questions: Question[]) => {
    setQuizAnswers(answers);
    setQuizQuestions(questions);
    setState('results');
  };

  const handleRestart = () => {
    setCurrentQuizId('');
    setQuizAnswers([]);
    setQuizQuestions([]);
    setState('generate');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
      {state === 'generate' && (
        <QuizGenerator onQuizGenerated={handleQuizGenerated} />
      )}

      {state === 'taking' && (
        <QuizTaking quizId={currentQuizId} onComplete={handleQuizComplete} />
      )}

      {state === 'results' && (
        <QuizResults
          answers={quizAnswers}
          questions={quizQuestions}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
