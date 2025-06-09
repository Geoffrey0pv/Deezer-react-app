import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import PlaylistPage from './pages/PlaylistPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
        <Route path="/search" element={<Search/>} />
        {/* Puedes agregar más rutas aquí según sea necesario */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
