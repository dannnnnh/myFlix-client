import React from 'react';
import {Button, Card} from 'react-bootstrap';

function MovieCard({movie, onMovieClick}) {
    return (
        <Card className="shadow-sm p-3 mb-5 bg-white rounded h-100"
            onClick={
                () => onMovieClick(movie)
        }>

            {/* <Card.Img variant="top" src={movie.ImagePath} /> */}
            <Card.Body>

                <Card.Title>{
                    movie.Title
                }</Card.Title>
                <Card.Text>{
                    movie.Description
                }</Card.Text>


                <Button variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
