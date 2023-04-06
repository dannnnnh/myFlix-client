import './movie-view.scss';

const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
                <h2>Title:{
                    movie.Title
                }</h2>
            </div>
            <div>
                <p>Description:{
                    movie.Description
                }</p>
            </div>
            <button onClick={onBackClick}
                className="back-button"
                style={
                    {cursor: "pointer"}
            }>
                Back
            </button>
        </div>
    );
};

export default MovieView;
