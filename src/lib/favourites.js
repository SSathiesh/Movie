const STORAGE_PREFIX = 'movie-app-favourites';

const getStorageKey = (uid) => `${STORAGE_PREFIX}-${uid}`;

export function loadFavouriteMovies(uid) {
  if (!uid) return [];
  try {
    const raw = localStorage.getItem(getStorageKey(uid));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavouriteMovies(uid, movies) {
  if (!uid || !movies) return;
  try {
    localStorage.setItem(getStorageKey(uid), JSON.stringify(movies));
  } catch (error) {
    console.error('Unable to save favourites', error);
  }
}
