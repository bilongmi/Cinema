import React from 'react';
import { NavLink } from 'react-router-dom';

const MovieCard = ({ movie, selectMovie }) => {
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'

    return (
        <div className={"movie-card"} onClick={() => selectMovie(movie)}>
            <NavLink to={"/movieinfos/" + movie.id} className={(nav) => (nav.isActive ? "nav-active" : "")}>
                {movie.poster_path ? <img className={"movie-cover"} src={`${IMAGE_PATH}${movie.poster_path}`} /> : null}
            </NavLink>
            <h5 className={"movie-title"}>{movie.title}</h5>
        </div>

    );
};

export default MovieCard;