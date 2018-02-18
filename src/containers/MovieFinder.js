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
    noResult: false,
  };

  handleSearch = async query => {
    const { state } = this;

    this.setState({ ...state, isFetching: true });

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

  async componentDidMount() {
    // this.handleSearch();
  }

  render() {
    const { movies, isFetching } = this.state;

    return (
      <div>
        <Header>Movie finder</Header>
        <Filter onSearch={this.handleSearch} isFetching={isFetching} />
        {movies && <MovieList movies={movies} />}
      </div>
    );
  }
}

export default MovieFinder;
