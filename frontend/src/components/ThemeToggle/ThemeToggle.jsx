import { useTheme } from '../../hooks/useTheme.js';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'midnight';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isDark ? 'manuscript' : 'midnight')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`${isDark ? 'Light' : 'Dark'} mode`}
    >
      <span>{isDark ? '☼' : '☾'}</span>
    </button>
  );
}
