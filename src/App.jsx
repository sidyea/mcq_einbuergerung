import { useQuiz } from './hooks/useQuiz';
import { useTheme } from './hooks/useTheme';
import HomeScreen from './components/HomeScreen';
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
    uniqueSeen,
    submitAnswer,
    goNext,
    goBack,
    startQuiz,
    goHome,
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

        {phase === 'home' && (
          <HomeScreen
            uniqueSeen={uniqueSeen}
            totalQuestions={totalQuestions}
            onStart={startQuiz}
          />
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
            onHome={goHome}
          />
        )}

        {phase === 'summary' && (
          <SummaryScreen score={score} total={totalQuestions} onRestart={startQuiz} onHome={goHome} />
        )}
      </div>
    </>
  );
}
