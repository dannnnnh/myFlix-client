import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function MovieCard({movie, handleLike, liked, favoriteMovies}) {


    return (
        <Card>
            <Card.Body>
                <Card.Title>{
                    movie.Title
                }</Card.Title>
                <Card.Text>{
                    movie.Description
                }</Card.Text>
                <Link to={
                    `/movies/${
                        encodeURIComponent(movie._id)
                    }`
                }>
                    <Button variant="link">Open</Button>
                </Link>
                {/* New like button */}
                <Button variant={
                        liked ? "success" : "outline-success"
                    }
                    onClick={
                        () => handleLike(movie)
                }>
                    {
                    liked ? "Liked" : "Like"
                } </Button>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
