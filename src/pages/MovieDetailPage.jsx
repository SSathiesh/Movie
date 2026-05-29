import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails, imgUrl } from '../lib/tmdb';

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getMovieDetails(id, controller.signal)
      .then((result) => setMovie(result))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Unable to load movie details.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <div className="text-gray-300">Loading movie details...</div>;
  }

  if (error || !movie) {
    return <div className="text-red-200">{error || ''}</div>;
  }

  const poster = imgUrl(movie.poster_path, 'w500');

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm text-brand hover:text-white">← Back to search</Link>
      <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 shadow-sm">
          {poster ? (
            <img src={poster} alt={movie.title} className="w-full object-cover" />
          ) : (
            <div className="flex h-full min-h-[24rem] items-center justify-center bg-gray-800 text-gray-400">No poster available</div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
              <span>{movie.vote_average.toFixed(1)} / 10</span>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          <div className="grid gap-3 rounded-3xl border border-gray-800 bg-gray-900 p-6 text-sm text-gray-300">
            <div>
              <span className="font-semibold text-white">Genres:</span>{' '}
              {movie.genres.map((genre) => genre.name).join(', ')}
            </div>
            <div>
              <span className="font-semibold text-white">Status:</span> {movie.status}
            </div>
            <div>
              <span className="font-semibold text-white">Homepage:</span>{' '}
              {movie.homepage ? (
                <a href={movie.homepage} target="_blank" rel="noreferrer" className="text-brand hover:text-white">Visit</a>
              ) : (
                'N/A'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
