import {Navbar, Container, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";


function navigationBar({user, onLoggedOut}) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link}
                    to="/">
                    Books App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link}
                            to="/login">Login</Nav.Link>
                        <Nav.Link as={Link}
                            to="/signup">Sign Up</Nav.Link>
                             <Nav.Link as={Link}
                            to="/profile">Profile</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default navigationBar