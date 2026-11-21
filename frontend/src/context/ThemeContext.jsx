import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext();

const THEME_KEY = 'poetry-theme';

export function ThemeProvider({ children }) {
  const getPreferredTheme = () => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'midnight' || stored === 'manuscript') return stored;
    } catch {
      // Theme persistence is optional when browser storage is unavailable.
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'midnight' : 'manuscript';
  };

  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    document.documentElement.classList.remove('manuscript', 'midnight');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Theme persistence is optional when browser storage is unavailable.
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
