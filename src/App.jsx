import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import FavouritesPage from './pages/FavouritesPage';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="rounded-xl border border-gray-700 bg-gray-900 px-6 py-5 shadow-lg">Checking authentication...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {user && <Navbar />}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/" element={<RequireAuth><HomePage /></RequireAuth>} />
          <Route path="/favourites" element={<RequireAuth><FavouritesPage /></RequireAuth>} />
          <Route path="/movie/:id" element={<RequireAuth><MovieDetailPage /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
          <Route path="*" element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
        </Routes>

      </main>
    </div>
  );
}