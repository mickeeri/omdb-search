import fetch from 'so-fetch-js';
import { stringify } from 'query-string';

const API_URL = 'http://www.omdbapi.com/';

export async function fetchMovies(query = 'detroit') {
  const queryStrings = {
    apikey: process.env.REACT_APP_OMDB_API_KEY,
    s: query,
    type: 'movie',
  };

  const response = await fetch(`${API_URL}?${stringify(queryStrings)}`);

  console.log(response);

  if (response.isError) {
    throw new Error(response);
  }

  return response.data.Search || [];
}
