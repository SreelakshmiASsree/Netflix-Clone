import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({ title, cateogry }) => {
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTYzMzc4Y2E3MTYyOGViNjVkOGRhNmE1ZTZiZDFmYyIsIm5iZiI6MTcyMTkxMTA1MC4wMDc2OTcsInN1YiI6IjY2YTI0NTUwZjE0MzlkOTg1MWEwY2QxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rXL3wPZaUVFINIspwxI-_GfcAoGCTntHX_040qDEwp4'
    }
  };



  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${cateogry ? cateogry : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);

  }, []);




  return (
    <div className='title_card'>
      <h2>{title ? title : "Popular on Netflix"}</h2>

      <div className="card_list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards