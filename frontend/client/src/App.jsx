import React from 'react'
import { Routes, Route } from 'react-router-dom'


import SignUpPage from './auth/SignUpPage.jsx'
import LoginPage from './auth/LoginPage'
import Home from './auth/home'


const App = () => {
  return (
    <div className='flex max-w-6x1 mx-auto'>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </div>
  )
}

export default App
