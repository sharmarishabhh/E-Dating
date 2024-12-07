// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Import Material UI ThemeProvider and createTheme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Optional for consistent styles

// Create a Material UI theme (you can customize it as needed)
const theme = createTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}> {/* Provide the theme to your app */}
    <CssBaseline /> {/* Reset baseline CSS */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

// Measure performance (optional)
reportWebVitals();
