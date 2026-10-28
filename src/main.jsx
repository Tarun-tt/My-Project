import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeModeProvider } from './context/ThemeContext.jsx';
import './styles.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeModeProvider>
        <App />
      </ThemeModeProvider>
    </React.StrictMode>
  );
}
