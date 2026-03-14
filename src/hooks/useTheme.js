import { useState, useEffect } from 'react';

const STORAGE_KEY = 'einbuergerung_theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || 'forest';
    // Apply immediately (before first render) so html background is correct
    document.documentElement.setAttribute('data-theme', saved);
    return saved;
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'forest' ? 'slate' : 'forest'));

  return { theme, toggle };
}
