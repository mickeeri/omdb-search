import fetch from 'so-fetch-js';

const API_URL = `http://www.omdbapi.com/?s=detroit&apikey=${
  process.env.REACT_APP_OMDB_API_KEY
}`;

export async function fetchMovies() {
  const response = await fetch(API_URL);

  if (response.isError) {
    throw new Error({ response, message: 'Search failed' });
  }

  console.log(response);

  return response;
}
