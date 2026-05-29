import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                <Link to="/" className="text-brand font-bold text-lg tracking-wide">
                    Sathiesh Movie List
                </Link>
                <nav className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <Link to="/favourites" className="hover:text-white">Favourites</Link>
                    {user?.email && (
                        <span className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs text-gray-200">
                            {user.email}
                        </span>
                    )}
                    <button
                        onClick={logout}
                        className="rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-200 hover:bg-gray-700"
                    >
                        Sign Out
                    </button>
                </nav>
            </div>
        </header>
    );
}
