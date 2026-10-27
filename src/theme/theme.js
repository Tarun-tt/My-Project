import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e84a72',
      light: '#ff7a9c',
      dark: '#c72e57',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7b5364',
      light: '#a97f91',
      dark: '#52303f',
    },
    background: {
      default: '#fff7f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#38252c',
      secondary: '#876d76',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Inter", "Segoe UI", Roboto, Arial, sans-serif',
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
          padding: '11px 24px',
          boxShadow: 'none',
          fontWeight: 700,
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 24,
        },
      },
    },
  },
});

export default theme;
