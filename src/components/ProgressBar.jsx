export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">
        Question {current} of {total}
      </span>
    </div>
  );
}
