import React from 'react';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './movieCard.css';


function MovieCard({movie, handleLike, liked, favoriteMovies}) {


    return (
        <Card style={
                {
                    minWidth: "20rem",
                    maxWidth: "40rem"
                }
            }
            className="shadow p-3 rounded-4 text-center"
            text="secondary">
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
                    <Button>Open</Button>
                </Link>
                {/* New like button */}
                <Button className="m-2"
                    variant={
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
