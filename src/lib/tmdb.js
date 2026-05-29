const BASE = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const HEADERS = {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
};

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('TMDB request failed');
    }
    return response.json();
}

export function getWeeklyTrendingMovies(signal) {
    return fetch(`${BASE}/trending/movie/week`, { headers: HEADERS, signal })
        .then(handleResponse)
        .then((data) => data.results || []);
}

export function searchMovies(query, signal) {
    return fetch(`${BASE}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`, {
        headers: HEADERS,
        signal,
    })
        .then(handleResponse)
        .then((data) => data.results || []);
}

export function getMovieDetails(id, signal) {
    return fetch(`${BASE}/movie/${id}`, { headers: HEADERS, signal })
        .then(handleResponse);
}

export const imgUrl = (path, size = 'w500') =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null;