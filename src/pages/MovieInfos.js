import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { NavLink, useParams } from 'react-router-dom';

const MovieInfos = () => {
    const IMG_PATH = 'https://image.tmdb.org/t/p/w500'
    const AP_URL = "https://api.themoviedb.org/3";
    const [movies, SetMovies] = useState([])
    const [selectedMovies, setSelectedMovies] = useState({})
    const { id } = useParams();


    const fetchMovies = async () => {
        const type = "discover"
        const { data: { results } } = await axios.get(`${AP_URL}/${type}/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,

            }
        })
        // console.log(results)


        const results2 = await axios.get(`${AP_URL}/movie/${id}`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,

            }
        })

        const res = results.filter(elemnt => elemnt.id == id)[0]
        SetMovies(results)
        //console.log(results1.data)
        // console.log(res)
        let genre = ""
        for (let i = 0; i < results2.data.genres.length; i++) {
            genre += results2.data.genres[i].name + ", "
        }
        genre = genre.slice(0, -2)
        res.genres = genre
        console.log(genre)
        setSelectedMovies(res)


    }

    useEffect(() => {
        fetchMovies()
    }, [])

    const renderMovies = () => {
        return movies.map(movie => {
            return (<MovieCard
                key={movie.id}
                movie={movie}
                selectMovie={selectedMovies}
            />)
        })

    }



    return (
        < div>

            <div className='hero'>
                <NavLink to="/" className={"nav"}><h3>Acceuil</h3></NavLink>
                <div className='hero-content' >
                    {console.log(selectedMovies)}
                    {selectedMovies.poster_path ? <img src={`${IMG_PATH}${selectedMovies.poster_path}`}
                        height={"'500px"}
                        width={"200px"} /> : null}
                    <div className='hero-info'>
                        <h4><b>Titre:</b> {selectedMovies.title}</h4>
                        <h4> <b>Synopsi:</b> {selectedMovies.overview}</h4>
                        <h4> <b>Date de parution:</b> {selectedMovies.release_date}</h4>
                        <h4> <b>Genre:</b> {selectedMovies.genres ? selectedMovies.genres : null}</h4>
                        <h4> <b>Note /5:</b> {selectedMovies.vote_average / 2}</h4>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default MovieInfos;