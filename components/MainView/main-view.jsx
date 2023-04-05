import React, {useState, useEffect} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";


export const MainView = ({movies}) => {

    const [user, setUser] = useState(null);


    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView movie={selectedMovie}
            onBackClick={
                () => setSelectedMovie(null)
            }/>;
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <React.Fragment>
            <div> {
                movies.map((movie) => {
                    return (
                        <div>
                            <MovieCard key={
                                    movie.id
                                }
                                movie={movie}
                                onMovieClick={
                                    (newSelectedMovie) => {
                                        setSelectedMovie(newSelectedMovie);
                                    }
                                }/>
                        </div>
                    )
                })
            } </div>

        </React.Fragment>
    );
}
