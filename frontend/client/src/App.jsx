import React from 'react'
import { Routes, Route } from 'react-router-dom'


import SignUpPage from './auth/SignUpPage.jsx'
import LoginPage from './auth/LoginPage'
import Home from './auth/home'
import Sidebar from './assets/components/common/sidebar.jsx'
import RightPanel from './assets/components/common/RightPanel.jsx'


const App = () => {
  return (
    <div className='flex max-w-6x1 mx-auto'>

      <Sidebar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>

      <RightPanel />
    </div>
  )
}

export default App
