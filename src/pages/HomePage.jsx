import { useEffect, useRef, useState } from 'react';
import { getWeeklyTrendingMovies, searchMovies } from '../lib/tmdb';
import { useAuth } from '../context/AuthContext';
import { loadFavouriteMovies, saveFavouriteMovies } from '../lib/favourites';
import MovieCard from '../components/MovieCard';

export default function HomePage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    setFavourites(loadFavouriteMovies(user.uid));
  }, [user]);

  useEffect(() => {
    if (!user) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    const trimmedQuery = query.trim();
    const timer = setTimeout(() => {
      const fetcher = trimmedQuery
        ? searchMovies(trimmedQuery, controller.signal)
        : getWeeklyTrendingMovies(controller.signal);

      fetcher
        .then((results) => {
          setMovies(results || []);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            setError('Unable to load movies. Please try again.');
            setMovies([]);
          }
        })
        .finally(() => setLoading(false));
    }, 450);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, user]);

  const favouriteIds = new Set(favourites.map((movie) => movie.id));

  const updateFavourites = (nextFavourites) => {
    setFavourites(nextFavourites);
    if (user) {
      saveFavouriteMovies(user.uid, nextFavourites);
    }
  };

  const toggleFavourite = (movie) => {
    const alreadyFavourite = favouriteIds.has(movie.id);
    const next = alreadyFavourite
      ? favourites.filter((item) => item.id !== movie.id)
      : [movie, ...favourites];
    updateFavourites(next);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Movie Search</h1>
          <p className="text-sm text-gray-400">Search TMDB for movies and add them to your favourites list.</p>
        </div>

        <input
          id="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a movie title..."
          className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-brand"
        />
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">{query.trim() ? 'Search results' : 'Trending movies'}</h2>
          <p className="text-sm text-gray-500">{favourites.length} favourite{favourites.length === 1 ? '' : 's'} saved</p>
        </div>

        {error && <div className="rounded-3xl border border-red-700 bg-red-950/60 p-4 text-red-200">{error}</div>}

        {loading ? (
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-12 text-center text-gray-400">Loading movies...</div>
        ) : movies.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavourite={favouriteIds.has(movie.id)}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-700 bg-gray-900 p-12 text-center text-gray-500">
            {query.trim()
              ? 'No movies matched your search. Try a different title.'
              : 'No movies available yet. Start typing to search TMDB.'}
          </div>
        )}
      </section>
    </div>
  );
}
