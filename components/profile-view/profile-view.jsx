import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import MovieCard from "../movie-card/movie-card";

import {parseISO, format} from "date-fns";

const formatDate = (dateString) => {
    try {
        const date = parseISO(dateString);
        return format(date, "yyyy-MM-dd");
    } catch (error) {
        return "Invalid Date";
    }
};


const ProfileView = ({user, favoriteMovies, toggleFavorite, token}) => {
    const [updateUser, setUpdateUser] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");


    const handleDeleteUser = async () => {
        const response = await fetch(`https://myflixdb001.herokuapp.com/users/${
            user.username
        }`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }

        });
        console.log(user)
        const {success, message} = await response.json();

        if (success) {
            alert(message);
            localStorage.removeItem("token");
            window.location.replace("/");
        } else {
            alert("Delete failed");
        }
    };

    useEffect(() => {
        setUsername(user.Username);
        setPassword(user.Password);
        setEmail(user.Email);
        setBirthday(user.Birthday);
    }, [user]);

//
    const handleUpdate = async (event) => {
        event.preventDefault();  
    
        const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        };
    console.log(data)
        const updateUser = await fetch(`https://myflixdb001.herokuapp.com/users/${user.Username}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"},
        })
    
        const response = await updateUser.json()
        console.log(response)
        if (response) {
          alert("Account successfully updated! Please log in again");
          localStorage.clear();
          window.location.reload(); 
        } else {
          alert("Something went wrong");
        }
      };


    const handleToggle = (movie) => {
        toggleFavorite(movie);
    };


    return (
        <React.Fragment>

            <div>{
                user.username
            }</div>

            <div className="min-vh-100">
                {
                !updateUser ? (
                    <Row className="d-flex justify-content-center p-4">
                        <Col sm={8}
                            md={6}
                            lg={5}
                            xl={4}
                            xxl={3}>
                            <Card style={
                                    {
                                        minWidth: "20rem",
                                        maxWidth: "40rem"
                                    }
                                }
                                className="shadow-lg p-3 rounded-4 text-center"
                                text="secondary">


                                <Card.Body>
                                    <Card.Title>Profile Information</Card.Title>
                                    <Card.Text></Card.Text>
                                </Card.Body>
                                <ListGroup className="text-start">
                                    <ListGroup.Item className="text-bg-dark">
                                        Username: {username} </ListGroup.Item>
                                    <ListGroup.Item className="text-bg-dark">
                                        Password: **********
                                    </ListGroup.Item>

                                    <ListGroup.Item className="text-bg-dark">
                                        Email test: {email} </ListGroup.Item>
                                    <ListGroup.Item className="text-bg-dark">
                                        Birthday: {
                                        formatDate(birthday)
                                    } </ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <div className="text-center">
                                        <Button variant="primary"
                                            onClick={
                                                () => setUpdateUser(true)
                                        }>
                                            EDIT
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <Row className="d-flex justify-content-center p-4">
                        <Col sm={8}
                            md={6}
                            lg={5}
                            xl={4}
                            xxl={3}>
                            <Card style={
                                    {
                                        minWidth: "20rem",
                                        maxWidth: "40rem"
                                    }
                                }
                                className="shadow-lg p-3 rounded-4 text-center"
                                text="secondary">

                                <Card.Body>
                                    <Card.Title>Profile Information</Card.Title>
                                    <Card.Text></Card.Text>
                                    <Form onSubmit={handleUpdate}
                                        className="w-100">
                                        <Form.Group controlId="formUsername" className="mb-4">
                                            <Form.Control type="text" placeholder="Username"
                                                value={username}

                                                onChange={
                                                    (event) => setUsername(event.target.value)
                                                }
                                                autoComplete="username"
                                                minLength="3"
                                                maxLength="30"
                                                required/>
                                        </Form.Group>

                                        <Form.Group controlId="formPassword" className="mb-4">
                                            <Form.Control type="password" placeholder="Password"
                                                defaultValue={password}
                                                onChange={
                                                    (event) => setPassword(event.target.value)
                                                }
                                                autoComplete="current-password"
                                                required/>
                                        </Form.Group>
                                        <Form.Group controlId="formEmail" className="mb-4">
                                            <Form.Control type="email" placeholder="Email"
                                                defaultValue={email}
                                                onChange={
                                                    (event) => setEmail(event.target.value)
                                                }
                                                autoComplete="email"
                                                required/>
                                            <Form.Text className="text-muted"></Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBirthday" className="mb-4">
                                            <Form.Control type="date" placeholder="Birthday"
                                                value={
                                                    formatDate(birthday)
                                                }
                                                onChange={
                                                    (event) => setBirthday(event.target.value)
                                                }
                                                autoComplete="date"

                                                required/>
                                        </Form.Group>

                                        <div className="d-flex justify-content-around">
                                            <Button variant="primary" type="submit">
                                                SAVE
                                            </Button>
                                            <Button variant="primary"
                                                onClick={handleDeleteUser}>
                                                DELETE
                                            </Button>
                                            <Button variant="primary"
                                                onClick={
                                                    () => setUpdateUser(false)
                                            }>
                                                CANCEL
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )
            }
                <Row className="justify-content-center py-5">
                    <h2 className="text-center mb-5">Favorite Movies</h2>


                    {/* {favoriteMovies.length ? (
              favoriteMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  isFavorite={true}
                  toggleFavorite={handleToggle}
                  key={movie.id}
                />
              ))
            ) : (
              <p>No favorite movies</p>
            )} */} </Row>
            </div>
        </React.Fragment>
    );
};

export default ProfileView;
