import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

interface MovieProps{
    Title: string
    Year?: string
    imdbID: string
    Poster:string
}

interface ListProp{
    movielist: MovieProps[];
}

const MovieList: React.FC<ListProp> = ({movielist}) => {
    return (
        <div>
            {movielist.map((movie, index)=> (
            <div key={movie.imdbID} >
                <h3>{movie.Title}</h3>
                <img src={movie.Poster}></img>
            </div>
            ))}
        </div>
    )
}

export default MovieList