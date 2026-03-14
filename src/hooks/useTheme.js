import { useState, useEffect } from 'react';

const STORAGE_KEY = 'einbuergerung_theme';

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY) || 'forest'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'forest' ? 'slate' : 'forest'));

  return { theme, toggle };
}
