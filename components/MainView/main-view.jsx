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
import { Container } from "react-bootstrap";

const MainView = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  console.log("User prop from MainView", user)

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const [likedMovies, setLikedMovies] = useState([]); // New state for liked movies

  const handleLike = async (movie) => {
    const isLiked = likedMovies.some((likedMovie) => likedMovie._id === movie._id);
    if (isLiked) {
      // Remove the movie from the likedMovies array
      setLikedMovies(likedMovies.filter((likedMovie) => likedMovie._id !== movie._id));
      // Make API call to update user's data with the removed movie
      await fetch(`https://myflixdb001.herokuapp.com/users/${user.username}/movies/${movie._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // Add the movie to the likedMovies array
      setLikedMovies([...likedMovies, movie]);
      // Make API call to update user's data with the added movie
      await fetch(`https://myflixdb001.herokuapp.com/users/${user.username}/movies/${movie._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
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
<div>
  
 

    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={handleLogout} />
    <Container>

    <Row className="justify-content-md-center main-view">
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
<ProfileView user={user} token={token} favoriteMovies={likedMovies} toggleFavorite={handleLike} />
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
                   {movies.map((movie) => {
  const liked = likedMovies.some((likedMovie) => likedMovie._id === movie._id);
  return (
    <Col className="mb-4"  key={movie._id} md={3}>
      <MovieCard movie={movie} handleLike={handleLike} liked={liked} />
    </Col>
  );
})}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
      </Container>
    </BrowserRouter>
    
    </div>
  );
};

export default MainView;
