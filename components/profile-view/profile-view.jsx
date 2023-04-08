import React, {useState} from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

import MovieCard from "../movie-card/movie-card";

const ProfileView = ({user, favoriteMovies, toggleFavorite, token}) => {
    const [updateUser, setUpdateUser] = useState(false);

    const [userData, setUserData] = useState({username: user.username, password: "", email: "", birthday: ""});
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);


    const handleDeleteUser = async () => {
        const response = await fetch(`https://myflixdb001.herokuapp.com/users/${
            user.username
        }`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });


        const {success, message} = await response.json();

        console.log(`Response status code: ${
            response.status
        }`);
        console.log(`Response message: ${message}`);

        console.log(`Response status code: ${
            response.status
        }`);
        console.log(`Response message: ${message}`);

        if (success) {
            alert(message);
            localStorage.removeItem("token");
            window.location.replace("/");
        } else {
            alert("Delete failed");
        }
    };


    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    console.log("Token before fetch:", token);


    const handleUpdate = async (event) => {
        event.preventDefault();

        // Update the userData object with the new values from the input fields
        setUserData({
            ...userData,
            username,
            password,
            email,
            birthday
        });
        console.log("Token:", token);


        try {
            console.log("User:", user);

            const response = await fetch(`https://myflixdb001.herokuapp.com/users/${
                user.username
            }`, {
                method: "PUT",
                body: JSON.stringify(
                    {
                        ...userData,
                        username,
                        password,
                        email,
                        birthday
                    }
                ), // Pass the updated userData object
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }

            });

            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const {success, message, data} = await response.json();
                    console.log(response);
                    // Set the token in local storage


                    if (success) {
                        alert(message);
                        setUpdateUser(false);
                        setUserData({
                            ...userData
                        }); // update the userData state with the new values
                        window.location.reload();
                    } else {
                        alert("Update failed");
                    }
                } else {
                    alert("Received a non-JSON response from the server.");
                    console.error("Received a non-JSON response from the server.");
                }
            } else {
                alert("Request failed with status code: " + response.status);
                console.error("Request failed with status code: " + response.status);
            }
        } catch (err) {
            console.error(err);
        }
    };


    const handleToggle = (movie) => {
        toggleFavorite(movie);
    };

    const formatDate = (birthday) => {
        const date = new Date(birthday);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    };

    return (
        <React.Fragment>
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
                                        Username: {
                                        user.username
                                    } </ListGroup.Item>
                                    <ListGroup.Item className="text-bg-dark">
                                        Password: **********
                                    </ListGroup.Item>

                                    <ListGroup.Item className="text-bg-dark">
                                        Email: {
                                        user.email
                                    } </ListGroup.Item>
                                    <ListGroup.Item className="text-bg-dark">
                                        Birthday: {
                                        formatDate(user.birthday)
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
                                                defaultValue={
                                                    userData.username
                                                }
                                                onChange={handleInputChange}
                                                autoComplete="username"
                                                minLength="3"
                                                maxLength="30"
                                                required/>
                                        </Form.Group>

                                        <Form.Group controlId="formPassword" className="mb-4">
                                            <Form.Control type="password" placeholder="Password"
                                                defaultValue={
                                                    user.password
                                                }
                                                onChange={
                                                    (event) => setPassword(event.target.value)
                                                }
                                                autoComplete="current-password"
                                                required/>
                                        </Form.Group>
                                        <Form.Group controlId="formEmail" className="mb-4">
                                            <Form.Control type="email" placeholder="Email"
                                                defaultValue={
                                                    user.email
                                                }
                                                onChange={
                                                    (event) => setEmail(event.target.value)
                                                }
                                                autoComplete="email"
                                                required/>
                                            <Form.Text className="text-muted"></Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBirthday" className="mb-4">
                                            <Form.Control type="date" placeholder="Birthday"
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
                                                onClick={
                                                    () => handleDeleteUser()
                                            }>
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
                    {
                    favoriteMovies && favoriteMovies.length ? (favoriteMovies.map((movie) => (
                        <MovieCard movie={movie}
                            isFavorite="true"
                            toggleFavorite={handleToggle}
                            key={
                                movie.id
                            }/>
                    ))) : (
                        <p>No favorite movies</p>
                    )
                } </Row>
            </div>
        </React.Fragment>
    );
};

export default ProfileView;
