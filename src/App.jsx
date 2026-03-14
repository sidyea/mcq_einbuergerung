import { useQuiz } from './hooks/useQuiz';
import { useTheme } from './hooks/useTheme';
import QuestionCard from './components/QuestionCard';
import SummaryScreen from './components/SummaryScreen';
import './App.css';

export default function App() {
  const { theme, toggle } = useTheme();
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

  const toggleIcon = theme === 'forest' ? '🌙' : '🌿';

  return (
    <>
      <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
        {toggleIcon}
      </button>

      <div className="app-bg">
        {phase === 'loading' && (
          <div className="card loading-card">
            <div className="loading-spinner" />
            <p>Loading questions…</p>
          </div>
        )}

        {phase === 'summary' && (
          <SummaryScreen score={score} total={totalQuestions} onRestart={restart} />
        )}

        {phase === 'quiz' && (
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
        )}
      </div>
    </>
  );
}
