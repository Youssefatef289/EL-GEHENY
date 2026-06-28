import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './i18n'
import { ThemeProvider } from './theme'
import { SiteDataProvider } from './context/SiteDataProvider'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SiteDataProvider>
        <LanguageProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LanguageProvider>
      </SiteDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
