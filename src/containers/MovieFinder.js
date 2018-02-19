import React, { Component, Fragment } from 'react';
import { capitalize } from '../utils';
import { fetchMovies } from '../services/api';
import { Header, Alert } from '../components/styles';
import Filter from '../components/Filter';
import MovieList from '../components/MovieList';
import Sorter from '../components/Sorter';

const titleDefaultOrder = { active: false, asc: false };
const yearDefaultOrder = { active: false, asc: true };

class MovieFinder extends Component {
  state = {
    isFetching: false,
    movies: [],
    errorMessage: '',
    noResult: false,
    order: {
      title: titleDefaultOrder,
      year: yearDefaultOrder,
    },
  };

  handleSearch = async query => {
    const { state } = this;

    if (state.isFetching) {
      return;
    }

    this.setState({ ...state, isFetching: true, movies: [] });

    try {
      const movies = await fetchMovies(query);
      this.setState({
        ...state,
        movies: movies,
        isFetching: false,
        noResult: !movies.length,
      });
    } catch (ex) {
      this.setState({
        ...state,
        isFetching: false,
        errorMessage: 'Search failed',
      });
    }
  };

  handleSort = type => {
    if (type !== 'title' && type !== 'year') {
      throw new Error('type should be title or year');
    }

    const { state } = this;
    const { movies, order } = state;

    // ombd properties are capitalized.
    const prop = capitalize(type);

    function sortAsc(a, b) {
      return a[prop] >= b[prop] ? 1 : -1;
    }

    function sortDesc(a, b) {
      return a[prop] >= b[prop] ? -1 : 1;
    }

    const prevOrder = order[type];

    const ascOrder = !prevOrder.asc;

    const sortedMovies = [...movies].sort(ascOrder ? sortAsc : sortDesc);

    // Update order for the current type and reset the other one.
    const updateOrder = () => ({
      year:
        type === 'year' ? { active: true, asc: ascOrder } : yearDefaultOrder,
      title:
        type === 'title' ? { active: true, asc: ascOrder } : titleDefaultOrder,
    });

    this.setState({
      ...state,
      movies: sortedMovies,
      order: updateOrder(),
    });
  };

  async componentDidMount() {
    // this.handleSearch();
  }

  render() {
    const { movies, isFetching, noResult, errorMessage, order } = this.state;

    return (
      <div>
        <Header>OMDB movie search</Header>
        <Filter onSearch={this.handleSearch} isFetching={isFetching} />
        {movies.length ? (
          <Fragment>
            <Sorter order={order} onSort={this.handleSort} />
            <MovieList movies={movies} />
          </Fragment>
        ) : (
          ''
        )}
        {noResult && (
          <Alert>
            <span>No result</span>
          </Alert>
        )}
        {errorMessage && (
          <Alert danger>
            <span>{errorMessage}</span>
          </Alert>
        )}
      </div>
    );
  }
}

export default MovieFinder;
