import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Searchbar = () => {
    const API_URL = "https://api.themoviedb.org/3";

    const [searchkey, SetSearchkey] = useState([])

    const fetchMovies = async (barre) => {

        const { data: { results } } = await axios.get(`${API_URL}/search/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,
                query: barre
            }
        })
        SetSearchkey(results)

    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const searchMovies = (e) => {
        e.preventDefault()
        fetchMovies(searchkey)

    }



    return (
        <div className='container'>
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

    );

}



export default Searchbar;