import {useParams, Link} from "react-router-dom";
import "./movie-view.scss";

const MovieView = ({movies}) => {
    const {movieId} = useParams();
    const movie = movies.find((movie) => movie._id === movieId);

    if (! movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div>
            <div>
                <h2>Title: {
                    movie.Title
                }</h2>
            </div>
            <div>
                <p>Description: {
                    movie.Description
                }</p>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};

export default MovieView;
