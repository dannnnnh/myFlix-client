import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";


// Main component (will eventually use all the others)
const MyFlixApplication = () => {

const [movies, setMovies] = useState([]);

useEffect(()=>{
  fetch('https://myflixdb001.herokuapp.com/movies')
  .then(response => response.json())
  .then(data =>{
    setMovies(data);
    console.log("movie data:", data)
  })
  .catch(error => console.log(error));
},[])

  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);