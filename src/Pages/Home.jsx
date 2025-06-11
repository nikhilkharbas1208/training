import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import FetchonRender from '../Suspense/FetchonRender'
import { FetchApi } from '../funComponents/FetchApi'
import RenderWhileFetching from '../Suspense/RenderWhileFetching'
import PizzaBox from '../Redux_Application/components/PizzaBox'
import BurgerBox from '../Redux_Application/components/BurgerBox'
import DemoTable from '../Redux_Application/AgGrid/DemoTable'

const Home = () => {
  return (
   <div>

    {/* <NavBar/> */}
    <h1>
        HOME PAGE
    </h1>
    {/* <FetchonRender/> */}
    {/* <FetchApi/> */}
    {/* <RenderWhileFetching/> */}
    <Suspense  fallback= {<p>user data is getting prepared to display </p>}>
         <DemoTable/>
    </Suspense>
       <PizzaBox/>
       <BurgerBox/>
    <Outlet/>
        </div>
  )
}

export default Home   