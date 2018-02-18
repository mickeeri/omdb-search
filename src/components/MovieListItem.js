import React from 'react';
import {
  ListItem,
  Poster,
  PosterPlaceholder,
  MovieLink,
  MovieDetails,
} from './styles';

const MovieListItem = ({
  movie: { Title: title, Poster: poster, imdbID, Year: year },
}) => (
  <ListItem>
    <MovieLink href={`http://www.imdb.com/title/${imdbID}/`} target="_blank">
      {poster !== 'N/A' ? (
        <Poster src={poster} alt={`Poster for ${title}.`} />
      ) : (
        <PosterPlaceholder>Missing poster</PosterPlaceholder>
      )}
      <MovieDetails>
        <h2>{title}</h2>
        <div>{year}</div>
      </MovieDetails>
    </MovieLink>
  </ListItem>
);

export default MovieListItem;
