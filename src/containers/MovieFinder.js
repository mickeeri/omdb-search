import React, { Component } from 'react';
import { Header } from '../components/styles';
import Filter from '../components/Filter';
import MovieList from '../components/MovieList';

import { fetchMovies } from '../services/api';

class MovieFinder extends Component {
  state = {
    isFetching: false,
    movies: [],
    errorMessage: '',
  };

  async componentDidMount() {
    const { state } = this;

    const movies = await fetchMovies();

    this.setState({ ...state, movies: movies.data.Search });
  }

  render() {
    const { movies } = this.state;

    return (
      <div>
        <Header>Movie finder</Header>
        <Filter />
        {movies && <MovieList movies={movies} />}
      </div>
    );
  }
}

export default MovieFinder;
