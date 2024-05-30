import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeConfig } from './styles/theme.config.tsx'
import './styles/estilosCss.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeConfig>
        <App />
    </ThemeConfig>
  </React.StrictMode>,
)
