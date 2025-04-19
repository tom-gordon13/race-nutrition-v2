import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './Home';
import './App.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
