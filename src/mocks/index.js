import { rest } from 'msw';
import { API_URL } from '../services/api';

import { setupServer } from 'msw/node';

const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    const movies =
      req.url.searchParams.get('s') === 'godfather'
        ? [
            {
              Title: 'The Godfather',
              Year: '1972',
              imdbID: 'tt0068646',
            },
            {
              Title: 'The Godfather Part II',
              Year: '1974',
              imdbID: 'tt0071562',
            },
            {
              Title: 'The Godfather Part III',
              Year: '1990',
              imdbID: 'tt0099674',
            },
          ]
        : [];

    return res(ctx.status(200), ctx.json({ Search: movies }));
  }),
];

export const server = setupServer(...handlers);
