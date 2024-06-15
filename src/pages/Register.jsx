import React, { useState } from 'react'
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register({onClick}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5000/register", { username, password })
    .then(result => {console.log(result)
    navigate("/")
    })
    .catch(err => console.log(err))
}

  return (
    <div className='container'>
      <form className='login_body' onSubmit={handleSubmit}>
        <header>
          <h1>E-Com</h1>
        </header>
        <div>
          <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
          <button type="submit">Register</button>
          <button onClick={onClick}>Back to Login</button>
      </form>
    </div>
  )
}

export default Register