import OptionButton from './OptionButton';
import ProgressBar from './ProgressBar';

export default function QuestionCard({
  question,
  options,
  answer,
  currentIndex,
  totalQuestions,
  score,
  answeredCount,
  onSelect,
  onNext,
  onBack,
  onHome,
}) {
  const isAnswered = answer !== null;

  function getOptionState(option) {
    if (!isAnswered) return 'idle';
    const isCorrectOption = option.key === 'A';
    const isSelected = option.key === answer.selectedKey;

    if (isCorrectOption) return 'correct';
    if (isSelected && !answer.isCorrect) return 'wrong';
    return 'disabled';
  }

  return (
    <div className="card">
      <div className="card-header">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        <div className="card-header-right">
          <div className="score-badge">
            {score} / {answeredCount} correct
          </div>
          <button className="home-btn" onClick={onHome} aria-label="Go to home screen">
            ⌂
          </button>
        </div>
      </div>

      <div className="question-text">{question.question}</div>

      <div className="options-list">
        {options.map((option, idx) => (
          <OptionButton
            key={option.key}
            option={option}
            label={idx + 1}
            state={getOptionState(option)}
            onClick={() => onSelect(option.key)}
          />
        ))}
      </div>

      <div className="card-footer">
        <button
          className="nav-btn back-btn"
          onClick={onBack}
          disabled={currentIndex === 0}
        >
          ← Back
        </button>
        {isAnswered && (
          <button className="nav-btn next-btn" onClick={onNext}>
            {currentIndex === totalQuestions - 1 ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
