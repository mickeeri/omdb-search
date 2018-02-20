import { stringify } from 'query-string';
import { get } from 'axios';

const API_URL = 'https://www.omdbapi.com/';

export async function fetchMovies(query) {
  const queryStrings = {
    apikey: '901124cd',
    s: query,
    type: 'movie',
  };

  try {
    const response = await get(`${API_URL}?${stringify(queryStrings)}`, {
      timeout: 5000,
    });

    return response.data.Search || [];
  } catch (ex) {
    throw new Error(ex);
  }
}
