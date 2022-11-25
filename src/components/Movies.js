import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movies = () => {

    const API_URL = "https://api.themoviedb.org/3";
    const [movies, SetMovies] = useState([])
    const [searchkey, SetSearchkey] = useState([])

    const fetchMovies = async (searchkey) => {
        const type = searchkey ? "search" : "discover"
        const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,
                query: searchkey

            }
        })
        SetMovies(results)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const renderMovies = () => {
        return movies.map(movie => {
            return (<MovieCard
                key={movie.id}
                movie={movie}
            />)
        })

    }

    const searchMovies = (e) => {
        e.preventDefault()
        fetchMovies(searchkey)

    }


    return (

        <div >

            <div className='container'>
                <div className='container-content middle'>
                    <h1>Bienvenue sur Movies poster</h1>
                    <div className='search'>
                        <form onSubmit={searchMovies}>
                            <label htmlFor="search">Veuillez entrer le nom d'un film :</label>
                            <input type="text" id="search" onChange={(e) => SetSearchkey(e.target.value)} />
                            <button type={"submit"} >Recherche</button>
                        </form>
                        {searchkey}
                    </div>
                </div>
            </div>
            <div className='Re middle'>
                {renderMovies()}
            </div>

        </div>
    );
};

export default Movies;