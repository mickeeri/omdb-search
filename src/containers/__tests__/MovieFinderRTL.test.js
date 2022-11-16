import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieFinder from '../MovieFinder';
import userEvent from '@testing-library/user-event';
import { server } from '../../mocks';
import { API_URL } from '../../services/api';
import { rest } from 'msw';

function searchMovie(query) {
  const searchField = screen.getByRole('textbox', { name: /search/i });
  const submitButton = screen.getByRole('button', { name: /search/i });

  userEvent.type(searchField, query);
  userEvent.click(submitButton);

  expect(submitButton).toHaveTextContent(/searching .../i);
}

it('shows list of movies when searching', async () => {
  render(<MovieFinder />);

  searchMovie('godfather');

  const listItems = await screen.findAllByRole('listitem');
  expect(listItems).toHaveLength(3);
  expect(listItems[0]).toHaveTextContent(/the godfather/i);
});

it('shows error message if the request to fetch movies fails', async () => {
  server.use(rest.get(API_URL), (_, res, ctx) => res.ctx(ctx.status(500)));

  render(<MovieFinder />);

  searchMovie('godfather');

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('Search failed');
});

it("shows empty result if it doesn't find any movies", async () => {
  render(<MovieFinder />);

  searchMovie('movie that does not exist');

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('No result');
});
