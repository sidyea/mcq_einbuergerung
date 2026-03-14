export default function OptionButton({ option, label, state, onClick }) {
  // state: 'idle' | 'correct' | 'wrong' | 'disabled'
  return (
    <button
      className={`option-btn option-${state}`}
      onClick={onClick}
      disabled={state !== 'idle'}
    >
      <span className="option-letter">{label}</span>
      <span className="option-text">{option.text}</span>
    </button>
  );
}
