import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-enzyme';
import MovieFinder from '../MovieFinder';
import { fetchMovies } from '../../services/api';
import MovieList from '../../components/MovieList';

jest.mock('../../services/api', () => ({
  fetchMovies: jest.fn(query => {
    console.log(query);

    if (!query) {
      throw new Error();
    }

    if (query === 'godfather') {
      return [
        {
          Title: 'The Godfather',
          Year: '1972',
          imdbID: 'tt0068646',
        },
      ];
    }

    return [];
  }),
}));

describe('handleSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const movieFinder = shallow(<MovieFinder />);
  const query = 'godfather';

  it('should set isFetching to true when called', () => {
    movieFinder.instance().handleSearch(query);
    expect(movieFinder.state().isFetching).toBe(true);
  });

  it('should call fetchMovies with query', () => {
    movieFinder.instance().handleSearch(query);
    expect(fetchMovies).toHaveBeenCalledWith(query);
  });

  it('should set isFetching to false when done', async () => {
    await movieFinder.instance().handleSearch(query);
    expect(movieFinder.state().isFetching).toBe(false);
  });

  it('should set movies and show MovieList when done', async () => {
    const movieFinder = mount(<MovieFinder />);
    await movieFinder.instance().handleSearch(query);
    expect(movieFinder.state().movies.length).toBe(1);
    expect(movieFinder.contains(MovieList)).toBe(true);
  });

  it('should set errorMessage on failed fetch', async () => {
    // Search without query will throw error in the mock function.
    await movieFinder.instance().handleSearch();
    expect(movieFinder.state().errorMessage).toEqual('Search failed');
  });

  it('should set "no result" text if result is empty', async () => {
    await movieFinder.instance().handleSearch('lorem ipsum');
    expect(movieFinder.state().noResult).toBe(true);
  });
});
