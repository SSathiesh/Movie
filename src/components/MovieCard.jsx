import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { imgUrl, getMovieDetails } from '../lib/tmdb';

export default function MovieCard({ movie, isFavourite = false, onToggleFavourite, actionLabel }) {
  const poster = imgUrl(movie.poster_path || movie.backdrop_path, 'w500');
  const title = movie.title || movie.name || 'Untitled';
  const overview = movie.overview || 'No description available.';
  const truncatedOverview = overview.length > 120 ? `${overview.slice(0, 120)}...` : overview;
  const buttonIcon = isFavourite ? '★' : '☆';

  return (
    <article className="h-full flex flex-col group bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-sm transition hover:shadow-lg">
      <div className="relative overflow-hidden flex-shrink-0">
        {poster ? (
          <Link to={`/movie/${movie.id}`} className="block">
            <img src={poster} alt={title} className="h-80 w-full object-cover" />
          </Link>
        ) : (
          <div className="flex h-80 items-center justify-center bg-gray-800 text-gray-400">No image available</div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4 flex-1">
        <Link to={`/movie/${movie.id}`} className="group block flex-1 min-h-0">
          <h2 className="text-lg font-semibold text-white group-hover:text-brand transition">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">{truncatedOverview}</p>
        </Link>

        <div className="flex flex-col gap-3 border-t border-gray-700 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div>
                <span className="font-semibold text-gray-200">{movie.release_date ? new Date(movie.release_date).toLocaleDateString() : '—'}</span>
                <div className="text-xs">Release</div>
              </div>
              <div>
                <Runtime movie={movie} />
                <div className="text-xs">Runtime</div>
              </div>
              <div>
                <span className="font-semibold text-gray-200">{movie.vote_average ? movie.vote_average.toFixed(1) : '—'}</span>
                <div className="text-xs">Rating</div>
              </div>
            </div>

            {onToggleFavourite && (
            <button
              type="button"
              onClick={() => onToggleFavourite(movie)}
              aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
              className={`inline-flex items-center justify-center rounded-full p-3 text-sm font-semibold transition ${isFavourite ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
            >
              <span aria-hidden="true">{buttonIcon}</span>
            </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}


function Runtime({ movie }) {
  const [runtime, setRuntime] = useState(movie.runtime || null);

  useEffect(() => {
    if (runtime || !movie.id) return;
    const controller = new AbortController();

    getMovieDetails(movie.id, controller.signal)
      .then((d) => {
        if (d && d.runtime) setRuntime(d.runtime);
      })
      .catch(() => {
        /* ignore */
      });

    return () => controller.abort();
  }, [movie.id, runtime]);

  return <span className="font-semibold text-gray-200">{runtime ? `${runtime} min` : '—'}</span>;
}
