import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PlaylistProvider } from './providers/PlaylistProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlaylistProvider>
      <App />
    </PlaylistProvider>
  </StrictMode>,
)
