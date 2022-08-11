import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent navbar-dark my-nav">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'home'}>
            <h1><span style={{ color: 'red', fontSize:'larger'}}>T</span>op <span style={{ color:'red', fontSize:'larger'}}>M</span>ovies</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.userData?<>
              
                <li className="nav-item">
                <Link
                  className="nav-link "
                  to={'home'}
                > 
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'movies'}>
                  Best Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'people'}>
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'tv'}>
                  TV
                </Link>
              </li>
              </> : ''}
             
             
            </ul> 
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            
            <li className="nav-item d-flex align-items-center mx-4" >
                <i className='fa-brands fa-facebook mx-3' ></i>
                <i className='fa-brands fa-twitter mx-3' ></i>
                <i className='fa-brands fa-instagram mx-3' ></i>
                <i className='fa-brands fa-youtube mx-3' ></i>

              </li>
              {props.userData? <>
              <li className="nav-item ">
                <span className="nav-link" onClick={props.logout}>
                <span style={{ color: 'red',cursor: 'pointer'}}>Logout</span> 
                </span>
                </li>
              </> :
                <>
              
              <li className="nav-item">
              <Link className="nav-link" to={'login'}>
              <span style={{ color: 'red'}}>Login</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'register'}>
                <span style={{ color: 'red'}}>Register</span>

              </Link>
            </li>
            </>  }
             
              
            
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
