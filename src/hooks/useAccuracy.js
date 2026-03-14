const STORAGE_KEY = 'einbuergerung_accuracy';

export function loadAccuracy() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveAccuracy(accuracy) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accuracy));
}

export function recordAnswer(accuracy, questionNumber, isCorrect) {
  const prev = accuracy[questionNumber] || { correct: 0, total: 0 };
  return {
    ...accuracy,
    [questionNumber]: {
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    },
  };
}

export function getAccuracyRate(accuracy, questionNumber) {
  const entry = accuracy[questionNumber];
  if (!entry || entry.total === 0) return null; // never seen
  return entry.correct / entry.total;
}
