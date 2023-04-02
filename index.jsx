import {createRoot} from 'react-dom/client';
import {useState, useEffect} from 'react';
import {MainView} from './components/MainView/main-view';
import PropTypes from 'prop-types';


// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";


// Main component (will eventually use all the others)
const MyFlixApplication = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('https://myflixdb001.herokuapp.com/movies').then(response => response.json()).then(data => {
            setMovies(data);
            console.log("movie data:", data)
        }).catch(error => console.log(error));
    }, [])

    return (
        <div className="my-flix">
            <MainView movies={movies}/>
        </div>
    );
};

// Define propTypes for MyFlixApplication
MyFlixApplication.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        Genre: PropTypes.shape(
            {Name: PropTypes.string.isRequired, Description: PropTypes.string.isRequired}
        ),
        Director: PropTypes.shape(
            {Name: PropTypes.string.isRequired, Bio: PropTypes.string.isRequired, Birth: PropTypes.string.isRequired, Death: PropTypes.string}
        ),
        Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired
    })).isRequired
};


// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render (
    <MyFlixApplication/>);
