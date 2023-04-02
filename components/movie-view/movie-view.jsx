export const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
            <h2>Title:{movie.Title}</h2>
            </div>
            <div>
            <p>Description:{movie.Description}</p>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};



