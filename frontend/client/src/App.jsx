import React from 'react'
import { Routes, Route } from 'react-router-dom'


import SignUpPage from './auth/SignUpPage.jsx'
import LoginPage from './auth/LoginPage'
import Home from './auth/home.jsx'
import Sidebar from './assets/components/common/sidebar.jsx'
import RightPanel from './assets/components/common/RightPanel.jsx'
import NotificationPage from './assets/components/pages/notifications/NotificationPage.jsx'
import ProfilePage from './assets/components/pages/profile/ProfilePage.jsx'


const App = () => {
  return (
    
    <div className='flex max-w-6x1 mx-auto'>

      <Sidebar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/notification' element={<NotificationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>

      <RightPanel />
    </div>
  )
}

export default App
