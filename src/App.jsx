import { useQuiz } from './hooks/useQuiz';
import QuestionCard from './components/QuestionCard';
import SummaryScreen from './components/SummaryScreen';
import './App.css';

export default function App() {
  const {
    phase,
    currentQuestion,
    currentOptions,
    currentAnswer,
    currentIndex,
    totalQuestions,
    score,
    answeredCount,
    submitAnswer,
    goNext,
    goBack,
    restart,
  } = useQuiz();

  if (phase === 'loading') {
    return (
      <div className="app-bg">
        <div className="card loading-card">
          <div className="loading-spinner" />
          <p>Loading questions…</p>
        </div>
      </div>
    );
  }

  if (phase === 'summary') {
    return (
      <div className="app-bg">
        <SummaryScreen score={score} total={totalQuestions} onRestart={restart} />
      </div>
    );
  }

  return (
    <div className="app-bg">
      <QuestionCard
        question={currentQuestion}
        options={currentOptions}
        answer={currentAnswer}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        score={score}
        answeredCount={answeredCount}
        onSelect={submitAnswer}
        onNext={goNext}
        onBack={goBack}
      />
    </div>
  );
}
