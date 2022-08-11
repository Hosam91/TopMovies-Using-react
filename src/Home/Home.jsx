import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ezz from '../ezz.png'

import { Link } from 'react-router-dom'



export default function Home(props)
{
  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [trendingPeople, setTrendingPeople] = useState([])

  async function getTrending(mediaType, setTrending) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`,
    )
    setTrending(data.results.slice(0, 10))
  }
  //call movies
  useEffect(() => {
    getTrending('movie', setTrendingMovies)
  }, [])
  //call Tv
  useEffect(() => {
    getTrending('tv', setTrendingTv)
  }, [])
  //call Tv
  useEffect(() => {
    getTrending('person', setTrendingPeople)
  }, [])

  return (
    <>
      {props.userData === null ? <div>
        <h1 className='text-center text-bolder text-danger'> Hello to our websit</h1>
        </div>: <div>
    
    <div className="row p-5">
        <div className="col-md-4 ">
          <div className="brdr mb-4 w-25"></div>
          <h3 className="">
          <span style={{ color: 'red', fontSize:'larger'}}>T</span>rending <br />
            Movies
            <br />
            to watch
          </h3>
          <p className="text-muted"> most watched movies by days</p>
          <div className="brdr mt-4 "></div>
        </div>

        {trendingMovies.map((movie, i) => (
          <div key={i} className="col-md-2">
            
            <Link to={`/movieDetails/${movie.id} `}>
            <div className="movies">
              <img
                className="w-100"
                src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                alt=""
              />
              <h2 className="h6"> {movie.title}</h2>
            </div>
            </Link>
          </div>
        ))}
      </div>
      {/* Tv */}
      <div className="row p-5">
        <div className="col-md-4 ">
          <div className="brdr mb-4 w-25"></div>
          <h3>
          <span style={{ color: 'red', fontSize:'larger'}}>T</span>rending <br />
            TV shaows
            <br />
            to watch
          </h3>
          <p className="text-muted"> most watched TV shaows by days</p>
          <div className="brdr mt-4 "></div>
        </div>
        {trendingTv.map((tv, i) => (
          <div key={i} className="col-md-2">
            
            <div className="tv">
              <Link to={`/tv-details/${tv.id}`}> 
                  <img
                    className="w-100"
                    src={'https://image.tmdb.org/t/p/w500' + tv.backdrop_path}
                    alt=""
                  />
                  <h2 className="h6 my-4"> {tv.name}</h2>
              
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* persons */}
      <div className="row p-5">
        <div className="col-md-4 ">
          <div className="brdr mb-4 w-25"></div>
          <h3>
          <span style={{ color: 'red', fontSize:'larger'}}>T</span>rending <br />
            People <br />
            to watch
          </h3>
          <p className="text-muted"> most watched movies by days</p>
          <div className="brdr mt-4 "></div>
        </div>
        {trendingPeople.map((person, i) => (
          <div key={i} className="col-md-2">
            <div className="person">
             
              {person.profile_path===null ? <img className='w-100' src={ezz} alt=''/>:  <img
                className="w-100"
                src={'https://image.tmdb.org/t/p/w500' + person.profile_path}
                alt=""
              />}
             {person.profile_path===null ? <h2 className="h6"> "Ahmed Ezz"</h2>: <h2 className="h6"> {person.name}</h2>}
            </div>
          </div>
        ))}
      </div>
    </div>
}
      
    </>
  )
}
