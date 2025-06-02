import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Home = () => {
  return (
   <div>

    {/* <NavBar/> */}
    <h1>
        HOME PAGE
    </h1>
    <Outlet/>
        </div>
  )
}

export default Home   