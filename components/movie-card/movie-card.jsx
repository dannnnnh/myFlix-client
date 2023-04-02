


import React from 'react';

function MovieCard({movie, onMovieClick}) {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
    </div>
  );
}

export default MovieCard;
