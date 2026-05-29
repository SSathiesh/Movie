import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setBusy(true);

    try {
      await login();
    } catch (err) {
      console.error('Sign in failed', err);
      setError('Unable to sign in. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-gray-800 bg-gray-900 p-10 shadow-xl">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-3 text-sm text-gray-400">Sign in with your Google account to search movies and save favourites.</p>

        {error && <div className="mt-6 rounded-3xl border border-red-700 bg-red-950/70 p-4 text-red-200">{error}</div>}

        <button
          onClick={handleSignIn}
          disabled={busy}
          className="mt-8 w-full rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? 'Signing in…' : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
}
