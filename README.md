# My Movie List

This is a starter project built for ReactJS training. The idea is simple, it's a movie browsing app where users can search for films, check out details, and save titles to a personal watchlist. Most of the boilerplate (routing, auth, API wiring) is already in place so you can jump straight into the React parts that matter.

The app uses **React 19**, **Vite**, **Tailwind CSS**, **React Router**, **Firebase** for Google sign-in, and the **TMDB API** for movie data.

## What's already set up

Here's a quick overview of the `src/` folder so you know what's there before you start:

```
src/
├── components/
│   ├── MovieCard.jsx    # card UI for a single movie — needs building out
│   ├── Navbar.jsx       # top nav with links
│   └── SearchBar.jsx    # search input component
├── context/             # auth state management — leave this as-is
├── lib/
│   ├── firebase.js      # Firebase app setup
│   └── tmdb.js          # TMDB base URL, auth headers, and image URL helper
└── pages/
    ├── HomePage.jsx         # where the movie listing will live
    ├── MovieDetailPage.jsx  # detail view for a single movie (/movie/:id)
    ├── ProfilePage.jsx      # user profile
    └── WatchListPage.jsx    # the user's saved watchlist
```

The pages are mostly empty stubs — that's intentional, it's where you'll be building.

## Getting started

You'll need Node.js 18+ on your machine. Before running anything, you also need to grab two sets of API credentials.

**TMDB** — sign up for a free account at [themoviedb.org](https://www.themoviedb.org/), then go to Settings → API and generate a Read Access Token (v4 auth).

**Firebase** — create a new project at the [Firebase Console](https://console.firebase.google.com/), enable the Google sign-in provider under Authentication, then register a web app to get your config values.

Once you have those, clone the repo and install dependencies:

```bash
npm install
```

Create a `.env` file in the project root with the following:

```env
VITE_TMDB_TOKEN=your_tmdb_read_access_token
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

Then start the dev server:

```bash
npm run dev
```

The app should be running at `http://localhost:5173`.

## Other scripts

- `npm run build` — builds for production
- `npm run preview` — previews the production build locally
- `npm run lint` — runs ESLint
