import React from 'react';
import { array } from 'prop-types';
import { List } from './styles';
import MovieListItem from './MovieListItem';

const MovieList = ({ movies }) => (
  <List>
    {movies.map(movie => <MovieListItem key={movie.imdbID} movie={movie} />)}
  </List>
);

MovieList.propTypes = {
  movies: array.isRequired,
};

export default MovieList;
