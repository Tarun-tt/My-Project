import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const ThemeModeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
});

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem('pranklab-theme');
      return saved ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pranklab-theme', mode);
    } catch {
      // ignore
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => {
    const isDark = mode === 'dark';
    return createTheme({
      palette: {
        mode,
        primary: {
          main: '#e84a72',
          light: '#ff7a9c',
          dark: '#c72e57',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        background: {
          default: isDark ? '#0f172a' : '#fff7f8',
          paper: isDark ? '#1e293b' : '#ffffff',
        },
        text: {
          primary: isDark ? '#f8fafc' : '#38252c',
          secondary: isDark ? '#94a3b8' : '#7b626c',
        },
      },
      typography: {
        fontFamily: '"DM Sans", "Inter", "Segoe UI", Roboto, sans-serif',
        button: {
          textTransform: 'none',
          fontWeight: 700,
        },
      },
      shape: {
        borderRadius: 18,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 999,
              padding: '10px 22px',
              boxShadow: 'none',
              fontWeight: 700,
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            rounded: {
              borderRadius: 22,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeModeContext);
