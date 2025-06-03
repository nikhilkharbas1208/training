import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import FetchonRender from '../Suspense/FetchonRender'
import { FetchApi } from '../funComponents/FetchApi'
import RenderWhileFetching from '../Suspense/RenderWhileFetching'

const Home = () => {
  return (
   <div>

    {/* <NavBar/> */}
    <h1>
        HOME PAGE
    </h1>
    {/* <FetchonRender/> */}
    {/* <FetchApi/> */}
    <RenderWhileFetching/>
    <Outlet/>
        </div>
  )
}

export default Home   