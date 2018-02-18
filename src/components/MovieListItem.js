import React from 'react';
import { ListItem, Poster, PosterPlaceholder, MovieLink } from './styles';

const MovieListItem = ({ movie: { Title: title, Poster: poster, imdbID } }) => (
  <ListItem>
    <MovieLink href={`http://www.imdb.com/title/${imdbID}/`} target="_blank">
      {poster !== 'N/A' ? (
        <Poster src={poster} alt={`Poster for ${title}.`} />
      ) : (
        <PosterPlaceholder>Missing poster</PosterPlaceholder>
      )}
      {title}
    </MovieLink>
  </ListItem>
);

export default MovieListItem;
