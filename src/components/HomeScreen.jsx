export default function HomeScreen({ uniqueSeen, totalQuestions, onStart }) {
  const pct = totalQuestions > 0 ? Math.round((uniqueSeen / totalQuestions) * 100) : 0;

  return (
    <div className="card home-card">
      <div className="home-title">Einbürgerungstest</div>
      <div className="home-subtitle">German Citizenship Test Practice</div>

      <div className="home-stats">
        <div className="home-stat-ring">
          <svg viewBox="0 0 80 80" className="ring-svg">
            <circle cx="40" cy="40" r="34" className="ring-track" />
            <circle
              cx="40" cy="40" r="34"
              className="ring-fill"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
            />
          </svg>
          <div className="ring-label">
            <span className="ring-pct">{pct}%</span>
            <span className="ring-sub">covered</span>
          </div>
        </div>

        <div className="home-stat-text">
          <div className="home-stat-number">{uniqueSeen}<span className="home-stat-total"> / {totalQuestions}</span></div>
          <div className="home-stat-desc">unique questions seen</div>
        </div>
      </div>

      <button className="nav-btn next-btn home-start-btn" onClick={onStart}>
        {uniqueSeen === 0 ? 'Start →' : 'Continue →'}
      </button>
    </div>
  );
}
