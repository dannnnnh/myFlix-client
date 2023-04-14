import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        console.log("Login request data:", data); // log request data


        fetch("https://myflixdb001.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                return response.text();
            }
        }).then((data) => {
            console.log("Login response:", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        }).catch((e) => {
            console.error("Login error:", e);
            alert("Something went wrong");
        });

    };

    return (
        <Form onSubmit={handleSubmit}
            style={
                {marginTop: "32px"}
        }>
            <Form.Group controlId="formUsername">


                <Form.Label>Username:</Form.Label>

                <Form.Control type="text"
                    value={username}
                    onChange={
                        (e) => setUsername(e.target.value)
                    }
                    required
                    minLength="3"/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password"
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    required/>
            </Form.Group>
            <Button style={
                    {marginTop: "16px"}
                }
                variant="primary"
                type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default LoginView;
