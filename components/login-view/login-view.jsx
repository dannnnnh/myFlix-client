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


        fetch("https://myflixdb001.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((data) => {
            console.log("Login response:", data); // This line is already logging the response data, which includes the token.
            console.log("Token:", data.token); // Add this line to log the token separately.
        
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        }).catch((e) => {
            alert("Something went wrong");
        });

    };

    return (
        <Form onSubmit={handleSubmit} style={{marginTop:"32px"}}>
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
