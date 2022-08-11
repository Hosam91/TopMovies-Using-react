import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';



export default function TvDetails()
{
    const [tvDetails, setTvDetails] = useState(null)
    let param = useParams()

   async function getDetails(id)
    {
     let {data}= await  axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
  
     setTvDetails(data)
       console.log(data)
   }
    useEffect(() =>
    { 
        getDetails(param.id)
    },[])

    return (<>
        
        {tvDetails ? <div className='row'>
            
                <div className="col-md-4">
                            <img
                            className="w-100"
                            src={'https://image.tmdb.org/t/p/w500' + tvDetails.poster_path}
                            alt=""
                        />
                  </div>

                     <div className="col-md-8">
                        <h3>{tvDetails.name}</h3>
                <p className='text-muted py-3'>{tvDetails.overview}
                    
                </p>
                   </div>
                 </div> :
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <i className='fa fa-spinner fa-spin fa-3x'></i>
                 </div>  }
            </>
      



  )
}
