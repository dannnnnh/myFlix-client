import { createRoot } from "react-dom/client";
import { useState } from "react";
import MainView from "./components/MainView/main-view.jsx";
import { PropTypes } from "prop-types";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  const [movies, setMovies] = useState([]);

  return (
    <div className="my-flix">
      <MainView movies={movies} setMovies={setMovies} />
    </div>
  );
};



// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
