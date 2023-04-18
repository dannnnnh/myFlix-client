import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movieCard.css';

function MovieCard({ movie, user }) {
  const token = localStorage.getItem('token');
  const alreadyFavorite = user.FavoriteMovies.find((id) => id === movie._id);
  const [favorite, setFavorite] = useState(alreadyFavorite ? true : false);

  useEffect(() => {
    setFavorite(alreadyFavorite ? true : false);
  }, [alreadyFavorite]);

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://myflixdb001.herokuapp.com/users/${user.Username}/movies/${movie._id}`;

    let requestOptions = {
      method: '',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (alreadyFavorite) {
      requestOptions.method = 'DELETE';
      alert('Movie deleted from favorites!');
      setFavorite(false);
    } else {
      requestOptions.method = 'POST';
      alert('Movie added to favorites!');
      setFavorite(true);
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    <Card
      style={{
        Width: '100px',
      }}
      className="shadow p-3 rounded-4 text-center"
      text="secondary"
    >
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button>Open</Button>
        </Link>
        <Button
          className="m-2"
          variant={favorite ? 'success' : 'outline-success'}
          onClick={toggleFavorite}
        >
          {favorite ? 'Liked' : 'Like'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
