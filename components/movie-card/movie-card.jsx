import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function MovieCard({movie, onMovieClick}) {
    return (
        <Card> {/* <Card.Img variant="top" src={movie.ImagePath} /> */}
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
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
