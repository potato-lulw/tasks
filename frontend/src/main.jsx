import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Router, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeContextProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider>
    <BrowserRouter>

        <App />
    </BrowserRouter>
      </ThemeProvider>
  </StrictMode>,
)
