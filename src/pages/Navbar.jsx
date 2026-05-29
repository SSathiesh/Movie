import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { use } from 'react';

export default function Navbar() {

    const { user, login, logout } = useAuth();

     console.log('User:', user, login);

    const onLogout = () => {
        // Implement logout logic here
        console.log('Logout button clicked');
        logout();
    }

    const onLogin = () => {
        // Implement login logic here
        console.log('User:', user, login);
        // console.log('Login button clicked');
        login();
    }

    return (
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
                <Link to="/" className="text-brand font-bold text-lg tracking-wide">
                    Sathiesh Movie List
                </Link>
                <nav className="flex gap-4 text-sm">
                    <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    <Link to="/watchlist" className="text-gray-300 hover:text-white">Watchlist</Link>

                    {user ? (
                        <>
                            <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
                            {user.email && <span className="text-gray-300">{user.email}</span>}
                            <button onClick={onLogout}>Logout</button>
                        </>
                    ) : (
                        <button onClick={onLogin}>Login</button>
                    )}
                </nav>

            </div>
        </header>
    );
}