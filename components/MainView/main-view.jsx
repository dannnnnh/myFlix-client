import {useState} from "react";
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";


export default MainView = ({movies}) => {


    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);


    if (!user) {
        return <LoginView onLoggedIn={
            (user) => setUser(user)
        }/>;
    }


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
                            <button onClick={
                                () => {
                                    setUser(null);
                                }
                            }>Logout</button>
                        </div>

                    )
                })
            } </div>

        </React.Fragment>
    );
}