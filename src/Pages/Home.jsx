import React, { Suspense, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import FetchonRender from '../Suspense/FetchonRender'
import { FetchApi } from '../funComponents/FetchApi'
import RenderWhileFetching from '../Suspense/RenderWhileFetching'
import PizzaBox from '../Redux_Application/components/PizzaBox'
import BurgerBox from '../Redux_Application/components/BurgerBox'
import DemoTable from '../Redux_Application/AgGrid/DemoTable'
import { Consumer } from '../ContextAPI/Contexts'
import { contextCount } from '../ContextAPI/OrderCount'
import { ErrorBoundary } from 'react-error-boundary'

const Home = () => {
const {pc,PizzaUpdateCount,bc,BurgerUpdateCount} = useContext(contextCount)
  return (
   <div>

    <ErrorBoundary fallback={<p> couldn't find   HOMEPAGE </p>}>
    <h1>
        HOME PAGE
    </h1>
    </ErrorBoundary>
    
    <ErrorBoundary fallback={<p> couldn't find the PIZZACOUNT</p>}> 
         <h2>
             pizza order count: {pc}
         </h2>
    </ErrorBoundary>


   <ErrorBoundary fallback={<p> couldn't find the PIZZABOX COMPONENT</p>}> 
         <PizzaBox/>
   </ErrorBoundary>


    <ErrorBoundary fallback={<p> couldn't find the BURGERCOUNT</p>}> 
         <h2>
             burger order count: {bc}
         </h2>
    </ErrorBoundary>

    <ErrorBoundary fallback={<p> couldn't find the BURGERBOX COMPONENET</p>}> 
           <BurgerBox/>
    </ErrorBoundary>

    <ErrorBoundary fallback={<p> couldn't find the DEMOTABLE COMPONENT</p>}> 
        <Suspense  fallback= {<p>user data is getting prepared to display </p>}>
           <DemoTable/>
        </Suspense>
    </ErrorBoundary>



    <Outlet/>
        </div>
  )
}

export default Home   




  //  {/* <NavBar/> */}
  //   {/* <FetchonRender/> */}
  //   {/* <FetchApi/> */}
  //   {/* <RenderWhileFetching/> */}