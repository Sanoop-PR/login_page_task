import React, { useState } from 'react'
import Particle from '../components/Particles'
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import Register from './Register';


function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [isFlipped, setisFlipped] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!username && !password) {
      alert('enter username and password')
    } else {
      axios.post("http://localhost:5000/login", { username, password })
      .then(result => {console.log(result)
        if (result.status===200) {
          setPassword('')  ;
          setUsername('')    ; 
          navigate("/home") 
        }else{
          navigate("/register")
          alert("You are not registered to this service")
      }
      })
      .catch(err => console.log(err))
      
    }
}

function flipCard() {
  setisFlipped(!isFlipped)
}

  return (
    <div className='container'>
      <Particle id="particles"/>
      <ReactCardFlip flipDirection='horizontal' isFlipped={isFlipped}>
      <div>
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
            <button type="submit">Login</button>
            <button type='button' onClick={flipCard}>Register?</button>
        </form>
      </div>
      <Register onClick={flipCard}/>
      </ReactCardFlip>
    </div>
  )
}

export default Login