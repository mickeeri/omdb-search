import { stringify } from 'query-string';
import { get } from 'axios';

export const API_URL = 'https://www.omdbapi.com/';

function delay(ms = 1500) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchMovies(query) {
  const queryStrings = {
    apikey: '901124cd',
    s: query,
    type: 'movie',
  };

  try {
    await delay();

    const response = await get(`${API_URL}?${stringify(queryStrings)}`, {
      timeout: 5000,
    });

    return response.data.Search || [];
  } catch (ex) {
    throw new Error(ex);
  }
}
