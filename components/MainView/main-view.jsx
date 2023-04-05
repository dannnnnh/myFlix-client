import {useState, useEffect} from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    useEffect(() => {
        if (!token) 
            return;
        


        fetch("https://myflixdb001.herokuapp.com/movies", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => response.json()).then((movies) => {
            setMovies(movies);

        });
    }, [token]);


    if (!user) {
        return (
          <>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            or
            <SignupView />
          </>
        );
      }



    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie}
                onBackClick={
                    () => setSelectedMovie(null)
                }/>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            <div> {
                movies.map((movie) => {
                    return (
                        <div key={
                            movie.id
                        }>
                            <MovieCard movie={movie}
                                onMovieClick={
                                    (newSelectedMovie) => setSelectedMovie(newSelectedMovie)
                                }/>
                        </div>
                    );
                })
            } </div>
            <button onClick={
                () => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }
            }>Logout</button>
        </div>
    );
};

export default MainView;
