const fetch = require('node-fetch');
const { URL } = require('url');
const { query } = require('./lib/hasura');

exports.handler = async () => {
  const { movies } = await query({
    query: `
    query allMovies {
      movies {
        title
        tagline
        poster
        id
      }
    }`,
  });

  const BASE_URL = new URL('https://omdbapi.com');
  const API_KEY = process.env.OMDB_API_KEY;
  BASE_URL.searchParams.set('apikey', API_KEY);

  const moviesWithRatingsPromise = movies.map((movie) => {
    BASE_URL.searchParams.set('i', movie.id);

    return fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        const ratings = data.Ratings;
        return {
          ...movie,
          ratings,
        };
      });
  });

  const moviesWithRatings = await Promise.all(moviesWithRatingsPromise);

  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings),
  };
};
