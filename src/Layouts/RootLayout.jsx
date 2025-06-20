import React from 'react'
import NavBar from '../Pages/NavBar'
import { Outlet } from 'react-router-dom'
import About from '../Pages/About'

const RootLayout = () => {
  return (
    <div>
        <NavBar/>
         <Outlet/>
    </div>
  )
}

export default RootLayout