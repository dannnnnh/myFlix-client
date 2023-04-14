import {createRoot} from "react-dom/client";
import {useState} from "react";
import {Container} from "react-bootstrap";
import MainView from "./components/MainView/main-view.jsx";
import {PropTypes} from "prop-types";

// Import bootsrap
import "bootstrap/dist/css/bootstrap.min.css";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
    const [movies, setMovies] = useState([]);

    return (
   
            <MainView movies={movies}
                setMovies={setMovies}/>
  
    );
};


// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render (
    <MyFlixApplication/>);
