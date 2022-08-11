import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home.jsx'

import { Routes, Route , useNavigate } from 'react-router-dom'
import Tv from './TV/Tv'

import Login from './Login/Login.jsx'
import People from './People/People.jsx'
import Register from './Register/Register.jsx'
import Movies from './Movies/Movies'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import MovieDetails from './Movies/MovieDetails.jsx'
import TvDetails from './TV/TvDetails.jsx';
import Footer from './Footer.jsx';
import  BeforeLogin  from './BeforeLogin.jsx';



function App()
{

  let Navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  function saveUserData()
  {
    let encodedToken = localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken)
    setUserData(decodedToken)
  }
  function logout()
  {
    setUserData(null);
    localStorage.removeItem('userToken');
    Navigate('login')
  }


  useEffect(() =>
  {
    if (localStorage.getItem('userToken'))
    {
      saveUserData()
      }

  }, [])
  

  function ProtectedRoute(props)
  {

    if (localStorage.getItem('userToken') === null)
    {
      return <Navigate to={ '/login'} />
    } else
    {
      return props.children
      
    }
    
    
  }
  return (
    <>
      <Navbar userData={userData} logout={ logout} />
        
      <div className="container mh " >
        <Routes>
          {userData === null ? <Route path='/' element={<BeforeLogin />} /> : <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />}
          {userData === null ? <Route path='home' element={<BeforeLogin/>} /> : <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute> } />}


          {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute> } />*/}
          {/* <Route path="home" element={<ProtectedRoute> <Home  userData={userData} /> </ProtectedRoute>} />  */}

          <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          
          
          <Route path='/movieDetails' element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} >
               <Route path=':id' element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
          </Route>

          <Route path="tv" element={<ProtectedRoute><Tv /></ProtectedRoute>} />

          <Route path="tv-details" element={<ProtectedRoute><TvDetails /></ProtectedRoute>} >

            <Route path=":id" element=  { <ProtectedRoute><TvDetails /></ProtectedRoute>} />

            </Route>


          <Route path="people" element={ <ProtectedRoute><People/></ProtectedRoute>}  />
          <Route path="login" element={<Login saveUserData={saveUserData} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={
              <div>
                <h1>Error 404 </h1>
                <h2>Page Not Found</h2>
              </div>
            }
          />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
