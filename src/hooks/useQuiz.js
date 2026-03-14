import { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import { loadAccuracy, saveAccuracy, recordAnswer, getAccuracyRate } from './useAccuracy';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Weighted-random sort: unseen questions first, then by ascending accuracy
// Uses a weighted random pick to avoid strict ordering
function weightedSort(questions, accuracy) {
  const weighted = questions.map((q) => {
    const rate = getAccuracyRate(accuracy, q.number);
    // null = never seen → weight 2.0 (highest priority)
    // rate 0.0 = always wrong → weight 1.5
    // rate 1.0 = always right → weight 0.1
    const weight = rate === null ? 2.0 : 1.5 - rate * 1.4 + 0.1;
    // Add noise so it's not strictly deterministic
    const noise = Math.random() * 0.5;
    return { q, score: weight + noise };
  });
  weighted.sort((a, b) => b.score - a.score);
  return weighted.map((w) => w.q);
}

function buildOptions(question) {
  const options = [
    { key: 'A', text: question.option_a },
    { key: 'B', text: question.option_b },
    { key: 'C', text: question.option_c },
    { key: 'D', text: question.option_d },
  ];
  return shuffleArray(options);
}

export function useQuiz() {
  const [questions, setQuestions] = useState([]);
  const [accuracy, setAccuracy] = useState({});
  const [sessionAnswers, setSessionAnswers] = useState([]); // per-question: { selectedKey, correctKey, options }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | quiz | summary

  useEffect(() => {
    const acc = loadAccuracy();
    setAccuracy(acc);

    Papa.parse('/questions.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data.map((row) => ({
          number: row.number,
          question: row.question,
          option_a: row.option_a,
          option_b: row.option_b,
          option_c: row.option_c,
          option_d: row.option_d,
          correct: 'A', // always A in source CSV
          state: row.state,
        }));
        const sorted = weightedSort(parsed, acc);
        // Build shuffled options per question upfront for the session
        const answers = sorted.map(() => null);
        setQuestions(sorted);
        setSessionAnswers(answers);
        setPhase('quiz');
      },
    });
  }, []);

  // Precomputed shuffled options per question, stable for the session
  const [questionOptions, setQuestionOptions] = useState([]);
  useEffect(() => {
    if (questions.length > 0 && questionOptions.length === 0) {
      setQuestionOptions(questions.map((q) => buildOptions(q)));
    }
  }, [questions]);

  const currentQuestion = questions[currentIndex] || null;
  const currentOptions = questionOptions[currentIndex] || [];
  const currentAnswer = sessionAnswers[currentIndex];

  const submitAnswer = useCallback((selectedKey) => {
    if (sessionAnswers[currentIndex] !== null) return; // already answered
    const isCorrect = selectedKey === 'A'; // correct is always option_a (key A)

    // Find what key 'A' got mapped to in the shuffled options
    const correctKey = currentOptions.find((o) => o.key === 'A')?.key ?? 'A';

    const newAnswers = [...sessionAnswers];
    newAnswers[currentIndex] = { selectedKey, isCorrect };
    setSessionAnswers(newAnswers);

    if (isCorrect) setScore((s) => s + 1);

    // Persist accuracy
    const newAcc = recordAnswer(accuracy, currentQuestion.number, isCorrect);
    setAccuracy(newAcc);
    saveAccuracy(newAcc);
  }, [sessionAnswers, currentIndex, currentOptions, accuracy, currentQuestion]);

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase('summary');
    }
  }, [currentIndex, questions.length]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const restart = useCallback(() => {
    const acc = loadAccuracy();
    setAccuracy(acc);
    const sorted = weightedSort(questions, acc);
    const newOptions = sorted.map((q) => buildOptions(q));
    setQuestions(sorted);
    setQuestionOptions(newOptions);
    setSessionAnswers(sorted.map(() => null));
    setScore(0);
    setCurrentIndex(0);
    setPhase('quiz');
  }, [questions]);

  const answeredCount = sessionAnswers.filter((a) => a !== null).length;

  return {
    phase,
    currentQuestion,
    currentOptions,
    currentAnswer,
    currentIndex,
    totalQuestions: questions.length,
    score,
    answeredCount,
    submitAnswer,
    goNext,
    goBack,
    restart,
  };
}
