export default function SummaryScreen({ score, total, onRestart, onHome }) {
  const wrong = total - score;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="card summary-card">
      <div className="summary-emoji">
        {pct >= 80 ? '🎉' : pct >= 50 ? '📚' : '💪'}
      </div>
      <h1 className="summary-title">Session Complete</h1>
      <div className="summary-score">{pct}%</div>
      <div className="summary-stats">
        <div className="stat correct-stat">
          <span className="stat-number">{score}</span>
          <span className="stat-label">Correct</span>
        </div>
        <div className="stat-divider" />
        <div className="stat wrong-stat">
          <span className="stat-number">{wrong}</span>
          <span className="stat-label">Incorrect</span>
        </div>
      </div>
      <p className="summary-hint">
        Questions you missed will appear more often next session.
      </p>
      <div className="summary-actions">
        <button className="nav-btn back-btn" onClick={onHome}>
          ⌂ Home
        </button>
        <button className="nav-btn next-btn restart-btn" onClick={onRestart}>
          New Session →
        </button>
      </div>
    </div>
  );
}
