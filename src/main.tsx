import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import { WebDataProvider } from './app/contexts/webData'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebDataProvider>
      <App />
    </WebDataProvider>
  </StrictMode>
)
