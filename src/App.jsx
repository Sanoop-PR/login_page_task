// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {

  return (
    <div className='App'>
      <Routes>
        <Route
         index path='/register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
