import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PlaylistsPage from './pages/PlaylistsPage';
import PlaylistTracksPage from './pages/PlaylistTracksPage';
import SearchTracksPage from './pages/SearchTracksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PlaylistsPage />} />
          <Route path="playlists/:id" element={<PlaylistTracksPage />} />
          <Route path="playlists/:id/search" element={<SearchTracksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
