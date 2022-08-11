import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

export default function Tv()
{
  const [trendingTv, setTrendingTv] = useState([])


  let nums = new Array(13).fill(1).map((num, index) => index + 1)
  
  async function getTrending(pageNumber) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`  )
    
    
      setTrendingTv(data.results)
  }
  //call movies
  useEffect(() => {
    getTrending(1)
  }, [])





  return ( <>
     {/* <div className="row p-5 justify-content-center">
        

        {trendingTv.map((tv, i) => (
          <div key={i} className="col-md-2 py-3 px-2 ">
            
            <Link to={`/movieDetails/${tv.id} `}>
            <div className="movies">
              <img
                className="w-100"
                src={'https://image.tmdb.org/t/p/w500' + tv.backdrop_path }
                alt=""
              />
              <h2 className="h6"> {tv.name}</h2>
            </div>
            </Link>
          </div>
        ))}
      </div> */}
     <div className="row p-5 justify-content-center">
        
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
      <nav aria-label="" className=''>
      <ul className="pagination  d-flex justify-content-center  ">
        {
          nums.map((pageNum, i) => <li onClick={() => getTrending(pageNum)} key={i} className="page-item text-white">
            <a className="page-link text-white bg-transparent paginat">{pageNum}</a></li>)
        }

    
   
  </ul>
</nav>
  
  </>
  )
}
