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

    this.setState({
      ...state,
      isFetching: true,
      noResult: false,
    });

    try {
      const movies = await fetchMovies(query);

      this.setState({
        ...state,
        movies: movies,
        isFetching: false,
        noResult: !movies.length,
        order: { title: titleDefaultOrder, year: yearDefaultOrder },
        errorMessage: '',
      });
    } catch (ex) {
      this.setState({
        ...state,
        isFetching: false,
        errorMessage: 'Search failed',
        movies: [],
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

    function byAsc(a, b) {
      return a[prop] >= b[prop] ? 1 : -1;
    }

    function byDesc(a, b) {
      return a[prop] >= b[prop] ? -1 : 1;
    }

    const prevOrder = order[type];

    const sortAsc = !prevOrder.asc;

    const sortedMovies = [...movies].sort(sortAsc ? byAsc : byDesc);

    // Update order for the current type and reset the other one.
    const updateOrder = () => {
      const activeOrder = { active: true, asc: sortAsc };

      return {
        year: type === 'year' ? activeOrder : yearDefaultOrder,
        title: type === 'title' ? activeOrder : titleDefaultOrder,
      };
    };

    this.setState({
      ...state,
      movies: sortedMovies,
      order: updateOrder(),
    });
  };

  render() {
    const { movies, isFetching, noResult, errorMessage, order } = this.state;

    return (
      <div>
        <Header>OMDb API Search</Header>
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
