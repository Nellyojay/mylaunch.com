import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import { WebDataProvider } from './app/contexts/webData'
import { AuthProvider } from './app/contexts/authContext'
import { UserDataProvider } from './app/contexts/userDataContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebDataProvider>
      <AuthProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </AuthProvider>
    </WebDataProvider>
  </StrictMode>
)
