import {useState, useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

    return (
        <Row className="justify-content-md-center">
            {
            !user ? (
                <>
                    <Col md={5}>
                        <LoginView onLoggedIn={
                            (user, token) => {
                                setUser(user);
                                setToken(token);
                            }
                        }/>
                        or
                        <SignupView/>
                    </Col>
                </>
            ) : selectedMovie ? (
                <Col md={8}
                    style={
                        {border: "1px solid black"}
                }>
                    <MovieView movie={selectedMovie}
                        style={
                            {border: "1px solid green"}
                        }
                        onBackClick={
                            () => setSelectedMovie(null)
                        }/>
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <Col>

                    <Row xs={1}
                        sm={2}
                        md={3}
                        lg={4}
                        xl={5}>
                        {
                        movies.map((movie) => {
                            return (
                                <Col className="mb-5"
                                    key={
                                        movie.id
                                }>
                                    <MovieCard movie={movie}
                                        onMovieClick={
                                            (newSelectedMovie) => setSelectedMovie(newSelectedMovie)
                                        }/>
                                </Col>
                            );
                        })
                    } </Row>
                </Col>
            )
        } </Row>
    );
};

export default MainView;
