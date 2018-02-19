import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-enzyme';
import MovieFinder from '../MovieFinder';
import { fetchMovies } from '../../services/api';
import MovieList from '../../components/MovieList';

jest.mock('../../services/api', () => ({
  fetchMovies: jest.fn(query => {
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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('handleSearch', () => {
  const query = 'godfather';
  const movieFinder = shallow(<MovieFinder />);

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

  describe('handleSort', () => {
    const movies = [
      { Title: 'Apocalypse', Year: '1979', imdbID: 'tt0078788' },
      { Title: 'Annie Hall', Year: '1977', imdbID: 'tt0075686' },
      { Title: 'The Shining', Year: '1980', imdbID: 'tt0081505' },
    ];

    it('should update sort state when called', () => {
      const movieFinder = shallow(<MovieFinder />);

      movieFinder.instance().handleSort('title');
      expect(movieFinder.state().order).toEqual({
        title: {
          active: true,
          asc: true,
        },
        year: {
          active: false,
          asc: true,
        },
      });

      movieFinder.instance().handleSort('year');
      expect(movieFinder.state().order).toEqual({
        title: {
          active: false,
          asc: false,
        },
        year: {
          active: true,
          asc: false,
        },
      });
    });

    it('should sort movies by title', () => {
      const movieFinder = shallow(<MovieFinder />);
      const state = movieFinder.state();

      movieFinder.setState({
        ...state,
        movies,
      });

      // Sort asc
      movieFinder.instance().handleSort('title');
      expect(movieFinder.state().movies[0].Title).toBe('Annie Hall');

      // Call again and it should sort desc
      movieFinder.instance().handleSort('title');
      expect(movieFinder.state().movies[0].Title).toBe('The Shining');
    });

    it('should sort movies by year', () => {
      const movieFinder = shallow(<MovieFinder />);
      const state = movieFinder.state();

      movieFinder.setState({
        ...state,
        movies,
      });

      // Sort desc
      movieFinder.instance().handleSort('year');
      expect(movieFinder.state().movies[0].Title).toBe('The Shining');

      // Call again and it should sort asc
      movieFinder.instance().handleSort('title');
      expect(movieFinder.state().movies[0].Title).toBe('Annie Hall');
    });
  });
});
