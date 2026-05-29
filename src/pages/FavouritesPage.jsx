import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loadFavouriteMovies, saveFavouriteMovies } from '../lib/favourites';
import MovieCard from '../components/MovieCard';

export default function FavouritesPage() {
  const { user } = useAuth();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (!user) return;
    setFavourites(loadFavouriteMovies(user.uid));
  }, [user]);

  const removeFavourite = (movie) => {
    const next = favourites.filter((item) => item.id !== movie.id);
    setFavourites(next);
    saveFavouriteMovies(user.uid, next);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Your Favourites</h1>
        <p className="text-sm text-gray-400">All saved movies are stored for this account and persist across refreshes.</p>
      </section>

      {favourites.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-700 bg-gray-900 p-12 text-center text-gray-400">
          <p className="text-lg font-medium text-white">No favourites yet.</p>
          <p className="mt-2">Start searching and add movies to your favourites list.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favourites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavourite
              onToggleFavourite={removeFavourite}
              actionLabel="Remove"
            />
          ))}
        </div>
      )}
    </div>
  );
}
