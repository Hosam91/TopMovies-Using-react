import axios from 'axios'
import Joi from 'joi'
import React, { useEffect, useState } from 'react'
import { useNavigate, } from 'react-router-dom'

export default function Login(props) {
  let navigate = useNavigate()
  let [isloading, setIsloading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  let [error, setError] = useState('')
  const [errorValid, setErrorValid] = useState([])

  useEffect(() =>
  {
    if (localStorage.getItem('userToken'))
    {
navigate('/home')      }

  },[])

  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  async function submitLogin(e) {
    e.preventDefault()
    let validUser = validateLogin()
    setIsloading(true )

    if (validUser.error) {
      //set error
      setErrorValid(validUser.error.details)
      setIsloading(false)
    } else {
      let { data } = await axios.post(
        'https://route-egypt-api.herokuapp.com/signin',
        user,
      )
      console.log(data)
      if (data.message === 'success')
      {
        console.log(data)

        setIsloading(false)
        localStorage.setItem('userToken', data.token);

      
        props.saveUserData()

        navigate('/home')
      } else {
        setError(data.message)
        setIsloading(false)
      }
    }
  }
  function validateLogin() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    })
    return schema.validate(user, { abortEarly: false })
  }

  return (
    <>
       <div className="w-50 m-auto">
      <h1><span style={{ color: 'red'}}>L</span>ogin</h1>
      <form onSubmit={submitLogin}>
        {error.length > 0 ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          ''
        )}
        <label htmlFor="email">Email : </label>
        <input
          type="text "
          onChange={getUserData}
          className="form-control"
          id="first_name"
          name="email"
        />

        <label htmlFor="passwoerd"> Password : </label>
        <input
          type="password"
          onChange={getUserData}
          className="form-control"
          id="password"
          name="password"
        />
        <button type="submit" className="btn btn-outline-info">
          {isloading === true ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            'Login'
          )}
        </button>

        {errorValid.map((error, i) => (
          <div key={i} className="alert py-2 alert-danger">
            {error.message}
          </div>
        ))}
        </form>
        </div>
    </>
  )
}
