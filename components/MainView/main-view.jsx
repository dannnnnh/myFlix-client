  import { useState, useEffect } from "react";

  import Row from "react-bootstrap/Row";
  import Col from "react-bootstrap/Col";
  import MovieCard from "../movie-card/movie-card";
  import MovieView from "../movie-view/movie-view";
  import LoginView from "../login-view/login-view";
  import SignupView from "../signup-view/signup-view";
  import ProfileView from "../profile-view/profile-view";
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import NavigationBar from "../naviation-bar/navigation-bar";

  const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleLogout = () => {
      setUser(null);
      setToken(null);
      localStorage.clear();
    };


    useEffect(() => {
      fetch("https://myflixdb001.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
          setMovies(data);
        });

      console.log(movies);
    }, []);

    return (
      <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={handleLogout} />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
       <Route
  path="/profile"
  element={
    <>
      {!user ? (
        <Navigate to="/login" replace />
      ) : (
        <Col md={8}>
          <ProfileView
            user={user}
            favoriteMovies={user.favoriteMovies}
            token={token}
          />
        </Col>
      )}
    </>
  }
/>

            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };

  export default MainView;
