import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register()
{
  let navigate = useNavigate();
  const [isloading, setIsloading] = useState(false)

  const [errorValid, setErrorValid] = useState([])

  const [error, setErorr] = useState('')
  let [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: '',
  })

  function getUserData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
    console.log(myUser)
  }

  async function submitRegister(e) {
    e.preventDefault()
    setIsloading(true);
    let validationResult = validateForm()

    if (validationResult.error)
    {
      setErrorValid(validationResult.error.details)
      setIsloading(false)
    }
    else
    {
      

         let { data } = await axios.post(
      'https://route-egypt-api.herokuapp.com/signup',
      user,
    )

    if (data.message === 'success')
    {
      console.log(data)
      setIsloading(false)
      navigate('/login')
    } else
    {
     

      setErorr(data.message)
      setIsloading(false)
      console.log(data.message);
    }
      }
    
 
  }
  function validateForm() {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(18).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    })

    return schema.validate(user,{abortEarly:false})
  }

  return (
    <>
      <div className="w-50 m-auto">
        <h2><span style={{ color: 'red'}}>R</span>egister Now</h2>
        
        {error.length > 0 ? (
          <div className="alert alert-danger"> {error}</div>
        ) : (
          ''
        )}

        <form onSubmit={submitRegister}>
          <label htmlFor="first_name">first name : </label>
          <input
            type="text "
            onChange={getUserData}
            className="form-control"
            id="first_name"
            name="first_name"
          />
           
          <label htmlFor="last_name"> last name : </label>
          <input
            type="text "
            onChange={getUserData}
            className="form-control"
            id="last_name"
            name="last_name"
          />
          <label htmlFor="age"> age : </label>
          <input
            type="number"
            onChange={getUserData}
            className="form-control"
            id="age"
            name="age"
          />
          <label htmlFor="email"> e-mail : </label>
          <input
            type="email"
            onChange={getUserData}
            className="form-control"
            id="email"
            name="email"
          />
          <label htmlFor="password"> password : </label>
          <input
            type="password"
            onChange={getUserData}
            className="form-control"
            id="password"
            name="password"
          />
          <button type="submit" className="btn btn-outline-info">
            {isloading===true?<i className='fas fa-spinner fa-spin'></i>: 'Rigister'}
           
          </button>
          {
          errorValid.map((error,i)=> <div key={i} className='alert py-2 alert-danger'>{error.message }</div>) 
        }
        </form>
      </div>
    </>
  )
}
