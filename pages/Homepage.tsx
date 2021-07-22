import Head from 'next/head'
import Image from 'next/image'
import styles from '../scss/Homepage.module.scss'
import { Row, Col, Container } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import MovieList from '../components/MovieList'

const Homepage: React.FC=() => {

  const [movies, setMovies] = useState([])
  const [year, setYear] = useState()
  const [type, setType] = useState()

  const getMovieRequest = async () => {
    // const url = "http://www.omdbapi.com/?s=star wars&apikey=1540f61f";
    // const response = await fetch(url);
    // const responseJson = await response.json();
    console.log(responseJson);
    setMovies(responseJson.Search);
  }

  // useEffect(()=>{
  //   init()
  // },[])

  return (
    <>
      <Container fluid>
        <Row className={styles.parent__wrapper}>
          <h3>Here are the star wars movies</h3>
        </Row>
        <Row>
          <MovieList movielist={movies} />
        </Row>
      </Container>
    </>
  )
} 

export default Homepage