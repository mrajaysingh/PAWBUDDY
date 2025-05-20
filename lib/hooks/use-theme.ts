import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    setTheme(stored || systemPreference || 'dark');
  }, []);
  
  // Update theme in localStorage and document
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = window.document.documentElement;
    
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme };
}